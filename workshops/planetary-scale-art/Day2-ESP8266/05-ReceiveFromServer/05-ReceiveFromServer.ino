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

  pinMode(5, OUTPUT);
}


void connectToServer() {
  if (!client.connect("172.18.1.40", 9000)) {
    Serial.println("Couldn't connect to server..");
    delay(3000);
  } else {
    Serial.println("Connected to server!!");
  }
}


void loop() {
    
    if (!client.connected()) {
      connectToServer();
    } else {
      while(client.available() > 0) {
        if(client.read() == '1') {
          Serial.println("On");
          digitalWrite(5, HIGH);      
        } else {
          Serial.println("Off");
          digitalWrite(5, LOW);
        }
        delay(1000);
      }
    }
    
}

