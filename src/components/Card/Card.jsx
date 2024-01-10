import { View, Text, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import stockImage from "../../assets/movie-stock-image.png"

import styles from "./card.style"

const Card = ({ movie }) => {
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate("MovieDetails", {
      screen: "MovieDetailsScreen",
      params: { movieId: movie.imdbID },
    })
  }

  const posterSource =
    movie.Poster !== "N/A" ? { uri: movie.Poster } : stockImage

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <Image source={posterSource} style={styles.poster} resizeMode="cover" />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Card
