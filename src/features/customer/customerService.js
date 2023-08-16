import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_API_URL + '/customers'

const customerService = {
  async createCustomer(customerData, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.post(BASE_URL, customerData, { headers })
    return response.data
  },

  async getCustomers(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.get(BASE_URL, { headers })
    return response.data
  },

  async getCustomer(customerId, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.get(`${BASE_URL}/${customerId}`, { headers })
    return response.data
  },

  async updateCustomer(customerId, customerData, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.put(
      `${BASE_URL}/${customerId}`,
      customerData,
      { headers },
    )
    return response.data
  },

  async deleteCustomer(customerId, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.delete(`${BASE_URL}/${customerId}`, {
      headers,
    })
    return response.data
  },

  async uploadCustomerLogo(customerId, logoFile, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }

    const formData = new FormData()
    formData.append('logo', logoFile)

    const response = await axios.put(
      `${BASE_URL}/${customerId}/photo`,
      formData,
      { headers },
    )
    return response.data
  },
}

export default customerService
