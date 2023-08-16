import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customerService from './customerService'

const initialState = {
  customers: [],
  customer: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
}

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (customerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await customerService.createCustomer(customerData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getCustomers = createAsyncThunk(
  'customer/getCustomers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await customerService.getCustomers(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getCustomer = createAsyncThunk(
  'customer/getCustomer',
  async (customerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await customerService.getCustomer(customerId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async ({ customerId, customerData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await customerService.updateCustomer(
        customerId,
        customerData,
        token,
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async (customerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      await customerService.deleteCustomer(customerId, token)
      return customerId // Retournez l'ID du client supprimé
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const uploadCustomerLogo = createAsyncThunk(
  'customer/uploadCustomerLogo',
  async ({ customerId, logoFile }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user
      return await customerService.uploadCustomerLogo(
        customerId,
        logoFile,
        token,
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.customer = action.payload
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.customers = action.payload
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(getCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.customer = action.payload
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.customers = state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer,
        )
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.customers = state.customers.filter(
          (customer) => customer.id !== action.payload,
        )
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })

      .addCase(uploadCustomerLogo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(uploadCustomerLogo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.customer = { ...state.customer, logo: action.payload }
      })
      .addCase(uploadCustomerLogo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = action.payload
      })
  },
})

export const { reset } = customerSlice.actions
export default customerSlice.reducer
