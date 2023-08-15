import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL + '/etablissements'

const createEtablissement = async (etablissementData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, etablissementData, config)
  return response.data
}

const getEtablissements = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const getEtablissement = async (etablissementId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/${etablissementId}`, config)
  return response.data
}

const updateEtablissement = async (
  etablissementId,
  etablissementData,
  token,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `${API_URL}/${etablissementId}`,
    etablissementData,
    config,
  )
  return response.data
}

const deleteEtablissement = async (etablissementId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${etablissementId}`, config)
  return response.data
}

const etablissementService = {
  createEtablissement,
  getEtablissements,
  getEtablissement,
  updateEtablissement,
  deleteEtablissement,
}

export default etablissementService
