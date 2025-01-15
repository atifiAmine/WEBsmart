import cv2  # importer la bibliothèque opencv pour la capture vidéo et le traitement d'images
from keras.models import load_model  # importer la fonction load_model de keras pour charger le modèle d'apprentissage automatique
from PIL import Image, ImageOps  # importer les modules image et imageops de pillow pour le traitement d'images
import numpy as np  # importer numpy pour les opérations sur les tableaux

# charger le modèle ia
model = load_model("keras_model.h5", compile=False)  # charger le modèle keras à partir du fichier keras_model.h5 sans compiler
class_names = open("labels.txt", "r").readlines()  # lire les noms des classes à partir du fichier labels.txt

# fonction pour analyser une image avec l'ia
def analyze_image(image_path):
    image = Image.open(image_path).convert("RGB")  # ouvrir l'image et la convertir en rgb
    size = (224, 224)  # définir la taille de l'image à 224x224 pixels
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)  # redimensionner l'image en utilisant la méthode lanczos
    image_array = np.asarray(image)  # convertir l'image en tableau numpy
    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1  # normaliser les valeurs des pixels entre -1 et 1
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)  # créer un tableau numpy pour contenir les données de l'image
    data[0] = normalized_image_array  # copier les données normalisées dans le tableau
    prediction = model.predict(data)  # faire une prédiction avec le modèle ia
    index = np.argmax(prediction)  # obtenir l'indice de la classe avec la plus haute probabilité
    class_name = class_names[index].strip()  # obtenir le nom de la classe correspondante
    confidence_score = prediction[0][index]  # obtenir le score de confiance pour la classe prédite
    return class_name, confidence_score  # retourner le nom de la classe et le score de confiance

# initialiser la caméra
cap = cv2.VideoCapture(0)  # ouvrir la caméra par défaut
ret, prev_frame = cap.read()  # lire la première image de la caméra
prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)  # convertir l'image en niveaux de gris

while True:  # boucle infinie pour traiter les images de la caméra en continu
    ret, frame = cap.read()  # lire une nouvelle image de la caméra
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # convertir l'image en niveaux de gris
    diff = cv2.absdiff(prev_gray, gray)  # calculer la différence absolue entre l'image précédente et l'image actuelle
    _, thresh = cv2.threshold(diff, 50, 255, cv2.THRESH_BINARY)  # appliquer un seuil pour obtenir une image binaire
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)  # trouver les contours dans l'image binaire

    for contour in contours:  # parcourir tous les contours trouvés
        if cv2.contourArea(contour) > 500:  # vérifier si l'aire du contour est supérieure à 500
            # si mouvement détecté, capture l'image
            print("Mouvement détecté, prise de la photo.")  # afficher un message indiquant qu'un mouvement a été détecté
            image_path = "capture.jpg"  # définir le chemin de l'image capturée
            cv2.imwrite(image_path, frame)  # enregistrer l'image capturée
            
            # analyse l'image capturée avec l'IA
            class_name, confidence_score = analyze_image(image_path)  # analyser l'image avec l'IA et obtenir le nom de la classe et le score de confiance
            print(f"Résultat IA : {class_name}, Confiance : {confidence_score:.2f}")  # afficher le résultat de l'analyse IA
            
            # action basée sur la classe détectée
            if "plastique" in class_name:  # si la classe détectée est "plastique"
                print("Ouvrir la poubelle plastique")  # afficher un message pour ouvrir la poubelle plastique
            elif "verre" in class_name:  # si la classe détectée est "verre"
                print("Ouvrir la poubelle verre")  # afficher un message pour ouvrir la poubelle verre
            elif "papier" in class_name:  # si la classe détectée est "papier"
                print("Ouvrir la poubelle papier")  # afficher un message pour ouvrir la poubelle papier
            else:  # si aucune classe correspondante n'est trouvée
                print("Aucune poubelle disponible pour cet objet.")  # afficher un message indiquant qu'aucune poubelle n'est disponible

            break  # sortir de la boucle après la détection

    prev_gray = gray  # mettre à jour l'image précédente avec l'image actuelle
    cv2.imshow("Video", frame)  # afficher l'image actuelle dans une fenêtre
    if cv2.waitKey(1) & 0xFF == ord('q'):  # vérifier si la touche 'q' est pressée pour quitter
        break  # sortir de la boucle si 'q' est pressée

cap.release()  # libérer la caméra
cv2.destroyAllWindows()  # fermer toutes les fenêtres ouvertes par opencv