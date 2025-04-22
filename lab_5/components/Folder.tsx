import { Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

type ScreenContentProps = {
  name: string;
  onPress: (name: string) => void;
  onDelete: (name: string) => void;
};

export const Folder = ({ name, onPress, onDelete }: ScreenContentProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(name)}
      className="bg mb-1 flex-row justify-between border-b p-2">
      <View className="flex flex-row gap-2">
        <AntDesign name="folder1" size={24} color="black" />
        <Text>{name}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(name)}>
        <Feather name="trash-2" size={24} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
