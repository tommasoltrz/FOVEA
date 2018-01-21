#include <WiFi101.h>
#include <MQTTClient.h>

WiFiClient net;
MQTTClient client;

char MQTTClient_id[] = "sensor";
char MQTTClient_topic[] = "sensor";
char MQTTBroker_ip[] = "";

char SSID[] = "";         // your network SSID (name)
char PASS[] = "";           // your network key

int switch_one = 8;
int switch_two = 7;
int switch_three = 9;

int val_switch_one;
int val_switch_two;
int val_switch_three;
int val_slider;

int old_val_switch_one;
int old_val_switch_two;
int old_val_switch_three;
int old_val_slider;

void setup() {
  Serial.begin(19200);
  Serial.print("Connecting Wifi: ");
  Serial.println(SSID);
  WiFi.begin(SSID, PASS);
  Serial.println("WiFi connected");

  client.begin(MQTTBroker_ip, net);
  Serial.println(MQTTBroker_ip);
  Serial.print("connecting to the mqtt broker");
  while (!client.connect(MQTTClient_id)) {
    Serial.print(".");
  }
  Serial.println("\nconnected!");
  client.subscribe("topic");

  pinMode(switch_one, INPUT);
  pinMode(val_switch_two, INPUT);
  pinMode(switch_three, INPUT);

  val_switch_one = digitalRead(switch_one);
  val_switch_two = digitalRead(switch_two);
  val_switch_three = digitalRead(switch_three);
  val_slider = map(analogRead(A2), 0, 1023, 1 , 5);

}

void loop() {
  client.loop();

  val_switch_one = digitalRead(switch_one);
  val_switch_two = digitalRead(switch_two);
  val_switch_three = digitalRead(switch_three);
  val_slider = map(analogRead(A2), 0, 1023, 1 , 5);

  if (val_switch_one != old_val_switch_one) {
    if ( val_switch_one == 0 ) client.publish("friends", "OFF");
    else client.publish("friends", "ON");
    old_val_switch_one = val_switch_one;
    Serial.println("switch one modified");
  }

  if (val_switch_two != old_val_switch_two) {
    if ( val_switch_two == 0 ) client.publish("UI", "OFF");
    else client.publish("UI", "ON");
    old_val_switch_two = val_switch_two;
    Serial.println("switch two modified");
  }

  if (val_switch_three != old_val_switch_three) {
    if ( val_switch_three == 0 ) client.publish("bubble", "OFF");
    else client.publish("bubble", "ON");
    old_val_switch_three = val_switch_three;
    Serial.println("switch three modified");
  }

  if (val_slider != old_val_slider) {
    client.publish("slider", String(val_slider));
    old_val_slider = val_slider;
    Serial.println("slider modified");
    Serial.println(val_slider);
  }

}


void messageReceived(String topic, String payload, char * bytes, unsigned int length) {
  Serial.print("incoming: ");
  Serial.print(topic);
  Serial.print(" - ");
  Serial.print(payload);
  Serial.println();

}
