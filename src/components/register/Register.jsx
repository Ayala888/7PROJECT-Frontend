import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import homeImage from '../../assets/home.png';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !email || !password) {
      setError('Барлық өрісті толтырыңыз');
      return;
    }

    const usernameRegex = /^[A-Za-zА-Яа-яЁёІіҚқҢңҒғҮүҰұӨөҺһӘә\s]+$/;
    if (!usernameRegex.test(username)) {
      setError('Аты тек әріптерден тұруы керек');
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        'Құпия сөзде кемінде 1 үлкен әріп, 1 кіші әріп, 1 сан және 1 символ болуы керек (6 таңбадан артық)'
      );
      return;
    }

    try {
      const res = await axios.post(
        'https://sevenproject-frontend-beckend-2.onrender.com/api/register',
        { username, email, password }
      );

      setSuccess('Тіркелу сәтті өтті!');
      console.log('✅ Тіркелді:', res.data);

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Сервер қатесі');
    }
  };

  return (
    <>
      <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
        {/* Сол жақ бөлік */}
        <div
          className="left-section"
          style={{
            flex: 1,
            backgroundColor: '#fff',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '150px',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#f25C0c',
            }}
          >
            RoomTap
          </div>
          <img
            src={homeImage}
            alt="Үй"
            style={{ width: '80%', maxWidth: '500px' }}
          />
        </div>

        {/* Оң жақ бөлік */}
        <div
          className="right-section"
          style={{
            flex: 1,
            backgroundColor: '#f25C0c',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '50px',
              fontWeight: 'bold',
              color: 'black',
              marginBottom: '10px',
            }}
          >
            Қош келдіңіз!
          </h1>
          <h2
            style={{
              marginBottom: '20px',
              color: 'black',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            Тіркелу
          </h2>

          <form
            onSubmit={handleRegister}
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '10px',
              width: '350px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ marginBottom: '15px' }}>
              <label
                style={{
                  display: 'block',
                  fontWeight: '500',
                  marginBottom: '5px',
                }}
              >
                Аты
              </label>
              <input
                type="text"
                value={username}
                placeholder="Ayala"
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label
                style={{
                  display: 'block',
                  fontWeight: '500',
                  marginBottom: '5px',
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontWeight: '500',
                  marginBottom: '5px',
                }}
              >
                Password
              </label>
              <input
                type="text"
                value={password}
                placeholder="Abcd@123"
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#f45b0c',
                color: 'white',
                padding: '10px',
                border: 'none',
                borderRadius: '6px',
                width: '100%',
                fontWeight: 'bold',
              }}
            >
              Тіркелу
            </button>

            {error && (
              <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
            )}
            {success && (
              <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>
            )}

            <button
              type="button"
              onClick={() => navigate('/login')}
              style={{
                marginTop: '20px',
                backgroundColor: '#fff',
                border: '1px solid #f25C0c',
                padding: '10px',
                borderRadius: '6px',
                width: '100%',
                fontWeight: 'bold',
                color: '#f25C0c',
              }}
            >
              Кіру
            </button>
          </form>
        </div>
      </div>

      {/* Адаптив стиль */}
      <style>
        {`
          @media (max-width: 768px) {
            .left-section {
              display: none !important;
            }
            .right-section {
              flex: 1 !important;
              width: 100% !important;
              padding: 20px !important;
            }
            .right-section form {
              width: 100% !important;
              max-width: 320px !important;
              padding: 20px !important;
            }
            .right-section input {
              padding: 8px !important;
              font-size: 14px !important;
            }
            .right-section h1 {
              font-size: 32px !important;
            }
            .right-section h2 {
              font-size: 16px !important;
            }
          }
        `}
      </style>
    </>
  );
}

