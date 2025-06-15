import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginSignup.css';

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    role: 'customer',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      alert('Signup successful! Please log in to continue.');
      setIsSignup(false); // Switch to login view
    } else {
      alert('Login successful!');
      navigate('/'); // Redirect to homepage after login
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <Link to="/" className="home-link">🏠 Home</Link>

        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                onChange={handleChange}
              />
              <select
                name="gender"
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>

              <div className="role-options">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={form.role === 'customer'}
                    onChange={handleChange}
                  />
                  Customer
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="consumer"
                    checked={form.role === 'consumer'}
                    onChange={handleChange}
                  />
                  Consumer (Seller)
                </label>
              </div>
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        </form>

        <p className="toggle-auth">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;

// import React from 'react';

// const LoginSignup = () => {
//   return (
//     <div style={{ padding: '2rem', color: 'white' }}>
//       LoginSignup page works.
//     </div>
//   );
// };

// export default LoginSignup;
