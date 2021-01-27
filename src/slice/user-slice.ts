import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type User = { [id: string]: string };

export type userSliceState = {
  selfUser: { id: string; name: string };
  users: User;
};

export const initialState: userSliceState = {
  selfUser: null,
  users: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (
      state,
      action: PayloadAction<{ name: string; peerId: string }>
    ) => {
      const { name, peerId } = action.payload;
      state.selfUser = { id: peerId, name };
    },
    getUser: (state, action: PayloadAction<{ users: User }>) => {
      const { users } = action.payload;
      state.users = users;
    },
  },
});

export const userActions = userSlice.actions;
