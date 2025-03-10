import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type='title'>Реєстрація</ThemedText>
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedView style={styles.inputContainer}>
            <ThemedText>Електронна пошта</ThemedText>
            <TextInput inputMode='email' style={styles.input} />
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <ThemedText>Пароль</ThemedText>
            <TextInput secureTextEntry={true} style={styles.input} />
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <ThemedText>Пароль (ще раз)</ThemedText>
            <TextInput secureTextEntry={true} style={styles.input} />
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedView style={styles.inputContainer}>
            <ThemedText>Прізвище</ThemedText>
            <TextInput style={styles.input} />
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <ThemedText>Ім'я</ThemedText>
            <TextInput style={styles.input} />
          </ThemedView>
        </ThemedView>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <ThemedText style={styles.buttonText}>Зареєструватися</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputGroup: {
    gap: 5,
    marginVertical: 10,
  },
  titleContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    padding: 8,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
  },
  button: {
    padding: 10,
    borderRadius: 3,
    backgroundColor: 'blue',
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
