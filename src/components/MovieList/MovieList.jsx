import { FlatList } from "react-native"
import Card from "../../components/Card/Card"

const MovieList = ({ data, handleEndReached }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.imdbID}
      numColumns={2}
      renderItem={({ item }) => <Card movie={item} />}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 5,
      }}
    />
  )
}

export default MovieList
