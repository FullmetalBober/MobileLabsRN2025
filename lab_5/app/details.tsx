import { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Folder } from '~/components/Folder';
import { File } from '~/components/File';
import { formatBytes } from '~/utils';

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

  const createItem = async () => {
    const newPath = currentPath + folderName;
    if (folderName.includes('.txt')) await FileSystem.writeAsStringAsync(newPath, '');
    else await FileSystem.makeDirectoryAsync(newPath, { intermediates: true });
    loadDirectory(currentPath);
    setFolderName('');
  };

  const goToFolder = (folderName: string) => {
    setCurrentPath((prev) => prev + folderName + '/');
  };

  const goBack = () => {
    if (currentPath === ROOT_DIR) return;

    setCurrentPath((prev) => prev.split('/').slice(0, -2).join('/') + '/');
  };

  const deleteItem = async (folderName: string) => {
    const path = currentPath + folderName;
    await FileSystem.deleteAsync(path, { idempotent: true });
    loadDirectory(currentPath);
  };

  const getFileInfo = async (fileName: string) => {
    const path = currentPath + fileName;
    const info = await FileSystem.getInfoAsync(path, {
      size: true,
    });

    if (!info.exists) throw new Error('File does not exist');
    return {
      fileSize: formatBytes(info.size),
      lastModified: new Date(info.modificationTime).toLocaleString(),
    };
  };

  const getFileContent = async (fileName: string) => {
    const path = currentPath + fileName;
    const content = await FileSystem.readAsStringAsync(path);

    return content;
  };

  const updateFile = async (fileName: string, content: string) => {
    const path = currentPath + fileName;
    await FileSystem.writeAsStringAsync(path, content);
  };

  const confirmDelete = (name: string) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteItem(name),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="m-3 flex-1 gap-3">
      <Text className="text-lg font-bold">
        {currentPath.replace(FileSystem.documentDirectory!, '')}
      </Text>

      {currentPath !== ROOT_DIR && (
        <TouchableOpacity onPress={goBack}>
          <Text className="text-lg text-blue-500">Go Back</Text>
        </TouchableOpacity>
      )}

      <TextInput
        value={folderName}
        onChangeText={setFolderName}
        className="border border-gray-400"
      />
      <Button title="Create" onPress={createItem} disabled={!folderName} />

      <FlatList
        data={items}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <>
            {!item.includes('.txt') ? (
              <Folder name={item} onPress={goToFolder} onDelete={confirmDelete} />
            ) : (
              <File
                name={item}
                getFileContent={getFileContent}
                getFileInfo={getFileInfo}
                onUpdate={updateFile}
                onDelete={confirmDelete}
              />
            )}
          </>
        )}
      />
    </View>
  );
}
