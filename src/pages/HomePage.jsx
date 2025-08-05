import React, { useState } from 'react';
import Header from '../components/Header';
import PostCard from '../components/post/PostCard';
import SearchSection from '../components/SearchSection'; 

export default function HomesPage() {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    console.log('Іздеу:', search);

  };

  return (
    <div className="bg-[#F2F0E4] min-h-screen">
      <Header />
      <SearchSection
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <main className="max-w-5xl mx-auto mt-10 px-4">
        <PostCard search={search} />
      </main>
    </div>
  );
}













