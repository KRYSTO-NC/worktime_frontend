import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL + '/horraires'

const createHorraire = async (horraireData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, horraireData, config)
  return response.data
}

const getHorraires = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const getHorraire = async (horraireId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/${horraireId}`, config)
  return response.data
}

const updateHorraire = async (horraireId, horraireData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `${API_URL}/${horraireId}`,
    horraireData,
    config,
  )
  return response.data
}

const deleteHorraire = async (horraireId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${horraireId}`, config)
  return response.data
}

const horraireService = {
  createHorraire,
  getHorraires,
  getHorraire,
  updateHorraire,
  deleteHorraire,
}

export default horraireService
