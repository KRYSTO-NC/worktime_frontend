import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import etablissementService from './etablissementService'

const initialState = {
  etablissements: [],
  etablissement: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createEtablissement = createAsyncThunk(
  'etablissement/createEtablissement',
  async (etablissementData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await etablissementService.createEtablissement(
        etablissementData,
        token,
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getEtablissements = createAsyncThunk(
  'etablissement/getEtablissements',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await etablissementService.getEtablissements(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getEtablissement = createAsyncThunk(
  'etablissement/getEtablissement',
  async (etablissementId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await etablissementService.getEtablissement(etablissementId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updateEtablissement = createAsyncThunk(
  'etablissement/updateEtablissement',
  async ({ etablissementId, etablissementData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await etablissementService.updateEtablissement(
        etablissementId,
        etablissementData,
        token,
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deleteEtablissement = createAsyncThunk(
  'etablissement/deleteEtablissement',
  async (etablissementId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      await etablissementService.deleteEtablissement(etablissementId, token)
      return etablissementId // Return the ID of the deleted etablissement
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const etablissementSlice = createSlice({
  name: 'etablissement',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEtablissement.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEtablissement.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.etablissement = action.payload
      })
      .addCase(createEtablissement.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getEtablissements.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEtablissements.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.etablissements = action.payload
      })
      .addCase(getEtablissements.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getEtablissement.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEtablissement.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.etablissement = action.payload
      })
      .addCase(getEtablissement.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateEtablissement.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateEtablissement.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.etablissements = state.etablissements.map((etablissement) =>
          etablissement.id === action.payload.id
            ? action.payload
            : etablissement,
        )
      })
      .addCase(updateEtablissement.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteEtablissement.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEtablissement.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.etablissements = state.etablissements.data.filter(
          (etablissement) => etablissement.id !== action.payload,
        )
      })
      .addCase(deleteEtablissement.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = etablissementSlice.actions
export default etablissementSlice.reducer
