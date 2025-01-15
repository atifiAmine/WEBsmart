import cv2
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np

# Charger le modèle IA
model = load_model("keras_Model.h5", compile=False)
class_names = open("labels.txt", "r").readlines()

# Fonction pour analyser une image avec l'IA
def analyze_image(image_path):
    image = Image.open(image_path).convert("RGB")
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
    image_array = np.asarray(image)
    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    data[0] = normalized_image_array
    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index].strip()
    confidence_score = prediction[0][index]
    return class_name, confidence_score

# Initialiser la caméra
cap = cv2.VideoCapture(0)
ret, prev_frame = cap.read()
prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)

while True:
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    diff = cv2.absdiff(prev_gray, gray)
    _, thresh = cv2.threshold(diff, 50, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    for contour in contours:
        if cv2.contourArea(contour) > 500:
            # Si mouvement détecté, capture l'image
            print("Mouvement détecté, prise de la photo.")
            image_path = "capture.jpg"
            cv2.imwrite(image_path, frame)
            
            # Analyse l'image capturée avec l'IA
            class_name, confidence_score = analyze_image(image_path)
            print(f"Résultat IA : {class_name}, Confiance : {confidence_score:.2f}")
            
            # Action basée sur la classe détectée
            if "plastique" in class_name:
                print("Ouvrir la poubelle plastique")
            elif "verre" in class_name:
                print("Ouvrir la poubelle verre")
            elif "papier" in class_name:
                print("Ouvrir la poubelle papier")
            else:
                print("Aucune poubelle disponible pour cet objet.")

            break  # Sortir de la boucle après la détection

    prev_gray = gray
    cv2.imshow("Video", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
