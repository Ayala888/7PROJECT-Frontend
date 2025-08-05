import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreatePostPage from './pages/CreatePostPage';
import PostCardDetailPage from './pages/PostCardDetailPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import PrivateRoute from './components/PrivatePoute';



function App() {
  return (
    <Routes>

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />


      <Route
        path="/*"
        element={
            <Routes>
              <Route path="/" element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
                } />
              <Route path="/create" element={
                <PrivateRoute>
                  <CreatePostPage />
                </PrivateRoute> 
              }/>
              <Route path="/home/:id" element={
                <PrivateRoute> 
                  <PostCardDetailPage />                
                </PrivateRoute> 
              } />
              <Route path="/profile" element={
                <PrivateRoute> 
                  <ProfilePage />
                </PrivateRoute> 
              } />
              <Route path="/favorites" element={
                <PrivateRoute> 
                  <FavoritesPage />
                </PrivateRoute> 
              } />
            </Routes>
        }
      />
    </Routes>
  );
}

export default App;

