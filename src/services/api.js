import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_KEY } from "@env"

const BASE_URL = "http://www.omdbapi.com/"

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
})

export const fetchRecommendedMovies = async (page) => {
  try {
    const response = await api.get("/", {
      params: {
        s: "Avengers",
        // Due to api's limits, "s" parameter had to be set to some value.
        // Otherwise, there is too much results, and api wont return it
        type: "movie",
        r: "json",
        plot: "short",
        page: page,
      },
    })

    const recentMovies = response.data.Search || []
    return recentMovies
  } catch (error) {
    console.error("Error fetching recent movies:", error)
    throw error
  }
}

export const fetchMoviesBySearch = async (searchCriteria) => {
  try {
    const response = await api.get("/", {
      params: {
        s: searchCriteria.query,
        type: "movie",
        y: searchCriteria.year || "",
        genre: searchCriteria.genre || "",
        page: searchCriteria.page || "",
      },
    })

    return response.data.Search || []
  } catch (error) {
    console.error("Error fetching movies:", error)
    throw error
  }
}

export const fetchMovieById = async (id) => {
  try {
    const response = await api.get("/", {
      params: {
        i: id,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching movie by ID:", error)
    throw error
  }
}

export const fetchFavoriteMovieIds = async () => {
  try {
    const favoriteIdsString = await AsyncStorage.getItem("favoriteMovieIds")
    if (favoriteIdsString) {
      const favoriteIds = JSON.parse(favoriteIdsString)
      return favoriteIds
    }
    return []
  } catch (error) {
    console.error("Error fetching favorite movie IDs:", error)
    throw error
  }
}

export const addFavoriteMovieId = async (movieId) => {
  try {
    const currentFavoriteIdsString = await AsyncStorage.getItem(
      "favoriteMovieIds"
    )
    const currentFavoriteIds = currentFavoriteIdsString
      ? JSON.parse(currentFavoriteIdsString)
      : []
    const newFavoriteIds = [...currentFavoriteIds, movieId]
    await AsyncStorage.setItem(
      "favoriteMovieIds",
      JSON.stringify(newFavoriteIds)
    )
  } catch (error) {
    console.error("Error adding movie ID to favorites:", error)
    throw error
  }
}

export const removeFavoriteMovieId = async (movieId) => {
  try {
    const currentFavoriteIdsString = await AsyncStorage.getItem(
      "favoriteMovieIds"
    )
    const currentFavoriteIds = currentFavoriteIdsString
      ? JSON.parse(currentFavoriteIdsString)
      : []
    const newFavoriteIds = currentFavoriteIds.filter((id) => id !== movieId)
    await AsyncStorage.setItem(
      "favoriteMovieIds",
      JSON.stringify(newFavoriteIds)
    )
  } catch (error) {
    console.error("Error removing movie ID from favorites:", error)
    throw error
  }
}

export const fetchFavoriteMovies = async () => {
  try {
    const favoriteIds = await fetchFavoriteMovieIds()
    const favoriteMovies = await Promise.all(
      favoriteIds.map((id) => fetchMovieById(id))
    )
    return favoriteMovies
  } catch (error) {
    console.error("Error fetching favorite movies:", error)
    throw error
  }
}

export const isMovieInFavorites = async (movieId) => {
  try {
    const favoriteIdsString = await AsyncStorage.getItem("favoriteMovieIds")
    if (favoriteIdsString) {
      const favoriteIds = JSON.parse(favoriteIdsString)
      return favoriteIds.includes(movieId)
    }
    return false
  } catch (error) {
    console.error("Error checking if movie is in favorites:", error)
    throw error
  }
}
