import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import homeImage from '../../assets/home.png';
import { useAuth } from '../../providers/AuthProvider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 
  const { login } = useAuth()
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Барлық өрісті толтырыңыз');
      return;
    }

    try {
      const res = await axios.post('https://sevenproject-frontend-beckend-2.onrender.com/api/login', {
        email,
        password,
      });

      login(res.data.token)
      navigate('/');
      setSuccess('Кіру сәтті өтті!');
    } catch (err) {
      setError(err.response?.data?.message || 'Сервер қатесі');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ flex: 1, backgroundColor: '#fff', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: '30px', left: '150px', fontSize: '28px', fontWeight: 'bold', color: '#f25C0c' }}>
          RoomTap
        </div>
        <img src={homeImage} alt="Үй" style={{ width: '80%', maxWidth: '500px' }} />
      </div>

      <div style={{ flex: 1, backgroundColor: '#f25C0c', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '50px', fontWeight: 'bold', color: 'black', marginBottom: '10px' }}>Қош келдіңіз!</h1>
        <h2 style={{ marginBottom: '20px', color: 'black', fontSize: '20px', fontWeight: 'bold' }}>Кіру</h2>

        <form 
          style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              value={email}
              placeholder='example@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>Password</label>
            <input
              type="text"
              value={password}
              placeholder='******'
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>

          <button type="button" onClick={handleLogin} style={{ backgroundColor: '#f45b0c', color: 'white', padding: '10px', border: 'none', borderRadius: '6px', width: '100%', fontWeight: 'bold' }}>
            Кіру
          </button>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}

          <button
            type="button"
            onClick={() => navigate('/register')}
            style={{ marginTop: '20px', backgroundColor: '#fff', border: '1px solid #f25C0c', padding: '10px', borderRadius: '6px', width: '100%', fontWeight: 'bold', color: '#f25C0c' }}
          >
            Тіркелу
          </button>
        </form>
      </div>
    </div>
  );
}