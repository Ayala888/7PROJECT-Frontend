import React from 'react';
import Header from '../components/Header';
import Favorites from '../components/Favorites';


export default function FavoritesPage() {
  return (
    <div className="bg-[#F2F0E4] min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto mt-10 px-4">
        <Favorites/>
      </main>
    </div>
  );
}