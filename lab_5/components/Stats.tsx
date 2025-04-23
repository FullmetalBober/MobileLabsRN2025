import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Text, View } from 'react-native';
import { formatBytes } from '~/utils';

export default function Stats() {
  const [total, setTotal] = useState<number>(0);
  const [free, setFree] = useState<number>(0);

  useEffect(() => {
    const fetchStorage = async () => {
      const totalCapacity = await FileSystem.getTotalDiskCapacityAsync();
      const freeSpace = await FileSystem.getFreeDiskStorageAsync();

      setTotal(totalCapacity);
      setFree(freeSpace);
    };

    fetchStorage();
  }, []);

  const used = total - free;

  const totalFormatted = formatBytes(total);
  const freeFormatted = formatBytes(free);
  const usedFormatted = formatBytes(used);

  return (
    <View>
      <Text className="text-lg">Storage Stats</Text>
      <Text className="text-lg">Total Storage: {totalFormatted}</Text>
      <Text className="text-lg">Free Storage: {freeFormatted}</Text>
      <Text className="text-lg">Used Storage: {usedFormatted}</Text>
    </View>
  );
}
