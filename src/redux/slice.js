import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    serchFilter(state, action) {
      state.filter = action.payload;
    },

    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contacts => contacts.id !== action.payload
      );
    },
  },
});
const persistConfig = {
  key: 'root',
  storage,
};
export const persistedContactReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);
export const getContact = state => state.contacts.contacts;
export const getFilter = state => state.contacts.filter;
export const { addContact, serchFilter, deleteContact } = contactSlice.actions;
