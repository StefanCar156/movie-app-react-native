import React, { useState, useEffect } from "react"
import { View, FlatList, ActivityIndicator } from "react-native"
import { fetchRecommendedMovies } from "../../services/api"
import Card from "../../components/Card/Card"

import styles from "./recommended.style"
import MovieList from "../../components/MovieList/MovieList"

const Recommended = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const loadMovies = async () => {
    try {
      setLoading(true)
      const newMovies = await fetchRecommendedMovies(page)
      setMovies([...movies, ...newMovies])
      setPage(page + 1)
    } catch (error) {
      console.error("Error loading more data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovies()
  }, [])

  const handleEndReached = () => {
    loadMovies()
  }

  return (
    <View style={{ flex: 1 }}>
      <MovieList data={movies} handleEndReached={handleEndReached} />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  )
}

export default Recommended
