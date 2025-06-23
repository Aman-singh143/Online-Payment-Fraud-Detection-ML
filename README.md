# Online Payment Fraud Detection API

## Project Summary

This project implements an end-to-end machine learning pipeline to detect fraudulent online payment transactions. Using a real-world dataset with over 6.3 million records, it covers the full data science workflow, from exploration to production-ready REST API deployment.

**Core Skillsets Demonstrated:**

* Data preprocessing and feature engineering
* Handling extreme class imbalance (fraud rate \~0.13%)
* Model comparison and hyperparameter tuning
* Ensemble learning with stacking and calibration
* FastAPI deployment with live fraud prediction endpoint

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
├── app/                     # FastAPI backend
│   ├── main.py              # API entrypoint
│   ├── model_utils.py       # Preprocessing + model loading
│   └── schema.py            # Input validation schema
├── model/                  # Trained model + features
│   ├── xgb_fraud_model.pkl
│   └── feature_columns.pkl
├── notebook/               # EDA and model development
│   └── fraud_model_dev.ipynb
├── Dockerfile              # Optional: containerization
├── requirements.txt        # Python dependencies
└── README.md               # Documentation
```

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

## Skills Demonstrated

* Feature engineering using domain patterns
* Class imbalance treatment (undersampling, SMOTE)
* Cross-validation and model benchmarking
* Ensemble learning and calibration
* REST API design with FastAPI
* ML deployment architecture

---

## Key Learnings

* Precision-recall tradeoff is critical in fraud detection
* Calibrated probabilities are important for imbalanced datasets
* Threshold tuning significantly improves real-world F1 performance
* Modular design enables smooth deployment with reproducibility

---

## Optional Enhancements

* Add Streamlit UI
* Containerize with Docker and deploy on Render/Railway/AWS
* CI/CD with GitHub Actions
* Logging and monitoring in production

---

## License

This project is for educational and research purposes. Please check the dataset's license for data usage restrictions. # Online-Payment-Fraud-Detection-ML

## Author

Aman Singh

For improvements, suggestions, or contributions, feel free to fork or open an issue.

