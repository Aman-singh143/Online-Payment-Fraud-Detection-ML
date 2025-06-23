# Online Payment Fraud Detection API

This project provides an end-to-end machine learning pipeline and a FastAPI backend for detecting fraudulent online payment transactions. It includes data analysis, model training, and a production-ready API for real-time fraud prediction.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Data Science Pipeline](#data-science-pipeline)
- [Model Training & Features](#model-training--features)
- [API Overview](#api-overview)
  - [API Initialization](#api-initialization)
  - [Endpoints](#endpoints)
  - [Request/Response Schema](#requestresponse-schema)
- [How to Run](#how-to-run)
- [Requirements](#requirements)
- [Example Usage](#example-usage)
- [Files & Directories](#files--directories)
- [License](#license)

---

## Project Overview

Online payment fraud is a significant risk for businesses and consumers. This project aims to:

- Detect potentially fraudulent transactions in real time.
- Maximize the capture of true frauds (high recall).
- Minimize false alarms (high precision).
- Provide an end-to-end ML pipeline that is easy to iterate and improve.

---

## Project Structure

```
fraud_detection_project/
  ├── app/                # FastAPI backend and utilities
  ├── model/              # Trained model and feature artifacts
  ├── notebook/           # Jupyter notebooks and scripts for EDA/modeling
  ├── Dockerfile          # (Optional) For containerized deployment
  └── README.md           # Project documentation
```

---

## Data Science Pipeline

- **Dataset:** [Kaggle: Online Payment Fraud Detection](https://www.kaggle.com/datasets/jainilcoder/online-payment-fraud-detection)
- **Features:** Transaction type, amount, balances before/after, etc.
- **Target:** `isFraud` (1 = Fraudulent, 0 = Legitimate)
- **Pipeline Steps:**
  1. Data loading and cleaning (see `notebook/online_payment_fraud_detection.py` and `.ipynb`)
  2. Exploratory Data Analysis (EDA)
  3. Feature engineering (log transforms, deltas, binary flags, one-hot encoding)
  4. Model training (XGBoost classifier)
  5. Model serialization (`model/xgb_fraud_model.pkl`, `model/feature_columns.pkl`)

---

## Model Training & Features

- **Model:** XGBoost Classifier
- **Feature Engineering:**
  - Log-transform of amount
  - Balance deltas (before/after transaction)
  - Binary flags for suspicious patterns
  - One-hot encoding for transaction type
- **Artifacts:**
  - `xgb_fraud_model.pkl`: Trained model
  - `feature_columns.pkl`: List of features used for prediction

---

## API Overview

### API Initialization

- **Framework:** FastAPI
- **Entry Point:** `app/main.py`
- **Model Loading:** On startup, loads the trained model and feature columns from the `model/` directory.
- **Preprocessing:** Incoming requests are preprocessed to match the model's expected input format.

### Endpoints

| Method | Endpoint   | Description                        |
|--------|------------|------------------------------------|
| GET    | `/`        | Health check, returns status       |
| POST   | `/predict` | Predicts fraud probability         |

#### `/` (GET)

- **Purpose:** Health check
- **Response:** `{ "message": "Fraud Detection API is running" }`

#### `/predict` (POST)

- **Purpose:** Predicts the probability that a transaction is fraudulent.
- **Request Body:** JSON object matching the `Transaction` schema.
- **Response:** JSON with fraud probability and binary label.

### Request/Response Schema

#### Request Example

```json
{
  "step": 1,
  "type": "TRANSFER",
  "amount": 10000.0,
  "oldbalanceOrg": 50000.0,
  "newbalanceOrig": 40000.0,
  "oldbalanceDest": 0.0,
  "newbalanceDest": 10000.0
}
```

#### Response Example

```json
{
  "fraud_probability": 0.8765,
  "is_fraud": 1
}
```

---

## How to Run

1. **Install dependencies:**
   ```bash
   pip install -r app/requirements.txt
   ```

2. **Start the API:**
   ```bash
   uvicorn app.main:app --reload
   ```

3. **Access the docs:**
   - Open [http://localhost:8000/docs](http://localhost:8000/docs) for the interactive Swagger UI.

---

## Requirements

- Python 3.7+
- See `app/requirements.txt`:
  - fastapi
  - uvicorn
  - joblib
  - scikit-learn
  - pandas
  - numpy
  - xgboost

---

## Example Usage

**cURL:**
```bash
curl -X POST "http://localhost:8000/predict" -H "Content-Type: application/json" -d '{
  "step": 1,
  "type": "TRANSFER",
  "amount": 10000.0,
  "oldbalanceOrg": 50000.0,
  "newbalanceOrig": 40000.0,
  "oldbalanceDest": 0.0,
  "newbalanceDest": 10000.0
}'
```

**Python:**
```python
import requests

data = {
    "step": 1,
    "type": "TRANSFER",
    "amount": 10000.0,
    "oldbalanceOrg": 50000.0,
    "newbalanceOrig": 40000.0,
    "oldbalanceDest": 0.0,
    "newbalanceDest": 10000.0
}
response = requests.post("http://localhost:8000/predict", json=data)
print(response.json())
```

---

## Files & Directories

- `app/main.py`: FastAPI app, endpoints, and API logic
- `app/model_utils.py`: Model loading and input preprocessing
- `app/schema.py`: Pydantic schema for request validation
- `model/xgb_fraud_model.pkl`: Trained XGBoost model
- `model/feature_columns.pkl`: Feature columns used by the model
- `notebook/online_payment_fraud_detection.py`/`.ipynb`: Data analysis and model training
- `app/requirements.txt`: Python dependencies

---

## License

This project is for educational and research purposes. Please check the dataset's license for data usage restrictions. # Online-Payment-Fraud-Detection-ML
# Online-Payment-Fraud-Detection-ML
