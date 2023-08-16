import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import absenceService from './absenceService'

const initialState = {
  absences: [],
  absence: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
}

export const createAbsence = createAsyncThunk(
  'absence/createAbsence',
  async (absenceData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await absenceService.createAbsence(absenceData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getAbsences = createAsyncThunk(
  'absence/getAbsences',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await absenceService.getAbsences(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getAbsence = createAsyncThunk(
  'absence/getAbsence',
  async (absenceId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await absenceService.getAbsence(absenceId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updateAbsence = createAsyncThunk(
  'absence/updateAbsence',
  async ({ absenceId, absenceData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await absenceService.updateAbsence(absenceId, absenceData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deleteAbsence = createAsyncThunk(
  'absence/deleteAbsence',
  async (absenceId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      await absenceService.deleteAbsence(absenceId, token)
      return absenceId // Retournez l'ID de l'absence supprimée
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const absenceSlice = createSlice({
  name: 'absence',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAbsence.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAbsence.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.absence = action.payload
      })
      .addCase(createAbsence.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(getAbsences.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAbsences.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.absences = action.payload
      })
      .addCase(getAbsences.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(getAbsence.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAbsence.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.absence = action.payload
      })
      .addCase(getAbsence.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(updateAbsence.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAbsence.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.absences = state.absences.map((absence) =>
          absence.id === action.payload.id ? action.payload : absence,
        )
      })
      .addCase(updateAbsence.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(deleteAbsence.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAbsence.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.absences = state.absences.filter(
          (absence) => absence.id !== action.payload,
        )
      })
      .addCase(deleteAbsence.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
  },
})

export const { reset } = absenceSlice.actions
export default absenceSlice.reducer
