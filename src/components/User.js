import React, { useState  } from 'react';
import './User.css';





const User = () => {

  const [firstName, setfirstName] = useState('');
  const [lastName,setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const User = {
      firstName: firstName,
      lastName:lastName,
      email: email,
      password: password,
      photo: photo,
    };

    console.log('firstName:', firstName);
    console.log('lastName:', lastName);

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Photo:', photo);

    fetch('http://localhost:8080/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(User),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from server:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
          firstName
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            placeholder="firstName"
          />
            <label htmlFor="lastName" className="form-label">
            lastName
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            placeholder="lastName"
          />

          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />

          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            aria-describedby="passwordHelpBlock"
          />

          <label htmlFor="photo" className="form-label">
            Photo
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.value)}
            className="form-control"
          />

          <div id="passwordHelpBlock" className="form-text">
            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default User ;


