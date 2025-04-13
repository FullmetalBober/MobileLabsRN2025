import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Task({
  name,
  description,
  date,
  messageId,
  onDeleteTask,
}: {
  name: string;
  description: string;
  date: Date;
  messageId: string;
  onDeleteTask: (messageId: string) => void;
}) {
  return (
    <View className="mb-2 flex-row items-center rounded-lg bg-white p-3">
      <View className="flex-1">
        <Text className="text-lg font-bold">{name}</Text>
        <Text>{description}</Text>
        <Text>{date.toLocaleString()}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            onDeleteTask(messageId);
          }}
          className="rounded-lg bg-red-500 p-2">
          {/* <Text className="text-white">Delete</Text> */}
          <Image source={require('~/assets/trash.png')} className="h-8 w-8" resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
