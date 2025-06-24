# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schema import Transaction
from app.model_utils import model, preprocess_input

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to ["http://localhost:3000"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
