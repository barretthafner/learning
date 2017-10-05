#include <ESP8266WiFi.h>

// Put wifi info here:

const char* ssid     = "MTC";
const char* password = "workshop";

void setup() {

  Serial.begin(74880);
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
  // don't do anything..
}

