import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import periodService from './periodService'

const initialState = {
  periods: [],
  period: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createPeriod = createAsyncThunk(
  'period/createPeriod',
  async (periodData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await periodService.createPeriod(periodData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getPeriods = createAsyncThunk(
  'period/getPeriods',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await periodService.getPeriods(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getPeriod = createAsyncThunk(
  'period/getPeriod',
  async (periodId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await periodService.getPeriod(periodId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updatePeriod = createAsyncThunk(
  'period/updatePeriod',
  async ({ periodId, periodData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await periodService.updatePeriod(periodId, periodData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deletePeriod = createAsyncThunk(
  'period/deletePeriod',
  async (periodId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      await periodService.deletePeriod(periodId, token)
      return periodId // Return the ID of the deleted period
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const periodSlice = createSlice({
  name: 'period',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPeriod.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPeriod.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.period = action.payload
      })
      .addCase(createPeriod.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPeriods.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPeriods.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.periods = action.payload
      })
      .addCase(getPeriods.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPeriod.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPeriod.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.period = action.payload
      })
      .addCase(getPeriod.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePeriod.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePeriod.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.periods = state.periods.map((period) =>
          period.id === action.payload.id ? action.payload : period,
        )
      })
      .addCase(updatePeriod.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePeriod.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePeriod.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.periods = state.periods.filter(
          (period) => period.id !== action.payload,
        )
      })
      .addCase(deletePeriod.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = periodSlice.actions
export default periodSlice.reducer
