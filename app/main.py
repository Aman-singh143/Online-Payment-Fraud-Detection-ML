# app/main.py
from fastapi import FastAPI
from app.schema import Transaction
from app.model_utils import model, preprocess_input

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Fraud Detection API is running"}

@app.post("/predict")
def predict(tx: Transaction):
    data = tx.dict()
    print("Received input:", data)
    X = preprocess_input(data)
    print("Processed DataFrame:", X)
    prob = float(model.predict_proba(X)[:, 1][0])
    label = int(prob > 0.5)
    return {
        "fraud_probability": round(prob, 4),
        "is_fraud": label
    }
