import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/User';

const loadUsersFromLocalStorage = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const saveUsersToLocalStorage = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: loadUsersFromLocalStorage() },
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      saveUsersToLocalStorage(state.users);
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      saveUsersToLocalStorage(state.users);
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        saveUsersToLocalStorage(state.users);
      }
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
      saveUsersToLocalStorage(state.users);
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
