import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    marginRight: 8,
  },
  selectInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  resultContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  noResultsContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  noResults: {
    fontSize: 16,
    color: "#9f9f9f",
  },
})

export default styles
