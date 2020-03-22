import React, { useState, useCallback } from 'react';

export default function Login({ userState }) {
  const [email, setEmail] = userState.emailHook;
  const [password, setPassword] = userState.passwordHook;

  const emailOnChange = useCallback(event => setEmail(event.target.value), [setEmail]);
  const passwordOnChange = useCallback(event => setPassword(event.target.value), [setPassword]);

  const handleSubmit = useCallback(event => {
    alert(`Email: ${email}, Password: ${password}`);
    event.preventDefault();
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