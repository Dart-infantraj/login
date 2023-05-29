import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import User from './User';
import { API_KEY_LOGOUT } from '../Url';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') === ' ') {
      navigate('/');
    }
  }, []);

  const logoutAction = () => {
    axios
      .post(API_KEY_LOGOUT, {}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then((r) => {
        localStorage.setItem('token', ' ');
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <h1>Employees details</h1>
      <User />
      <button onClick={logoutAction}>
        <h2>Logout</h2>
      </button>
    </>
  );
}
