import { Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

type ScreenContentProps = {
  name: string;
};

export const Folder = ({ name }: ScreenContentProps) => {
  return (
    <TouchableOpacity
      onPress={() => console.log(name)}
      className="bg mb-1 flex-row justify-between border-b p-2">
      <View className="flex flex-row gap-2">
        <AntDesign name="folder1" size={24} color="black" />
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};
