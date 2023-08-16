import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL + '/messages'

const createMessage = async (messageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, messageData, config)
  return response.data
}

const getMessages = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const getMessage = async (messageId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/${messageId}`, config)
  return response.data
}

const updateMessage = async (messageId, messageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `${API_URL}/${messageId}`,
    messageData,
    config,
  )
  return response.data
}

const deleteMessage = async (messageId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${messageId}`, config)
  return response.data
}

const closeMessage = async (messageId) => {
  const response = await axios.put(`${API_URL}/${messageId}`, {
    status: 'Archivée',
  })
  return response.data
}
const readMessage = async (messageId) => {
  const response = await axios.put(`${API_URL}/${messageId}`, {
    status: 'Lu',
  })
  return response.data
}

const messageService = {
  createMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage,
  closeMessage,
  readMessage,
}

export default messageService
