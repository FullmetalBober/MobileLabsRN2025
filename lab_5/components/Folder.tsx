import { Alert, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

type ScreenContentProps = {
  name: string;
  onPress: (name: string) => void;
  onDelete: (name: string) => void;
};

export const Folder = ({ name, onPress, onDelete }: ScreenContentProps) => {
  const confirmDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(name),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(name)}
      className="bg mb-1 flex-row justify-between border-b p-2">
      <View className="flex flex-row gap-2">
        <AntDesign name="folder1" size={24} color="black" />
        <Text>{name}</Text>
      </View>
      <TouchableOpacity onPress={confirmDelete}>
        <Feather name="trash-2" size={24} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
