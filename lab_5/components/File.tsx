import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from 'react';

type ScreenContentProps = {
  name: string;
  getFileContent: (name: string) => Promise<string>;
  getFileInfo: (name: string) => Promise<{ fileSize: string; lastModified: string }>;
  onUpdate: (name: string, content: string) => void;
  onDelete: (name: string) => void;
};

export const File = ({
  name,
  getFileContent,
  getFileInfo,
  onUpdate,
  onDelete,
}: ScreenContentProps) => {
  const [inputOpen, setInputOpen] = useState(false);
  const [content, setContent] = useState('');
  const [fileInfo, setFileInfo] = useState<{ fileSize: string; lastModified: string }>();

  useEffect(() => {
    if (!inputOpen) {
      (async () => {
        const info = await getFileInfo(name);
        setFileInfo(info);
      })();
    }
    if (inputOpen && content === '') {
      (async () => {
        const fileContent = await getFileContent(name);
        console.log('fileContent');
        setContent(fileContent);
      })();
    }
  }, [inputOpen]);

  return (
    <View className="mb-1 border-b p-2">
      <TouchableOpacity onPress={() => setInputOpen(true)} className="flex-row justify-between">
        <View className="flex flex-row gap-2">
          <AntDesign name="file1" size={24} color="black" />
          <Text>{name}</Text>
          {fileInfo && (
            <View className="flex-row gap-2">
              <Text className="text-sm">{fileInfo.fileSize}</Text>
              <Text className="text-sm">{fileInfo.lastModified}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => onDelete(name)}>
          <Feather name="trash-2" size={24} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
      {inputOpen && (
        <View className="mt-2 flex-row items-center gap-2">
          <TextInput
            placeholder="Enter content"
            className="flex-1 border border-b-gray-400"
            value={content}
            onChangeText={setContent}
            onSubmitEditing={() => {
              onUpdate(name, content ?? '');
              setInputOpen(false);
            }}
          />
          <TouchableOpacity onPress={() => setInputOpen(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
