import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_API_URL + '/documents'

const documentService = {
  async getDocuments(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const response = await axios.get(`${baseURL}`, { headers })
    return response.data
  },

  async getDocument(id, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const response = await axios.get(`${baseURL}/${id}`, { headers })
    return response.data
  },

  async createDocument(documentData, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    const response = await axios.post(`${baseURL}`, documentData, { headers })
    return response.data
  },

  async updateDocument(id, documentData, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    const response = await axios.put(`${baseURL}/${id}`, documentData, {
      headers,
    })
    return response.data
  },

  async deleteDocument(id, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const response = await axios.delete(`${baseURL}/${id}`, { headers })
    return response.data
  },

  async uploadFile(id, file, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
    const formData = new FormData()
    formData.append('document', file)
    const response = await axios.put(`${baseURL}/${id}/file`, formData, {
      headers,
    })
    return response.data
  },
}

export default documentService
