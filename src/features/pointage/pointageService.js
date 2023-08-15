import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL + '/pointages'

const createPointage = async (pointageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, pointageData, config)
  return response.data
}

const getPointages = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const getPointage = async (pointageId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/${pointageId}`, config)
  return response.data
}

const updatePointage = async (pointageId, pointageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `${API_URL}/${pointageId}`,
    pointageData,
    config,
  )
  return response.data
}

const deletePointage = async (pointageId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${pointageId}`, config)
  return response.data
}

const pointageService = {
  createPointage,
  getPointages,
  getPointage,
  updatePointage,
  deletePointage,
}

export default pointageService
