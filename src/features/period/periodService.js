import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL + '/periods'

const createPeriod = async (periodData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, periodData, config)
  return response.data
}

const getPeriods = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const getPeriod = async (periodId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/${periodId}`, config)
  return response.data
}

const updatePeriod = async (periodId, periodData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${API_URL}/${periodId}`, periodData, config)
  return response.data
}

const deletePeriod = async (periodId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${periodId}`, config)
  return response.data
}

const periodService = {
  createPeriod,
  getPeriods,
  getPeriod,
  updatePeriod,
  deletePeriod,
}

export default periodService
