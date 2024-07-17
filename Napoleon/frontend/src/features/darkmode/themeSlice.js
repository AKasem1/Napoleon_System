import { createSlice } from '@reduxjs/toolkit';

const themes = {
  dark: 'dark',
  light: 'light',
};

const initialState = {
  isDark: JSON.parse(localStorage.getItem('isDark')) || false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem('isDark', JSON.stringify(state.isDark));
      document.body.className = state.isDark ? themes.dark : themes.light;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
