import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_API_URL + '/absence'

const absenceService = {
  // Créer une absence
  async createAbsence(absenceData, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.post(BASE_URL, absenceData, { headers })
    return response.data
  },

  // Récupérer toutes les absences
  async getAbsences(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.get(BASE_URL, { headers })
    return response.data
  },

  // Récupérer une seule absence par son ID
  async getAbsence(absenceId, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.get(`${BASE_URL}/${absenceId}`, { headers })
    return response.data
  },

  // Mettre à jour une absence
  async updateAbsence(absenceId, absenceData, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.put(`${BASE_URL}/${absenceId}`, absenceData, {
      headers,
    })
    return response.data
  },

  // Supprimer une absence
  async deleteAbsence(absenceId, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.delete(`${BASE_URL}/${absenceId}`, { headers })
    return response.data
  },
}

export default absenceService
