import processing.net.*;

Client c;

void setup() 
{
  c = new Client(this, "localhost", 9000);
}

void mousePressed(){
  c.write("Hello from Processing.");
}

void draw() {
  if(mousePressed) {
    background(255);
  } else {
    background(0);
  }
}