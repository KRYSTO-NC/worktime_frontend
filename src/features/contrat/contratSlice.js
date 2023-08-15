import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import contratService from './contratService' // Assurez-vous que ce service est correctement importé

const initialState = {
  contrats: [],
  contrat: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
}

export const createContrat = createAsyncThunk(
  'contrat/createContrat',
  async (contratData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await contratService.createContrat(contratData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getContrats = createAsyncThunk(
  'contrat/getContrats',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await contratService.getContrats(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getContrat = createAsyncThunk(
  'contrat/getContrat',
  async (contratId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await contratService.getContrat(contratId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updateContrat = createAsyncThunk(
  'contrat/updateContrat',
  async ({ contratId, contratData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await contratService.updateContrat(contratId, contratData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deleteContrat = createAsyncThunk(
  'contrat/deleteContrat',
  async (contratId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      await contratService.deleteContrat(contratId, token)
      return contratId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const contratSlice = createSlice({
  name: 'contrat',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContrat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createContrat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.contrat = action.payload
      })
      .addCase(createContrat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(getContrats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getContrats.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.contrats = action.payload
      })
      .addCase(getContrats.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(getContrat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getContrat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.contrat = action.payload
      })
      .addCase(getContrat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(updateContrat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateContrat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.contrats = state.contrats.map((contrat) =>
          contrat.id === action.payload.id ? action.payload : contrat,
        )
      })
      .addCase(updateContrat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(deleteContrat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteContrat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.contrats = state.contrats.filter(
          (contrat) => contrat.id !== action.payload,
        )
      })
      .addCase(deleteContrat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
  },
})

export const { reset } = contratSlice.actions
export default contratSlice.reducer
