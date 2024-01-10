import React, { useState, useEffect, useCallback, useRef } from "react"
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
import styles from "./search.style"
import { useRoute, useFocusEffect } from "@react-navigation/native"
import MovieList from "../../components/MovieList/MovieList"

const Search = () => {
  const route = useRoute()
  const inputRef = useRef(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [searchYear, setSearchYear] = useState("")
  const [initialSearchGenre, setInitialSearchGenre] = useState("")
  const [searchGenre, setSearchGenre] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [stopFetching, setStopFetching] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (route.params && route.params.genre) {
      setInitialSearchGenre(route.params.genre)
      setSearchGenre(route.params.genre)
    }
  }, [route.params])

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

  const handleSearch = async (method) => {
    let searchPage = method === "submit" ? 1 : page

    try {
      setLoading(true)

      const searchCriteria = {
        query: searchQuery || "Avengers", // Fallback value has to be set due to API's limitations
        year: searchYear,
        genre: searchGenre,
        page: searchPage,
      }

      const response = await fetchMoviesBySearch(searchCriteria)

      if (response.length === 0) {
        if (method === "submit") {
          setSearchResults([])
        } else {
          setStopFetching(true)
        }
        return
      }

      if (method === "submit") {
        setSearchResults([...response])
      } else {
        setSearchResults([...searchResults, ...response])
      }

      setPage(searchPage + 1)
    } catch (error) {
      console.error("Error searching movies:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = () => {
    inputRef.current.blur()
    setSearched(true)
    setStopFetching(false)
    handleSearch("submit")
  }

  const handleEndReached = () => {
    if (!stopFetching) handleSearch("scroll")
  }

  useEffect(() => {
    if (initialSearchGenre) handleSearch("submit")
  }, [initialSearchGenre])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a movie..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        ref={inputRef}
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
        <MovieList data={searchResults} handleEndReached={handleEndReached} />
      )}
      {searched && searchResults.length === 0 && !loading && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResults}>No results found</Text>
        </View>
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
