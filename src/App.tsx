import '@mantine/core/styles.css';
import { AppShell, Container, MantineProvider } from '@mantine/core';
import UsersProvider from '@/context/UsersContext';

import { Router } from './Router';
import { theme } from './theme';
import { Menu } from './components/Menu';

export default function App() {
  return (
    <UsersProvider>
      <MantineProvider theme={theme}>
        <Container size={'xl'}>
          <AppShell header={{ height: 70 }} padding="md">
            <AppShell.Header style={{ minWidth: 600 }}>
              <Menu />
            </AppShell.Header>
            <AppShell.Main>
              <Router />
            </AppShell.Main>
          </AppShell>
        </Container>
      </MantineProvider>
    </UsersProvider>
  );
}
