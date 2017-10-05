#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// Put wifi info here:

const char* ssid     = "MTC";
const char* password = "workshop";

WiFiClient client;
String serverAddress;
bool hasServerIP = false;

void setup() {
  Serial.begin(115200);
  delay(10);

  Serial.println();

  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  
  Serial.println("Connected!");
  
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}


void getIPAddress() {
  
  if((WiFi.status() == WL_CONNECTED)) {
    HTTPClient http;
    
    http.begin("http://static.glowbox.io/ip/ip_address.txt");
    
    int response = http.GET();
    
    if(response == HTTP_CODE_OK) {
      serverAddress = http.getString();
      Serial.println("Got server IP: " + serverAddress);
      hasServerIP = true;
    } else {
      Serial.println("Unable to get IP address..");
      delay(2000);
    }
  }
  
}


void connectToServer() {
  if (!client.connect(serverAddress.c_str(), 9600)) {
    Serial.println("Couldn't connect to server..");
    delay(3000);
  } else {
    Serial.println("Connected to server!!");
  }
}


void loop() {

    if(!hasServerIP) {
      getIPAddress();
    } else if (!client.connected()) {
      connectToServer();
    } else {

      // Connection is alive.
      
      Serial.println("Sending a message..");
      client.write("Hello from ESP8266!");
      delay(2000);
          
    }
    
}

