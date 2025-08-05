import React from 'react';
import { Search } from 'lucide-react';

export default function SearchSection({ search, setSearch, handleSearch }) {
  return (
    <div
      className="relative w-full h-[500px] sm:h-[550px] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          'url(https://www.usnews.com/object/image/00000167-32b5-dff7-a56f-7bb53c640000/181120-bedroom-stock.jpg?update-time=1542744061266&size=responsive640)',
      }}
    >
      
      <div className="absolute inset-0 bg-black/50" />

    
      <div className="relative text-center text-white px-4 w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Өзіңе лайық үйді тап
        </h1>
        <p className="mb-6 text-sm sm:text-base md:text-lg">
          Біздің сайтпен арманыңдағы үйді оңай таба аласыз
        </p>

        <div className="flex items-center bg-white rounded-full overflow-hidden shadow-xl w-full max-w-md sm:max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Қала, район немесе бөлме саны..."
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-gray-800 text-sm sm:text-base outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-[#f59e0b] hover:bg-[#d97706] transition-all duration-200 px-4 sm:px-6 py-2 sm:py-3 text-white flex items-center gap-2"
          >
            <Search size={18} />
            <span className="hidden sm:inline">Іздеу</span>
          </button>
        </div>
      </div>
    </div>
  );
}



