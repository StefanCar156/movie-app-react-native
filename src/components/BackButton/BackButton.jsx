import { TouchableOpacity, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const BackButton = () => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ marginLeft: 16 }}
    >
      <Icon name="arrow-left" size={20} color="gray" />
    </TouchableOpacity>
  )
}

export default BackButton
