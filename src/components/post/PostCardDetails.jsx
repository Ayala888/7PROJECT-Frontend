import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react'; // ← стрелка иконкасы

export default function HomeCardDetails() {
  const { id } = useParams();
  const [home, setHome] = useState({});
  const whatsappLink = `https://wa.me/${home.phone?.replace(/\D/g, '')}`;

  useEffect(() => {
    axios.get(`https://sevenproject-frontend-beckend-2.onrender.com/api/homes/${id}`)
      .then(res => setHome(res.data));
  }, [id]);

  return (
    <div className="bg-[#F2F0E4] min-h-screen px-4 sm:px-6 lg:px-8 py-8">

      
      <div className="max-w-6xl mx-auto mb-6">
        <a
          href="/"
          className="inline-flex items-center text-gray-700 hover:text-black transition text-sm sm:text-base"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Артқа
        </a>
      </div>

      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <div className="w-full max-w-md h-[220px] sm:h-[250px] md:h-[280px] overflow-hidden rounded-xl shadow-md bg-gray-100">
            <img
              src={`https://sevenproject-frontend-beckend-2.onrender.com/uploads/${home.images?.[0]}`}
              alt="үй суреті"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-2">
              {home.created_at &&
                new Date(home.created_at).toLocaleDateString('kk-KZ', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })} ж. салынды
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold mb-3">{home.rooms} жалға беріледі</h2>

            <div className="flex items-center text-gray-600 mb-4 text-sm sm:text-base">
              <FaMapMarkerAlt className="mr-2" />
              <span>{home.city}, {home.district} ауданы</span>
            </div>

            <div className="text-xl sm:text-2xl font-bold text-[#F24405]">
              {home.price && Number(home.price).toLocaleString()} ₸ / ай
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto mt-10 bg-white p-5 sm:p-6 rounded-xl shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold mb-4">Сипаттама</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
          {home.description}
        </p>
      </div>

      
      <div className="max-w-6xl mx-auto mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-base sm:text-lg font-medium text-gray-800">
          <span className="text-gray-600 mr-2">Хабарландыру салған:</span>
          {home.username || 'Аты табылмады'}
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition text-sm sm:text-base"
        >
          <FaWhatsapp size={20} />
          <span>Жазу</span>
        </a>
      </div>
    </div>
  );
}




