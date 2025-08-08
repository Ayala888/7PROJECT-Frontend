import React from 'react';
import Header from '../components/Header';
import UserProfile from '../components/profile/UserProfile';
import UserPostCard from '../components/profile/UserPostCard';

export default function ProfilePage() {
  return (
    <div className="bg-[#F2F0E4] min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto mt-10 px-4">
  
        <section className="bg-white rounded-xl shadow-md p-8 mb-12 px-4">
          <UserProfile />
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


