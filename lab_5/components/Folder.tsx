import { Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

type ScreenContentProps = {
  name: string;
  onPress: (name: string) => void;
};

export const Folder = ({ name, onPress }: ScreenContentProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(name)}
      className="bg mb-1 flex-row justify-between border-b p-2">
      <View className="flex flex-row gap-2">
        <AntDesign name="folder1" size={24} color="black" />
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};
