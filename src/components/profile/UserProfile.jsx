import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function UserProfile() {
  const [user, setUser] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [message, setMessage] = useState('')

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('https://sevenproject-frontend-beckend-2.onrender.com/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUser(response.data)
      setForm({
        username: response.data.username || '',
        email: response.data.email || '',
        password: '',
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      const updatedFields = {}

      if (form.username !== user.username) updatedFields.username = form.username
      if (form.email !== user.email) updatedFields.email = form.email
      if (form.password) updatedFields.password = form.password

      if (Object.keys(updatedFields).length === 0) {
        setMessage('Өзгерістер енгізілмеді.')
        return
      }

      await axios.put('https://sevenproject-frontend-beckend-2.onrender.com/api/update', updatedFields, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMessage('Профиль сәтті жаңартылды ✅')
      setIsEditing(false)
      fetchProfile()
    } catch (error) {
      console.error(error)
      setMessage('Қате орын алды ❌')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-8 mb-10">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 flex items-center justify-center text-4xl sm:text-5xl text-gray-500 shadow">
          <span>{user.username?.charAt(0).toUpperCase() || 'U'}</span>
        </div>

        <div className="text-center sm:text-left mt-4 sm:mt-0">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">{user.username || 'Қолданушы'}</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-2 bg-gray-200 hover:bg-gray-300 text-sm text-gray-700 px-4 py-1 rounded-full transition"
          >
            {isEditing ? 'Жабу' : 'Өзгерту ✏️'}
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="space-y-6">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Атыңыз</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Жаңа пароль (міндетті емес)</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md text-sm transition"
          >
            Сақтау
          </button>

          {message && (
            <p className="text-sm text-green-600 mt-2">
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  )
}





