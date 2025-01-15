#include <Servo.h>

Servo servoPlastique;
Servo servoVerre;
Servo servoPapier;

void setup() {
  servoPlastique.attach(9); // Pin du servo plastique
  servoVerre.attach(10);    // Pin du servo verre
  servoPapier.attach(11);   // Pin du servo papier
  Serial.begin(9600);       // Initialisation de la communication série
}

void loop() {
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');
    if (command == "PLASTIQUE") {
      servoPlastique.write(90); // Ouvre la poubelle plastique
      delay(2000);
      servoPlastique.write(0);  // Ferme la poubelle plastique
    } else if (command == "VERRE") {
      servoVerre.write(90);    // Ouvre la poubelle verre
      delay(2000);
      servoVerre.write(0);     // Ferme la poubelle verre
    } else if (command == "PAPIER") {
      servoPapier.write(90);   // Ouvre la poubelle papier
      delay(2000);
      servoPapier.write(0);    // Ferme la poubelle papier
    }
  }
}
