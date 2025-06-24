import React, { useState } from "react";
import "./App.css";

const paymentTypes = [
  "PAYMENT",
  "TRANSFER",
  "CASH_OUT",
  "DEBIT",
  "CASH_IN"
];

function App() {
  const [form, setForm] = useState({
    step: "",
    type: "",
    amount: "",
    oldbalanceOrg: "",
    newbalanceOrig: "",
    oldbalanceDest: "",
    newbalanceDest: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const payload = {
      ...form,
      step: parseInt(form.step),
      amount: parseFloat(form.amount),
      oldbalanceOrg: parseFloat(form.oldbalanceOrg),
      newbalanceOrig: parseFloat(form.newbalanceOrig),
      oldbalanceDest: parseFloat(form.oldbalanceDest),
      newbalanceDest: parseFloat(form.newbalanceDest),
      type: form.type,
    };

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to get prediction. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Payment Fraud Detection</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Step</label>
            <input type="number" name="step" value={form.step} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange} required>
              <option value="">Select Type</option>
              {paymentTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input type="number" step="0.01" name="amount" value={form.amount} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Sender Old Balance</label>
            <input type="number" step="0.01" name="oldbalanceOrg" value={form.oldbalanceOrg} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Sender New Balance</label>
            <input type="number" step="0.01" name="newbalanceOrig" value={form.newbalanceOrig} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Receiver Old Balance</label>
            <input type="number" step="0.01" name="oldbalanceDest" value={form.oldbalanceDest} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Receiver New Balance</label>
            <input type="number" step="0.01" name="newbalanceDest" value={form.newbalanceDest} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {result && (
          <div className="result">
            <h3>Result</h3>
            <p>Fraud Probability: <b>{result.fraud_probability}</b></p>
            <p>Is Fraud: <b style={{color: result.is_fraud ? 'red' : 'green'}}>{result.is_fraud ? "Yes" : "No"}</b></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
