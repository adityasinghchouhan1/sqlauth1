// Full React Frontend for JWT-based Category & Service CRUD
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000',
})

function App() {
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('admin@codesfortomorrow.com')
  const [password, setPassword] = useState('Admin123!@#')

  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  const [services, setServices] = useState([])
  const [serviceName, setServiceName] = useState('')
  const [serviceType, setServiceType] = useState('Normal')
  const [priceOptions, setPriceOptions] = useState([
    { duration: '', price: '', type: 'Hourly' },
  ])

  const login = async () => {
    const res = await api.post('/login', { email, password })
    setToken(res.data.token)
  }

  const getCategories = async () => {
    const res = await api.get('/category', {
      headers: { Authorization: token },
    })
    setCategories(res.data)
  }

  const createCategory = async () => {
    await api.post(
      '/category',
      { name: categoryName },
      { headers: { Authorization: token } }
    )
    setCategoryName('')
    getCategories()
  }

  const deleteCategory = async (id) => {
    await api.delete(`/category/${id}`, {
      headers: { Authorization: token },
    })
    getCategories()
  }

  const selectCategory = async (id) => {
    setSelectedCategoryId(id)
    const res = await api.get(`/category/${id}/services`, {
      headers: { Authorization: token },
    })
    setServices(res.data)
  }

  const addService = async () => {
    await api.post(
      `/category/${selectedCategoryId}/service`,
      { name: serviceName, type: serviceType, priceOptions },
      { headers: { Authorization: token } }
    )
    setServiceName('')
    setPriceOptions([{ duration: '', price: '', type: 'Hourly' }])
    selectCategory(selectedCategoryId)
  }

  const deleteService = async (serviceId) => {
    await api.delete(`/category/${selectedCategoryId}/service/${serviceId}`, {
      headers: { Authorization: token },
    })
    selectCategory(selectedCategoryId)
  }

  const updatePriceOption = (index, field, value) => {
    const newOptions = [...priceOptions]
    newOptions[index][field] = value
    setPriceOptions(newOptions)
  }

  const addPriceOptionField = () => {
    setPriceOptions([
      ...priceOptions,
      { duration: '', price: '', type: 'Hourly' },
    ])
  }

  useEffect(() => {
    if (token) getCategories()
  }, [token])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">JWT Category-Service Manager</h1>

      {!token ? (
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-2 mr-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border p-2 mr-2"
          />
          <button onClick={login} className="bg-blue-500 text-white px-4 py-2">
            Login
          </button>
        </div>
      ) : (
        <div>
          <div className="my-4">
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="New Category"
              className="border p-2 mr-2"
            />
            <button
              onClick={createCategory}
              className="bg-green-600 text-white px-4 py-2"
            >
              Add Category
            </button>
          </div>

          <ul className="mb-4">
            {categories.map((cat) => (
              <li key={cat.id} className="mb-2">
                <span
                  onClick={() => selectCategory(cat.id)}
                  className="cursor-pointer underline text-blue-600"
                >
                  {cat.name}
                </span>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="bg-red-500 text-white px-2 py-1 ml-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {selectedCategoryId && (
            <div>
              <h2 className="text-xl font-semibold">Services</h2>
              <div className="my-2">
                <input
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="Service Name"
                  className="border p-2 mr-2"
                />
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="border p-2 mr-2"
                >
                  <option value="Normal">Normal</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
              {priceOptions.map((opt, idx) => (
                <div key={idx} className="mb-2">
                  <input
                    placeholder="Duration"
                    value={opt.duration}
                    onChange={(e) =>
                      updatePriceOption(idx, 'duration', e.target.value)
                    }
                    className="border p-2 mr-2"
                  />
                  <input
                    placeholder="Price"
                    value={opt.price}
                    onChange={(e) =>
                      updatePriceOption(idx, 'price', e.target.value)
                    }
                    className="border p-2 mr-2"
                  />
                  <select
                    value={opt.type}
                    onChange={(e) =>
                      updatePriceOption(idx, 'type', e.target.value)
                    }
                    className="border p-2"
                  >
                    <option value="Hourly">Hourly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              ))}
              <button
                onClick={addPriceOptionField}
                className="bg-gray-400 text-white px-2 py-1 my-2"
              >
                + Add Price Option
              </button>
              <br />
              <button
                onClick={addService}
                className="bg-purple-600 text-white px-4 py-2"
              >
                Add Service
              </button>

              <ul className="mt-4">
                {services.map((srv) => (
                  <li key={srv.id} className="mb-2">
                    <strong>{srv.name}</strong> ({srv.type})
                    <button
                      onClick={() => deleteService(srv.id)}
                      className="bg-red-500 text-white px-2 py-1 ml-2"
                    >
                      Delete
                    </button>
                    <ul className="ml-4 text-sm">
                      {srv.PriceOptions.map((opt, i) => (
                        <li key={i}>
                          {opt.duration} - ₹{opt.price} ({opt.type})
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
