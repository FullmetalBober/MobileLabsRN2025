import { FlatList, Text, View } from 'react-native';
import { useGesture } from '~/contexts/GestureContext';

export default function Home() {
  const {
    score,
    tapCount,
    doubleTapCount,
    isLongPressed,
    isDragged,
    isSwipedRight,
    isSwipedLeft,
    isSizeChanged,
  } = useGesture();

  const stats = [
    { label: `Зробити 10 кліків – ${tapCount}`, completed: tapCount >= 10 },
    { label: `Зробити подвійний клік 5 разів - ${doubleTapCount}`, completed: doubleTapCount >= 5 },
    { label: "Утримувати об'єкт 3 секунди", completed: isLongPressed },
    { label: "Перетягнути об'єкт", completed: isDragged },
    { label: 'Зробити свайп вправо', completed: isSwipedRight },
    { label: 'Зробити свайп вліво', completed: isSwipedLeft },
    { label: "Змінити розмір об'єкта", completed: isSizeChanged },
    { label: `Отримати 100 очок - ${score}`, completed: score >= 100 },
  ];

  return (
    <View>
      <FlatList
        data={stats}
        renderItem={({ item }) => (
          <Text className={item.completed ? 'line-through' : ''}>{item.label}</Text>
        )}
      />
    </View>
  );
}
