import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MoreVertical } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserPostCard() {
  const { id } = useParams();
  const [homes, setHomes] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://sevenproject-frontend-beckend-2.onrender.com/api/profile/homes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHomes(response.data);
    } catch (error) {
      console.error('Үйлерді алу қатесі:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://sevenproject-frontend-beckend-2.onrender.com/api/homes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHomes((prev) => prev.filter((home) => home.id !== id));
    } catch (error) {
      console.error('Өшіру қатесі:', error.response?.data || error.message);
      alert('Өшіру кезінде қате пайда болды');
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {homes.map((home) => (
        <div
          key={home._id || home.id}
          className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition relative"
        >
          <img
            src={`https://sevenproject-frontend-beckend-2.onrender.com/uploads/${home.images?.[0]}`}
            alt="үй суреті"
            className="w-full md:w-[280px] h-[200px] object-cover"
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

              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(openMenu === (home._id || home.id) ? null : (home._id || home.id));
                  }}
                  className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition"
                >
                  <MoreVertical size={20} />
                </button>

                {openMenu === (home._id || home.id) && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow-md text-sm z-10">
                    <button
                      onClick={() => handleEdit(home._id || home.id)}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      Өзгерту
                    </button>
                    <button
                      onClick={() => handleDelete(home._id || home.id)}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-red-500"
                    >
                      Өшіру
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h2 className="font-bold text-lg sm:text-xl mb-2">
              {home.rooms} бөлмелі үй жалға беріледі
            </h2>

            <div className="flex items-center text-gray-600 mb-2">
              <FaMapMarkerAlt className="mr-1" />
              <span>{home.city}, {home.district}</span>
            </div>

            <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
              <span className="text-base sm:text-lg font-semibold">Бағасы:</span>
              <span className="text-[#F24405] font-bold text-xl sm:text-2xl">
                {Math.floor(home.price)}₸
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}








