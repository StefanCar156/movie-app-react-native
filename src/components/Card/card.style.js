import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    maxWidth: width * 0.5 - 15,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 5,
  },
  detailsContainer: {
    marginLeft: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  year: {
    fontSize: 14,
  },
})

export default styles
