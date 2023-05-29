import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { API_KEY_LOGIN } from '../Url';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const auth = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(API_KEY_LOGIN, {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('token', res.data);

          navigate('/dashboard');
        });
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
                <form onSubmit={auth} className='box'>
                  <p className='has-text-centered'>{message}</p>
                  <div className='field mt-5'>
                    <label className='label'>Email or Username</label>
                    <div className='controls'>
                      <input
                        type='text'
                        className='input'
                        placeholder='Email or Username'
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
                    <button className='button is-primary is-fullwidth'>Login</button>
                  </div>
                </form>
                <p className=''>
                  I Don't have a Account? <Link to='/register'>create Account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
