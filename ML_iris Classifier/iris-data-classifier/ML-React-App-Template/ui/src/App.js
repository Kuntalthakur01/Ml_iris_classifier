import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const IrisClassifier = () => {
  const [formData, setFormData] = useState({
    sepalLength: 4,
    sepalWidth: 2,
    petalLength: 1,
    petalWidth: 0.1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [predictionHistory, setPredictionHistory] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handlePredictClick = async () => {
    setIsLoading(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockResult = ["Setosa", "Versicolor", "Virginica"][Math.floor(Math.random() * 3)];
    setResult(mockResult);
    setPredictionHistory(prev => [...prev, { ...formData, result: mockResult }]);
    setIsLoading(false);
  };

  const handleReset = () => {
    setResult("");
  };

  const generateOptions = (start, end, step) => {
    const options = [];
    for (let i = start; i <= end; i = +(i + step).toFixed(1)) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  return (
    <div className="p-4 bg-gradient-to-br from-sky-300 to-sky-500 min-h-100vh">
      <Container className="py-5">
        <Card className="shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
          <Card.Body>
            <h1 className="text-center mb-4 text-sky-700">Iris Plant Classifier</h1>
            <p className="text-center text-sky-600 mb-5">Predict the Iris species by adjusting the values below!</p>
            <Row>
              <Col md={6}>
                <Form>
                  {Object.entries(formData).map(([key, value]) => (
                    <Form.Group key={key} className="mb-3">
                      <Form.Label className="text-sky-700">{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                      <Form.Control
                        as="select"
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="bg-sky-100 border-sky-300 text-sky-900"
                      >
                        {generateOptions(key.includes('Width') ? 0.1 : 1, key.includes('Length') ? 7 : 4, 0.1)}
                      </Form.Control>
                    </Form.Group>
                  ))}
                  <div className="d-flex justify-content-center mt-4">
                    <Button
                      onClick={handlePredictClick}
                      disabled={isLoading}
                      className="me-2"
                      style={{ backgroundColor: '#0ea5e9', borderColor: '#0ea5e9' }}
                    >
                      {isLoading ? 'Predicting...' : 'Predict'}
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="danger"
                    >
                      Reset
                    </Button>
                  </div>
                </Form>
                {result && (
                  <div className="mt-4 p-3 bg-sky-200 rounded text-center">
                    <h3 className="text-sky-700">Prediction Result:</h3>
                    <p className="text-sky-900 fs-4">{result}</p>
                  </div>
                )}
              </Col>
              <Col md={6}>
                <h2 className="text-sky-700 mb-3">Prediction History</h2>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictionHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#bae6fd" />
                      <XAxis dataKey="sepalLength" stroke="#0369a1" />
                      <YAxis stroke="#0369a1" />
                      <Tooltip contentStyle={{ backgroundColor: '#e0f2fe', border: 'none', color: '#0c4a6e' }} />
                      <Legend />
                      <Line type="monotone" dataKey="sepalWidth" stroke="#0284c7" />
                      <Line type="monotone" dataKey="petalLength" stroke="#0891b2" />
                      <Line type="monotone" dataKey="petalWidth" stroke="#0e7490" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default IrisClassifier;