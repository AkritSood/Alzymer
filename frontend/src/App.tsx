import React, { useState } from 'react';

const App = () => {
  const [prediction, setPrediction] = useState<any>(null);
  const [formData, setFormData] = useState({
    M_F: 'M', // Male or Female
    Age: 68,
    EDUC: 16,
    SES: 3,
    MMSE: 25,
    CDR: 0,
    eTIV: 1500,
    nWBV: 0.8,
    ASF: 1.2
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission and make API request
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      // Check if response has prediction
      if (data.prediction) {
        setPrediction(data.prediction);
      } else {
        throw new Error('Error in prediction');
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      setPrediction('Error in prediction');
    }
  };

  return (
    <div>
      <h1>Prediction App</h1>
      
      <div>
        <label>Gender (M/F):</label>
        <input
          type="text"
          name="M_F"
          value={formData.M_F}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Age:</label>
        <input
          type="number"
          name="Age"
          value={formData.Age}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Education (EDUC):</label>
        <input
          type="number"
          name="EDUC"
          value={formData.EDUC}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Socioeconomic Status (SES):</label>
        <input
          type="number"
          name="SES"
          value={formData.SES}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>MMSE:</label>
        <input
          type="number"
          name="MMSE"
          value={formData.MMSE}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>CDR:</label>
        <input
          type="number"
          name="CDR"
          value={formData.CDR}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>eTIV:</label>
        <input
          type="number"
          name="eTIV"
          value={formData.eTIV}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>nWBV:</label>
        <input
          type="number"
          name="nWBV"
          value={formData.nWBV}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>ASF:</label>
        <input
          type="number"
          name="ASF"
          value={formData.ASF}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit}>Predict</button>

      {prediction && <div>Prediction: {prediction}</div>}
    </div>
  );
};

export default App;
