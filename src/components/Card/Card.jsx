import { View, Text, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

import styles from "./card.style"

const Card = ({ movie }) => {
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate("MovieDetails", {
      screen: "MovieDetails",
      params: { movieId: movie.imdbID },
    })
  }

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Card
