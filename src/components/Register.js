import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { API_KEY_REGISTER } from '../Url';
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_KEY_REGISTER, {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      alert('data submitted successfully');
      navigate('/');
    } catch (err) {
      if (err.res) {
        setMessage(err.res.data);
      }
    }
  };

  return (
    <>
      <section className='hero has-background-grey-light is-fullheight is-fullwidth'>
        <div className='hero-body'>
          <div className='container'>
            <div className='columns is-centered'>
              <div className='column is-4-desktop'>
                <form onSubmit={Register} className='box'>
                  <p className='has-text-centered'>{message}</p>
                  <div className='field mt-5'>
                    <label className='label'>Name</label>
                    <div className='controls'>
                      <input
                        type='text'
                        className='input'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='field mt-5'>
                    <label className='label'>Email</label>
                    <div className='controls'>
                      <input
                        type='email'
                        className='input'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='field mt-5'>
                    <label className='label'>Password</label>
                    <div className='controls'>
                      <input
                        type='password'
                        className='input'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='field mt-5'>
                    <label className='label'>Confirm Password</label>
                    <div className='controls'>
                      <input
                        type='password'
                        className='input'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='field mt-5'>
                    <button className='button is-primary is-fullwidth'>Register</button>
                  </div>
                </form>
                <p>
                  Already Have a Account?<Link to='/'>Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
