import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { fetchMovieById } from "../../services/api"

import styles from "./movieDetails.style"

const MovieDetails = () => {
  const route = useRoute()
  const navigation = useNavigation()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [genresArray, setGenresArray] = useState([])

  useEffect(() => {
    const { movieId } = route.params

    const fetchDetails = async () => {
      try {
        const details = await fetchMovieById(movieId)
        setMovie(details)

        const genres = details.Genre.split(", ")
        setGenresArray(genres)
      } catch (error) {
        console.error("Error fetching movie details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [route.params])

  const handleGenrePress = (genre) => {
    navigation.navigate("SearchTab", {
      screen: "Search",
      params: { genre },
    })
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.Title}</Text>
        <View style={styles.genreContainer}>
          {genresArray.map((genre, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleGenrePress(genre)}
            >
              <Text style={styles.genre}>{genre}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.year}>{movie.Year}</Text>
        <Text style={styles.duration}>{movie.Runtime}</Text>
        <Text style={styles.description}>{movie.Plot}</Text>
      </View>
    </ScrollView>
  )
}

export default MovieDetails
