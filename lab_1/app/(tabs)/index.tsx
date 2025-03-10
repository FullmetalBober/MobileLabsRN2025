import { FlatList, Image, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const dataObj = {
  title: 'Заголовок новини',
  text: 'Короткий текст новини',
  image: require('@/assets/images/react-logo.png'),
  date: new Date(),
};

const data = new Array(20).fill(dataObj);

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={data}
        ListHeaderComponent={() => (
          <ThemedView style={styles.titleContainer}>
            <ThemedText type='title'>Новини</ThemedText>
          </ThemedView>
        )}
        renderItem={({ item }) => (
          <ThemedView style={styles.itemContainer}>
            <Image source={item.image} style={styles.img} />
            <ThemedView>
              <ThemedText type='defaultSemiBold'>{item.title}</ThemedText>
              <ThemedText>{item.date.toLocaleDateString()}</ThemedText>
              <ThemedText>{item.text}</ThemedText>
            </ThemedView>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
  },
  stepContainer: {
    gap: 8,
  },
  img: {
    height: 100,
    width: 100,
  },
  itemContainer: {
    margin: 5,
    flexDirection: 'row',
    gap: 8,
  },
});
