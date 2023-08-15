import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import pointeuseService from './pointeuseService'

const initialState = {
  pointeuses: [],
  pointeuse: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createPointeuse = createAsyncThunk(
  'pointeuse/createPointeuse',
  async (pointeuseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await pointeuseService.createPointeuse(pointeuseData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getPointeuses = createAsyncThunk(
  'pointeuse/getPointeuses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await pointeuseService.getPointeuses(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getPointeuse = createAsyncThunk(
  'pointeuse/getPointeuse',
  async (pointeuseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await pointeuseService.getPointeuse(pointeuseId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updatePointeuse = createAsyncThunk(
  'pointeuse/updatePointeuse',
  async ({ pointeuseId, pointeuseData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await pointeuseService.updatePointeuse(
        pointeuseId,
        pointeuseData,
        token,
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deletePointeuse = createAsyncThunk(
  'pointeuse/deletePointeuse',
  async (pointeuseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      await pointeuseService.deletePointeuse(pointeuseId, token)
      return pointeuseId // Return the ID of the deleted pointeuse
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const pointeuseSlice = createSlice({
  name: 'pointeuse',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPointeuse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPointeuse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pointeuse = action.payload
      })
      .addCase(createPointeuse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPointeuses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPointeuses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pointeuses = action.payload
      })
      .addCase(getPointeuses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPointeuse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPointeuse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pointeuse = action.payload
      })
      .addCase(getPointeuse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePointeuse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePointeuse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pointeuses = state.pointeuses.map((pointeuse) =>
          pointeuse.id === action.payload.id ? action.payload : pointeuse,
        )
      })
      .addCase(updatePointeuse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePointeuse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePointeuse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pointeuses = state.pointeuses.data.filter(
          (pointeuse) => pointeuse.id !== action.payload,
        )
      })
      .addCase(deletePointeuse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = pointeuseSlice.actions
export default pointeuseSlice.reducer
