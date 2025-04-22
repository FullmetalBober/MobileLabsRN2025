import { Stack, Link } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { useEffect } from 'react';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import Stats from '~/components/Stats';

const APP_DATA_DIR = FileSystem.documentDirectory + 'AppData/';

export default function Home() {
  useEffect(() => {
    (async () => {
      const dirInfo = await FileSystem.getInfoAsync(APP_DATA_DIR);
      if (!dirInfo.exists) {
        console.log('AppData directory not found. Creating...');
        await FileSystem.makeDirectoryAsync(APP_DATA_DIR, { intermediates: true });
        console.log('AppData directory created.');
      } else {
        console.log('AppData directory exists.');
      }
    })();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Stats />
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <Button title="Show Directory" />
        </Link>
      </Container>
    </>
  );
}
