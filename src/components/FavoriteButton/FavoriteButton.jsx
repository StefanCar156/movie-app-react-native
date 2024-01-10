import React, { useState, useEffect } from "react"
import { TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import {
  addFavoriteMovieId,
  removeFavoriteMovieId,
  isMovieInFavorites,
} from "../../services/api"
import { useRoute } from "@react-navigation/native"

const FavoriteButton = () => {
  const route = useRoute()

  const { movieId } = route.params

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const getIsMovieInFavorites = async () => {
      let res = await isMovieInFavorites(movieId)

      setIsFavorite(res)
    }

    getIsMovieInFavorites()
  }, [movieId])

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteMovieId(movieId)
      setIsFavorite(false)
    } else {
      addFavoriteMovieId(movieId)
      setIsFavorite(true)
    }
  }

  return (
    <TouchableOpacity
      onPress={handleToggleFavorite}
      style={{ marginRight: 16 }}
    >
      <Icon
        name={isFavorite ? "favorite" : "favorite-border"}
        size={24}
        color="#f00"
      />
    </TouchableOpacity>
  )
}

export default FavoriteButton
