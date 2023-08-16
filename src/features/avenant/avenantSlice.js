import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import avenantService from './avenantService'

const initialState = {
  avenants: [],
  avenant: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
}

export const addAvenantToContrat = createAsyncThunk(
  'avenant/addAvenantToContrat',
  async ({ contratId, avenantData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await avenantService.addAvenantToContrat(
        contratId,
        avenantData,
        token,
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getAvenants = createAsyncThunk(
  'avenant/getAvenants',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await avenantService.getAvenants(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getAvenant = createAsyncThunk(
  'avenant/getAvenant',
  async (avenantId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await avenantService.getAvenant(avenantId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updateAvenant = createAsyncThunk(
  'avenant/updateAvenant',
  async ({ avenantId, avenantData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await avenantService.updateAvenant(avenantId, avenantData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deleteAvenant = createAsyncThunk(
  'avenant/deleteAvenant',
  async (avenantId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      await avenantService.deleteAvenant(avenantId, token)
      return avenantId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const avenantSlice = createSlice({
  name: 'avenant',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAvenantToContrat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addAvenantToContrat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.avenants.push(action.payload)
      })
      .addCase(addAvenantToContrat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
      .addCase(getAvenants.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAvenants.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.avenants = action.payload
      })
      .addCase(getAvenants.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
      .addCase(getAvenant.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAvenant.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.avenant = action.payload
      })
      .addCase(getAvenant.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
      .addCase(updateAvenant.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAvenant.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.avenants = state.avenants.map((avenant) =>
          avenant.id === action.payload.id ? action.payload : avenant,
        )
      })
      .addCase(updateAvenant.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
      .addCase(deleteAvenant.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAvenant.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.avenants = state.avenants.filter(
          (avenant) => avenant.id !== action.payload,
        )
      })
      .addCase(deleteAvenant.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
  },
})

export const { reset } = avenantSlice.actions
export default avenantSlice.reducer
