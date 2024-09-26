import '@mantine/core/styles.css';
import { AppShell, Container, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './Router';
import { theme } from './theme';
import { Menu } from './components/Menu';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
