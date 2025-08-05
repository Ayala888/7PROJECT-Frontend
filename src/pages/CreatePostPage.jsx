import React from 'react'
import CreatePost from '../components/post/CreatePost'
import Header from '../components/Header'

export default function CreatePostPage() {
  return (
    <div className="bg-[#F2F0E4]">
      <Header />
        <main className="w-full max-w-5xl mx-auto mt-4 sm:mt-6 md:mt-10 px-3 sm:px-4 md:px-6 pb-10">
          <CreatePost />
        </main>
      </div>
  )
}







