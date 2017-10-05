#include <ESP8266WiFi.h>

// Put wifi info here:

const char* ssid     = "MTC";
const char* password = "workshop";
WiFiClient client;

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

void loop() {

    if(!client.connected()) {
      
      // Put your server IP and port here.
      
      const char * host   = "172.18.1.40"; 
      const uint16_t port = 9000;
      
      Serial.print("connecting to ");
      Serial.println(host);
  
      // Use WiFiClient class to create TCP connections
      
      if (!client.connect(host, port)) {
          Serial.println("connection failed, retry in 5 seconds...");
          delay(5000);
          return;
      }
      
    } else {
      // Client is connected, send a message every 2 seconds.
      Serial.println("Sending a message..");
      client.write("Hello from ESP8266!");
      delay(2000);
    }
    
}

