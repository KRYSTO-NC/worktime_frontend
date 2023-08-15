import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import horraireService from './horraireService' // Assurez-vous que ce service existe

const initialState = {
  horraires: [],
  horraire: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createHorraire = createAsyncThunk(
  'horraire/createHorraire',
  async (horraireData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await horraireService.createHorraire(horraireData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getHorraires = createAsyncThunk(
  'horraire/getHorraires',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await horraireService.getHorraires(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getHorraire = createAsyncThunk(
  'horraire/getHorraire',
  async (horraireId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await horraireService.getHorraire(horraireId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updateHorraire = createAsyncThunk(
  'horraire/updateHorraire',
  async ({ horraireId, horraireData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await horraireService.updateHorraire(
        horraireId,
        horraireData,
        token,
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deleteHorraire = createAsyncThunk(
  'horraire/deleteHorraire',
  async (horraireId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      await horraireService.deleteHorraire(horraireId, token)
      return horraireId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const horraireSlice = createSlice({
  name: 'horraire',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHorraire.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createHorraire.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.horraire = action.payload
      })
      .addCase(createHorraire.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getHorraires.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getHorraires.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.horraires = action.payload
      })
      .addCase(getHorraires.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getHorraire.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getHorraire.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.horraire = action.payload
      })
      .addCase(getHorraire.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateHorraire.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateHorraire.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.horraires = state.horraires.map((horraire) =>
          horraire.id === action.payload.id ? action.payload : horraire,
        )
      })
      .addCase(updateHorraire.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteHorraire.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteHorraire.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.horraires = state.horraires.filter(
          (horraire) => horraire.id !== action.payload,
        )
      })
      .addCase(deleteHorraire.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = horraireSlice.actions
export default horraireSlice.reducer
