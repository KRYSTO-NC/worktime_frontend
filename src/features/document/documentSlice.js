import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import documentService from './documentService'

const initialState = {
  documents: [],
  document: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
}

export const createDocument = createAsyncThunk(
  'document/createDocument',
  async (documentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await documentService.createDocument(documentData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getDocuments = createAsyncThunk(
  'document/getDocuments',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await documentService.getDocuments(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getDocument = createAsyncThunk(
  'document/getDocument',
  async (documentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await documentService.getDocument(documentId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updateDocument = createAsyncThunk(
  'document/updateDocument',
  async ({ documentId, documentData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await documentService.updateDocument(
        documentId,
        documentData,
        token,
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deleteDocument = createAsyncThunk(
  'document/deleteDocument',
  async (documentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      await documentService.deleteDocument(documentId, token)
      return documentId // Retournez l'ID du document supprimé
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDocument.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.document = action.payload
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(getDocuments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documents = action.payload
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(getDocument.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDocument.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.document = action.payload
      })
      .addCase(getDocument.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(updateDocument.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documents = state.documents.map((document) =>
          document.id === action.payload.id ? action.payload : document,
        )
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(deleteDocument.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documents = state.documents.filter(
          (document) => document.id !== action.payload,
        )
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
  },
})

export const { reset } = documentSlice.actions
export default documentSlice.reducer
