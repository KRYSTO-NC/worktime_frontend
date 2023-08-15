import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL + '/pointeuses'

const createPointeuse = async (pointeuseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, pointeuseData, config)
  return response.data
}

const getPointeuses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const getPointeuse = async (pointeuseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/${pointeuseId}`, config)
  return response.data
}

const updatePointeuse = async (pointeuseId, pointeuseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `${API_URL}/${pointeuseId}`,
    pointeuseData,
    config,
  )
  return response.data
}

const deletePointeuse = async (pointeuseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${pointeuseId}`, config)
  return response.data
}

const pointeuseService = {
  createPointeuse,
  getPointeuses,
  getPointeuse,
  updatePointeuse,
  deletePointeuse,
}

export default pointeuseService
