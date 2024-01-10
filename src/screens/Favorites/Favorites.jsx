import { useState, useCallback } from "react"
import { View, FlatList } from "react-native"
import Card from "../../components/Card/Card"
import { fetchFavoriteMovies } from "../../services/api"
import { useFocusEffect } from "@react-navigation/native"
import MovieList from "../../components/MovieList/MovieList"

const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useFocusEffect(
    useCallback(() => {
      const fetchFavorites = async () => {
        try {
          const favoriteMoviesData = await fetchFavoriteMovies()
          setFavorites(favoriteMoviesData)
        } catch (error) {
          console.error("Error fetching favorites:", error)
        }
      }

      fetchFavorites()
    }, [])
  )

  return (
    <View>
      <MovieList data={favorites} />
    </View>
  )
}

export default Favorites
