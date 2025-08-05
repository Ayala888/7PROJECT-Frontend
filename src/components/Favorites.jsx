import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get('https://sevenproject-frontend-beckend-2.onrender.com/api/favorites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFavorites(res.data);
    } catch (err) {
      console.error('Таңдаулыларды алу қатесі:', err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const removeFromFavorites = async (e, homeId) => {
    e.preventDefault();
    try {
      await axios.delete(`https://sevenproject-frontend-beckend-2.onrender.com/api/favorites/${homeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFavorites((prev) => prev.filter((home) => home.id !== homeId));
    } catch (error) {
      console.error('Таңдаулылардан өшіру қатесі:', error);
    }
  };

  return (
    <div className="bg-[#F2F0E4] min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Таңдаулылар</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">Сізде әлі таңдаулылар жоқ.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {favorites.map((home) => (
            <Link
              to={`/home/${home.id}`}
              key={home.id}
              className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={
                  home.images && home.images[0]
                    ? `https://sevenproject-frontend-beckend-2.onrender.com/uploads/${home.images[0]}`
                    : '/no-image.jpg'
                }
                alt="үй суреті"
                className="w-full sm:w-[260px] h-[200px] object-cover"
              />
              <div className="p-4 flex flex-col justify-between w-full">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>
                    {new Date(home.created_at).toLocaleDateString('kk-KZ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <button
                    onClick={(e) => removeFromFavorites(e, home.id)}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                  >
                    <Heart
                      size={20}
                      className="fill-red-600 text-red-600 transition"
                    />
                  </button>
                </div>

                <h2 className="font-bold text-lg sm:text-xl mb-2">{home.rooms} жалға беріледі</h2>

                <div className="flex items-center text-gray-600 mb-2">
                  <FaMapMarkerAlt className="mr-1" />
                  <span className="text-sm sm:text-base">{home.city}, {home.district}</span>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-base font-semibold">Бағасы:</span>
                  <span className="text-[#F24405] font-bold text-xl sm:text-2xl">
                    {Math.floor(home.price)}₸
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


