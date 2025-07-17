import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk koji fetch-uje podatke
export const fetchComputers = createAsyncThunk(
  'computers/fetchComputers',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/api/computers');
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to load computers');
    }
  }
);

export const addComputer = createAsyncThunk(
    'computers/addComputer',
    async (newComputer, thunkAPI) => {
        try {
            const response = await fetch('/api/computers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComputer)  
            });
            const data = await response.json();
            return data;
        } catch(error) {
            return thunkAPI.rejectWithValue('Failed to add PC')
        }
    }
)

const computersSlice = createSlice({
  name: 'computers',
  initialState: {
    computers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchComputers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComputers.fulfilled, (state, action) => {
        state.loading = false;
        state.computers = action.payload;
      })
      .addCase(fetchComputers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // POST
      .addCase(addComputer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComputer.fulfilled, (state, action) => {
        state.loading = false;
        state.computers.push(action.payload);
      })
      .addCase(addComputer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default computersSlice.reducer;
