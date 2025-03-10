import { StyleSheet, Image, FlatList } from 'react-native';

import { ThemedView } from '@/components/ThemedView';

const image = require('@/assets/images/react-logo.png');

const data = new Array(20).fill(image);

export default function PhotosScreen() {
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <ThemedView style={styles.itemContainer}>
            <Image source={item} />
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    maxWidth: '48%',
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 'auto',
    marginVertical: 5,
    // borderWidth: 1.5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});
