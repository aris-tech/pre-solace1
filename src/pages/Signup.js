import React, { useState, useCallback } from 'react';

function authenticateUser(email, password) {
  return email.length > 0 && password.length > 0;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailOnChange = useCallback(event => setEmail(event.target.value), []);
  const passwordOnChange = useCallback(event => setPassword(event.target.value), [])

  const handleSubmit = useCallback(() => {
    // Two ways, either (1) make the auth API call here, then store loggedIn state(redux state is lost when refreshed btw) (2) or store email and password

    const authenticated = authenticateUser(email, password);

    // Success
    if (authenticated) {
      // Redirect to welcome page
    } else {

    }
  }, [email, password])


  return (
    <>
      <h1>This is the login page</h1>
      <form onSubmit={handleSubmit}>
        <label>Email: <input type='text' value={email} onChange={emailOnChange} /></label>
        <br/>
        <label>Password: <input type='text' value={password} onChange={passwordOnChange} /></label>
        <br/>
        <input type='submit' value="Login" />
      </form>
    </>
  );
}