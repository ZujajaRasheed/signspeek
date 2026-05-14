# import tensorflow as tf
# import numpy as np
# import json
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# model = tf.keras.models.load_model("model/final_sign_model_1480.keras")

# with open("model/labels_1480.json", "r") as f:
#     labels = json.load(f)

# @app.get("/")
# def home():
#     return {"message": "Backend working!"}

# @app.get("/predict")
# def predict():

#     data = np.zeros((50, 258), dtype=np.float32)

#     data = data / 100.0
#     data = np.expand_dims(data, axis=0)

#     pred = model.predict(data)
#     index = np.argmax(pred)

#     word = labels[str(index)]
#     confidence = float(np.max(pred))

#     return {
#         "word": word,
#         "confidence": confidence
#     }











from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Backend working"}

##uvicorn main:app --reload