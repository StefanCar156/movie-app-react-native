import React from "react"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/FontAwesome"

const HamburgerButton = () => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Icon name="bars" size={30} color="#000" />
    </TouchableOpacity>
  )
}

export default HamburgerButton
