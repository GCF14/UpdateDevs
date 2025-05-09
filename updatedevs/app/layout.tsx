
import { Stack } from 'expo-router';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

export default function Layout() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Stack />
    </ApplicationProvider>
  );
}
