// PasswordRecoveryForm.js

import React, { useState } from 'react';

function PasswordRecoveryForm({ onRecover }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    onRecover(email); // Usando a prop 'onRecover'
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h5 className="card-header">Password Recovery</h5>
            <div className="card-body">
              {submitted ? (
                <div className="alert alert-success" role="alert">
                  If an account with that email exists, we've sent a password reset link.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Recover Password</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordRecoveryForm;
