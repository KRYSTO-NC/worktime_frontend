import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import pointageService from './pointageService'

const initialState = {
  pointages: [],
  pointage: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createPointage = createAsyncThunk(
  'pointage/createPointage',
  async (pointageData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await pointageService.createPointage(pointageData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getPointages = createAsyncThunk(
  'pointage/getPointages',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await pointageService.getPointages(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getPointage = createAsyncThunk(
  'pointage/getPointage',
  async (pointageId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await pointageService.getPointage(pointageId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updatePointage = createAsyncThunk(
  'pointage/updatePointage',
  async ({ pointageId, pointageData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await pointageService.updatePointage(
        pointageId,
        pointageData,
        token,
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deletePointage = createAsyncThunk(
  'pointage/deletePointage',
  async (pointageId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      await pointageService.deletePointage(pointageId, token)
      return pointageId // Return the ID of the deleted pointage
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const pointageSlice = createSlice({
  name: 'pointage',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPointage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPointage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pointage = action.payload
      })
      .addCase(createPointage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPointages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPointages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pointages = action.payload
      })
      .addCase(getPointages.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPointage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPointage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pointage = action.payload
      })
      .addCase(getPointage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePointage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePointage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pointages = state.pointages.map((pointage) =>
          pointage.id === action.payload.id ? action.payload : pointage,
        )
      })
      .addCase(updatePointage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePointage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePointage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pointages = state.pointages.data.filter(
          (pointage) => pointage.id !== action.payload,
        )
      })
      .addCase(deletePointage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = pointageSlice.actions
export default pointageSlice.reducer
