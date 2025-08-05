import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Heart } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function PostCard({ search }) {
  const [homes, setHomes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchHomes = async () => {
    try {
      const url = search.trim()
        ? `https://sevenproject-frontend-beckend-2.onrender.com/api/homes/search?search=${search}`
        : 'https://sevenproject-frontend-beckend-2.onrender.com/api/homes';

      const response = await axios.get(url);
      setHomes(response.data);
    } catch (error) {
      console.error('Үйлерді алу қатесі:', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await axios.get('https://sevenproject-frontend-beckend-2.onrender.com/api/favorites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const favoriteIds = res.data.map((fav) => fav.id);
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Таңдаулыларды алу қатесі:', error);
    }
  };

  useEffect(() => {
    fetchHomes();
  }, [search]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const toggleFavorite = async (e, homeId) => {
    e.preventDefault();
    const isFavorite = favorites.includes(homeId);

    try {
      if (isFavorite) {
        await axios.delete(`https://sevenproject-frontend-beckend-2.onrender.com/api/favorites/${homeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFavorites(favorites.filter((id) => id !== homeId));
      } else {
        await axios.post(`https://sevenproject-frontend-beckend-2.onrender.com/api/favorites/${homeId}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFavorites([...favorites, homeId]);
      }
    } catch (error) {
      console.error('Лайк қате:', error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 mt-6">Хабарландырулар</h2>
  
      {homes.length === 0 && (
        <p className="text-gray-500 text-center">Тиісті үйлер табылмады</p>
      )}
  
      {homes.map((home) => {
        const isFavorite = favorites.includes(home.id);
        return (
          <Link
            to={`/home/${home.id}`}
            key={home.id}
            className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={home.images[0]}
              alt="үй суреті"
              className="w-full h-[200px] object-cover md:w-[280px] md:h-[200px]"
            />
            <div className="p-3 md:p-4 flex flex-col justify-between w-full">
              <div className="flex justify-between items-start text-sm text-gray-500 mb-2">
                <span>
                  {new Date(home.created_at).toLocaleDateString('kk-KZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <button
                  onClick={(e) => toggleFavorite(e, home.id)}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isFavorite ? 'bg-red-100' : 'hover:bg-[#F24405]/10'
                  }`}
                >
                  <Heart
                    size={20}
                    className={`transition-all duration-200 ${
                      isFavorite ? 'fill-red-600 text-red-600' : 'fill-none text-[#F24405]'
                    }`}
                  />
                </button>
              </div>
  
              <h2 className="font-bold text-lg md:text-xl mb-1 md:mb-2">{home.rooms} жалға беріледі</h2>
  
              <div className="flex items-center text-gray-600 mb-1 md:mb-2 text-sm md:text-base">
                <FaMapMarkerAlt className="mr-1" />
                <span>{home.city}, {home.district}</span>
              </div>
  
              <div className="flex justify-between items-center mt-2">
                <span className="text-base font-semibold">Бағасы:</span>
                <span className="text-[#F24405] font-bold text-xl md:text-2xl">
                  {Math.floor(home.price)}₸
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
  
}







