import { useState, useCallback } from "react"
import { View, FlatList } from "react-native"
import Card from "../../components/Card/Card"
import { fetchFavoriteMovies } from "../../services/api"
import { useFocusEffect } from "@react-navigation/native"

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
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.imdbID}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Card movie={item} />}
        contentContainerStyle={{
          padding: 5,
        }}
      />
    </View>
  )
}

export default Favorites
