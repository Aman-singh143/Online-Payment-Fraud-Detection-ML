# app/model_utils.py
import joblib
import pandas as pd
import numpy as np

model = joblib.load("model/xgb_fraud_model.pkl")
feature_columns = joblib.load("model/feature_columns.pkl")

def preprocess_input(data_dict):
    df = pd.DataFrame([data_dict])
    
    df['log_amount'] = np.log1p(df['amount'])
    df['deltaOrig'] = df['oldbalanceOrg'] - df['newbalanceOrig']
    df['deltaDest'] = df['newbalanceDest'] - df['oldbalanceDest']
    df['isOrigDrained'] = (df['oldbalanceOrg'] > 0) & (df['newbalanceOrig'] == 0)
    df['isDestUntouched'] = (df['oldbalanceDest'] == 0) & (df['newbalanceDest'] == 0)
    df['isMoneyMoved'] = df['amount'] > 0

    df = pd.get_dummies(df, columns=['type'])

    for col in feature_columns:
        if col not in df.columns:
            df[col] = 0
    df = df[feature_columns]

    return df

