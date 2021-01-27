import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type logHistorySliceState = {
  logs: LogState[];
  users: { [id: string]: string };
};

type LogState = {
  text: string;
  user: string;
  date: string;
};

export const initialState: logHistorySliceState = {
  logs: [],
  users: {},
};

export const logHistorySlice = createSlice({
  name: 'logHistory',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<{ text: string; user: string }>) => {
      const { text, user } = action.payload;
      const date = new Date().toLocaleString();
      state.logs = [{ text, user, date }, ...state.logs];
    },
    addUsers: (
      state,
      action: PayloadAction<{ user: { [id: string]: string } }>
    ) => {
      const { user } = action.payload;
      state.users = { ...state.users, ...user };
    },
  },
});

export const logHistoryActions = logHistorySlice.actions;
