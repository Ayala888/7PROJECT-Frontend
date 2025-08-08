import React from 'react';
import Header from '../components/Header';
import UserProfile from '../components/profile/UserProfile';
import UserPostCard from '../components/profile/UserPostCard';

export default function ProfilePage() {
  return (
    <div className="bg-[#F2F0E4] min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto mt-10 px-4">
  
      <section className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg mb-12 max-w-3xl mx-auto overflow-hidden border border-gray-200">
       <div className="h-2 bg-gradient-to-r from-orange-400 to-pink-500"></div>

       <div className="p-6 sm:p-8">
        <UserProfile />
       </div>
      </section>


        
        <section>
          <h2 className="text-xl font-semibold mb-6 px-4">Менің хабарландыруларым</h2>
          <div className="space-y-6 px-4">
            <UserPostCard />
          </div>
        </section>
      </main>
    </div>
  );
}


