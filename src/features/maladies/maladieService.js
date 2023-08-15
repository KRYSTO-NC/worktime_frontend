import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL + '/maladies'

const createMaladie = async (maladieData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, maladieData, config)
  return response.data
}

const getMaladies = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const getMaladie = async (maladieId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/${maladieId}`, config)
  return response.data
}

const updateMaladie = async (maladieId, maladieData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `${API_URL}/${maladieId}`,
    maladieData,
    config,
  )
  return response.data
}

const deleteMaladie = async (maladieId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${maladieId}`, config)
  return response.data
}

const maladieService = {
  createMaladie,
  getMaladies,
  getMaladie,
  updateMaladie,
  deleteMaladie,
}

export default maladieService
