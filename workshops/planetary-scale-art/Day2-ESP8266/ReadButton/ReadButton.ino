#include <ESP8266WiFi.h>          //https://github.com/esp8266/Arduino

//needed for library
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include "WiFiManager.h"          //https://github.com/tzapu/WiFiManager


unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 10; 


static uint8_t sbuf1[1] = {'1'};
static uint8_t sbuf0[1] = {'0'};

WiFiClient client;

int buttonState = LOW;
int lastButtonState = LOW;
int buttonPin = 5;

void configModeCallback (WiFiManager *myWiFiManager) {
  Serial.println("Entered config mode");
  Serial.println(WiFi.softAPIP());
  //if you used auto generated SSID, print it
  Serial.println(myWiFiManager->getConfigPortalSSID());
}

void WiFiEvent(WiFiEvent_t event) {
//    Serial.printf("[WiFi-event] event: %d\n", event);
    switch(event) {
        case WIFI_EVENT_STAMODE_GOT_IP:
            Serial.println("WiFi connected");
            Serial.println("IP address: ");
            Serial.println(WiFi.localIP());
            break;
        case WIFI_EVENT_STAMODE_DISCONNECTED:
            Serial.println("WiFi lost connection");
            break;
    }
}

void setup() {
  WiFi.onEvent(WiFiEvent);

  // put your setup code here, to run once:
  Serial.begin(115200);
  
  //WiFiManager
  //Local intialization. Once its business is done, there is no need to keep it around
  WiFiManager wifiManager;
  //reset settings - for testing
  
  //wifiManager.resetSettings();
 
  // set callback that gets called when connecting to previous WiFi fails, and enters Access Point mode
  wifiManager.setAPCallback(configModeCallback);

  //fetches ssid and pass and tries to connect
  //if it does not connect it starts an access point with the specified name
  //here  "AutoConnectAP"
  //and goes into a blocking loop awaiting configuration
  if(!wifiManager.autoConnect("ESP_config")) {
    Serial.println("failed to connect and hit timeout");
    //reset and try again, or maybe put it to deep sleep
    ESP.reset();
    delay(1000);
  } 

  //if you get here you have connected to the WiFi
  Serial.println("connected...yeey :)");
  
  pinMode(buttonPin, INPUT);
}


int readWithDebounce() {

  int reading = digitalRead(buttonPin);

  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonState) {
      buttonState = reading;
    }
  }

  lastButtonState = reading;

  return buttonState;
}


void connectToServer() {
  if (!client.connect("172.18.1.62", 9000)) {
    Serial.println("Couldn't connect to server..");
    delay(3000);
  } else {
    Serial.println("Connected to server!!");
  }
}

int lastState = LOW;

void loop() {
  if(!client.connected()) {
    connectToServer();
  }
  
  // put your main code here, to run repeatedly:
  int state = readWithDebounce();
  if(lastState != state) {
    lastState = state;
    //if(client.connected()){
      client.write(state == HIGH ? (const uint8_t *)sbuf0 : (const uint8_t *)sbuf1, 1);
   // }
    Serial.println(state);
  }
}
