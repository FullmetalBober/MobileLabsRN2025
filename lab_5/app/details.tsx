import { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Folder } from '~/components/Folder';

const ROOT_DIR = FileSystem.documentDirectory + 'AppData/';

export default function FileBrowser() {
  const [currentPath, setCurrentPath] = useState(ROOT_DIR);
  const [items, setItems] = useState<string[]>([]);
  const [folderName, setFolderName] = useState('');

  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath]);

  const loadDirectory = async (path: string) => {
    const contents = await FileSystem.readDirectoryAsync(path);
    setItems(contents);
  };

  const createFolder = async () => {
    const newPath = currentPath + folderName;
    await FileSystem.makeDirectoryAsync(newPath, { intermediates: true });
    loadDirectory(currentPath);
    setFolderName('');
  };

  return (
    <View className="m-3 flex-1 gap-3">
      <Text className="text-lg font-bold">
        {currentPath.replace(FileSystem.documentDirectory!, '')}
      </Text>

      <TextInput
        value={folderName}
        onChangeText={setFolderName}
        className="border border-gray-400"
      />
      <Button title="Create" onPress={createFolder} disabled={!folderName} />

      <FlatList
        data={items}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Folder name={item} />}
      />
    </View>
  );
}
