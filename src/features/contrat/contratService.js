import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_API_URL + '/contrats'

const contratService = {
  async createContrat(contratData, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.post(BASE_URL, contratData, { headers })
    return response.data
  },

  async getContrats(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.get(BASE_URL, { headers })
    return response.data
  },

  async getContrat(contratId, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.get(`${BASE_URL}/${contratId}`, { headers })
    return response.data
  },

  async updateContrat(contratId, contratData, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.put(`${BASE_URL}/${contratId}`, contratData, {
      headers,
    })
    return response.data
  },

  async deleteContrat(contratId, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.delete(`${BASE_URL}/${contratId}`, { headers })
    return response.data
  },
}

export default contratService
