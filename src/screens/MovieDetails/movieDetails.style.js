import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
  },
  poster: {
    width: "100%",
    aspectRatio: 9 / 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  genre: {
    fontSize: 16,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  year: {
    fontSize: 16,
    marginBottom: 8,
  },
  duration: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: "#444",
    lineHeight: 24,
  },
})

export default styles
