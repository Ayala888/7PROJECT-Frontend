import React from 'react'
import PostCardDetails from '../components/post/PostCardDetails'
import Header from '../components/Header'

export default function HomeCardDetailPage() {
  return (
    <div className="bg-[#F2F0E4] min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto mt-10 px-4">
        <PostCardDetails />
      </main>
    </div>
  )
}
