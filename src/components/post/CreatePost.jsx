import React, { useState, useRef } from 'react'
import axios from 'axios'

export default function CreatePost() {
  const [form, setForm] = useState({
    rooms: '',
    city: '',
    district: '',
    price: '',
    description: '',
    phone: '',
    images: []
  })

  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      setForm(prev => ({ ...prev, images: [file] }))
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const formData = new FormData()

    Object.entries(form).forEach(([key, value]) => {
      if (key === 'images') {
        if (value.length > 0) formData.append('images', value[0])
      } else {
        formData.append(key, value)
      }
    })

    try {
      await axios.post('https://sevenproject-frontend-beckend-2.onrender.com/api/homes', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      alert('✅ Үй қосылды')
    } catch (err) {
      console.error(err.response?.data || err.message)
      alert('❌ Қате: ' + (err.response?.data?.message || 'Сервер қатесі'))
    }
  }

  return (
    <div className="bg-[#F2F0E4] min-h-screen px-4 md:px-6 lg:px-8 py-6 md:py-10">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
        Хабарландыру беру
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-5 md:p-8 lg:p-10 max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10"
      >
        {/* Сурет бөлігі */}
        <div className="flex flex-col items-center lg:items-start lg:w-1/3">
          <label className="font-medium mb-2 text-gray-700 text-base">Сурет</label>
          <p className="text-sm text-gray-500 mb-3 text-center lg:text-left">
            Бір ғана сурет жүктеледі (бетке шығатын сурет).
          </p>

          <div
            className="border rounded-lg w-40 h-40 md:w-48 md:h-48 flex items-center justify-center overflow-hidden bg-gray-100 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? (
              <img src={preview} alt="preview" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-800 font-medium text-sm text-center">
                Сурет қосу
              </span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Input бөлімі */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="md:col-span-1">
            <label className="block mb-1 text-gray-700 font-medium">Бөлме саны</label>
            <input
              name="rooms"
              placeholder="Мысалы, 3 бөлмелі үй"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 md:py-3 bg-gray-100 rounded-md text-sm md:text-base"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block mb-1 text-gray-700 font-medium">Қала</label>
            <input
              name="city"
              placeholder="Қала"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 md:py-3 bg-gray-100 rounded-md text-sm md:text-base"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block mb-1 text-gray-700 font-medium">Район</label>
            <input
              name="district"
              placeholder="Район"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 md:py-3 bg-gray-100 rounded-md text-sm md:text-base"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block mb-1 text-gray-700 font-medium">Бағасы</label>
            <input
              name="price"
              placeholder="Бағасы"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 md:py-3 bg-gray-100 rounded-md text-sm md:text-base"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-gray-700 font-medium">Сипаттама</label>
            <textarea
              name="description"
              placeholder="Үй туралы толық мәлімет"
              rows={4}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 md:py-3 bg-gray-100 rounded-md resize-none text-sm md:text-base"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-gray-700 font-medium">Телефон нөмірі</label>
            <input
              name="phone"
              placeholder="Телефон нөмірі"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 md:py-3 bg-gray-100 rounded-md text-sm md:text-base"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#F24405] hover:bg-[#d53b00] text-white py-3 rounded-lg font-semibold text-base transition"
            >
              Хабарландыру беру
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}







