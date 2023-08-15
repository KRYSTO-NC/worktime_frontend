import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import maladieService from './maladieService'

const initialState = {
  maladies: [],
  maladie: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
}

export const createMaladie = createAsyncThunk(
  'maladie/createMaladie',
  async (maladieData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await maladieService.createMaladie(maladieData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getMaladies = createAsyncThunk(
  'maladie/getMaladies',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await maladieService.getMaladies(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getMaladie = createAsyncThunk(
  'maladie/getMaladie',
  async (maladieId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await maladieService.getMaladie(maladieId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updateMaladie = createAsyncThunk(
  'maladie/updateMaladie',
  async ({ maladieId, maladieData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await maladieService.updateMaladie(maladieId, maladieData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deleteMaladie = createAsyncThunk(
  'maladie/deleteMaladie',
  async (maladieId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      await maladieService.deleteMaladie(maladieId, token)
      return maladieId // Return the ID of the deleted maladie
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const maladieSlice = createSlice({
  name: 'maladie',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMaladie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMaladie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.maladie = action.payload
      })
      .addCase(createMaladie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(getMaladies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMaladies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.maladies = action.payload
      })
      .addCase(getMaladies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(getMaladie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMaladie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.maladie = action.payload
      })
      .addCase(getMaladie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(updateMaladie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMaladie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.maladies = state.maladies.map((maladie) =>
          maladie.id === action.payload.id ? action.payload : maladie,
        )
      })
      .addCase(updateMaladie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(deleteMaladie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMaladie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.maladies = state.maladies.data.filter(
          (maladie) => maladie.id !== action.payload,
        )
      })
      .addCase(deleteMaladie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
  },
})

export const { reset } = maladieSlice.actions
export default maladieSlice.reducer
