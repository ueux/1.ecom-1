import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import favoritesReducer from "../redux/features/favorites/favoriteSlice";
import authReducer from './features/auth/authSlice'
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: initialFavorites,
  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true,
});
setupListeners(store.dispatch);

export default store