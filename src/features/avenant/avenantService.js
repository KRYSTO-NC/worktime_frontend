import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_API_URL + '/avenants'

const avenantService = {
  async addAvenantToContrat(contratId, avenantData, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.post(
      `${BASE_URL}/${contratId}/avenants`,
      avenantData,
      { headers },
    )
    return response.data
  },

  async getAvenants(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.get(BASE_URL, { headers })
    return response.data
  },

  async getAvenant(avenantId, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.get(`${BASE_URL}/${avenantId}`, { headers })
    return response.data
  },

  async updateAvenant(avenantId, avenantData, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.put(`${BASE_URL}/${avenantId}`, avenantData, {
      headers,
    })
    return response.data
  },

  async deleteAvenant(avenantId, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.delete(`${BASE_URL}/${avenantId}`, { headers })
    return response.data
  },
}

export default avenantService
