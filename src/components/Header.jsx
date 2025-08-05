import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { isAuth, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logoutHandler = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-[#F2F0E4] px-4 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-[#F24405] font-bold text-3xl">
          RoomTap
        </Link>

        
        <nav className="hidden md:flex items-center gap-8 text-[#F24405] font-medium text-lg">
          <Link to="/" className="hover:underline">Басты бет</Link>

          {isAuth && (
            <>
              <Link to="/favorites" className="hover:underline">Таңдаулылар</Link>
              <Link to="/create" className="hover:underline">Хабарландыру беру</Link>
              <Link to="/profile" className="hover:underline">Профиль</Link>
            </>
          )}
        </nav>

        
        <div className="hidden md:flex items-center gap-4">
          {isAuth ? (
            <button onClick={logoutHandler} className="text-[#F24405] font-medium hover:underline">
              Шығу
            </button>
          ) : (
            <>
              <Link to="/login" className="underline text-[#F24405]">Кіру</Link>
              <Link to="/register" className="underline text-[#F24405]">Тіркелу</Link>
            </>
          )}
        </div>

        
        <button className="md:hidden text-[#F24405]" onClick={toggleMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-4 text-[#F24405] font-medium text-lg bg-[#F2F0E4] pb-4">
          <Link to="/" onClick={toggleMenu} className="block">Басты бет</Link>

          {isAuth && (
            <>
              <Link to="/favorites" onClick={toggleMenu} className="block">Таңдаулылар</Link>
              <Link to="/create" onClick={toggleMenu} className="block">Хабарландыру беру</Link>
              <Link to="/profile" onClick={toggleMenu} className="block">Профиль</Link>
            </>
          )}

          {isAuth ? (
            <button onClick={logoutHandler} className="block">Шығу</button>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="block underline">Кіру</Link>
              <Link to="/register" onClick={toggleMenu} className="block underline">Тіркелу</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}









