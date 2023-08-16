import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import messageService from './messageService'

const initialState = {
  messages: [],
  message: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
}

export const createMessage = createAsyncThunk(
  'message/createMessage',
  async (messageData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await messageService.createMessage(messageData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getMessages = createAsyncThunk(
  'message/getMessages',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await messageService.getMessages(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getMessage = createAsyncThunk(
  'message/getMessage',
  async (messageId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await messageService.getMessage(messageId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updateMessage = createAsyncThunk(
  'message/updateMessage',
  async ({ messageId, messageData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await messageService.updateMessage(messageId, messageData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deleteMessage = createAsyncThunk(
  'message/deleteMessage',
  async (messageId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      await messageService.deleteMessage(messageId, token)
      return messageId // Return the ID of the deleted message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const closeMessage = createAsyncThunk(
  'messages/close',
  async (messageId, thunkAPI) => {
    try {
      return await messageService.closeMessage(messageId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)
export const readMessage = createAsyncThunk(
  'messages/read',
  async (messageId, thunkAPI) => {
    try {
      return await messageService.readMessage(messageId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages = action.payload
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
      .addCase(getMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(getMessage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
      .addCase(updateMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages = state.messages.map((message) =>
          message.id === action.payload.id ? action.payload : message,
        )
      })
      .addCase(updateMessage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
      .addCase(deleteMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages = state.messages.filter(
          (message) => message.id !== action.payload,
        )
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
      .addCase(closeMessage.fulfilled, (state, action) => {
        state.isLoading = false
        console.log(state.messages)
        state.messages.map((messageData) =>
          messageData._id === action.payload._id
            ? // console.log(messageData.data.status),
              (messageData.status = 'Archivée')
            : messageData,
        )
      })

      .addCase(readMessage.fulfilled, (state, action) => {
        state.isLoading = false
        console.log(state.messages)
        state.messages.map((messageData) =>
          messageData._id === action.payload._id
            ? // console.log(messageData.data.status),
              (messageData.status = 'Lu')
            : messageData,
        )
      })
  },
})

export const { reset } = messageSlice.actions
export default messageSlice.reducer
