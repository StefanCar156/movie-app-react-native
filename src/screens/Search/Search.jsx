import React, { useState, useEffect, useCallback } from "react"
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native"
import { fetchMoviesBySearch } from "../../services/api"
import { Picker } from "@react-native-picker/picker"
import Card from "../../components/Card/Card"
import styles from "./search.style"
import { useRoute, useFocusEffect } from "@react-navigation/native"

const Search = () => {
  const route = useRoute()

  const [searchQuery, setSearchQuery] = useState("")
  const [searchYear, setSearchYear] = useState("")
  const [initialSearchGenre, setInitialSearchGenre] = useState("")
  const [searchGenre, setSearchGenre] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [stopFetching, setStopFetching] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setSearchResults([])
      setSearchQuery("")
      setSearchYear("")
      setSearchGenre("")

      if (route.params && route.params.genre) {
        setInitialSearchGenre(route.params.genre)
        setSearchGenre(route.params.genre)
      }
    }, [route.params])
  )

  useFocusEffect(
    useCallback(() => {
      setPage(1)
    }, [route.params])
  )

  const years = Array.from({ length: 100 }, (_, index) =>
    (new Date().getFullYear() - index).toString()
  )

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Musical",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ]

  const handleSearch = async () => {
    try {
      setLoading(true)

      const searchCriteria = {
        query: searchQuery || "Avengers", // Fallback value has to be set due to API's limitations
        year: searchYear,
        genre: searchGenre,
        page: page + 1,
      }

      const response = await fetchMoviesBySearch(searchCriteria)

      if (response.length === 0) setStopFetching(true)

      setSearchResults((prevResults) => [...prevResults, ...response])
      setPage(page + 1)
    } catch (error) {
      console.error("Error searching movies:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = () => {
    setSearchResults([])
    setStopFetching(false)
    handleSearch()
  }

  const handleEndReached = () => {
    if (!stopFetching) handleSearch()
  }

  useEffect(() => {
    if (initialSearchGenre) handleSearch()
  }, [initialSearchGenre])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a movie..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <View style={styles.selectContainer}>
        <Text style={styles.label}>Year:</Text>
        <Picker
          style={styles.selectInput}
          selectedValue={searchYear}
          onValueChange={(itemValue) => setSearchYear(itemValue)}
        >
          <Picker.Item label="Select Year" value="" color="gray" />
          {years.map((year) => (
            <Picker.Item key={year} label={year} value={year} color="gray" />
          ))}
        </Picker>
      </View>
      <View style={styles.selectContainer}>
        <Text style={styles.label}>Genre:</Text>
        <Picker
          style={styles.selectInput}
          selectedValue={searchGenre}
          onValueChange={(itemValue) => setSearchGenre(itemValue)}
        >
          <Picker.Item label="Select Genre" value="" color="gray" />
          {genres.map((genre) => (
            <Picker.Item key={genre} label={genre} value={genre} color="gray" />
          ))}
        </Picker>
      </View>
      <Button title="Search" onPress={handleSubmit} />

      {searchResults.length > 0 && (
        <FlatList
          style={styles.list}
          data={searchResults}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => <Card movie={item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
        />
      )}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  )
}

export default Search
