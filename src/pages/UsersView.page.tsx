import { useEffect } from 'react';
import {
  Title,
  Text,
  Group,
  Stack,
  Image,
  Paper,
  LoadingOverlay,
  Skeleton,
  Tooltip,
  Button,
} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import { useUsersContext } from '../context/UsersContext';

export function UsersView() {
  const { visible, individualUser, getUsers } = useUsersContext();
  const userId: string | undefined = useParams().id;

  useEffect(() => {
    if (userId) {
      getUsers(userId);
    }
  }, [userId]);

  const userRoles = individualUser?.roles.join(' & ') || 'Loading...';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper
        shadow="lg"
        withBorder
        p="xs"
        radius="lg"
        style={{
          width: '50%',
        }}
        pos={'relative'}
      >
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        <Group justify="center" gap={'xl'}>
          <Stack h={300} align="flex-start" justify="center" gap={'md'}>
            <Title order={1}>{individualUser ? individualUser.name : 'Loading...'}</Title>
            <Text tt="capitalize">
              <Text component="span" fw={700}>
                Gender:{' '}
              </Text>
              {individualUser ? individualUser.gender : 'Loading...'}
            </Text>
            <Text tt="capitalize">
              <Text component="span" fw={700}>
                Hair Colour:{' '}
              </Text>
              {individualUser ? individualUser.hair : 'Loading...'}
            </Text>
            <Text tt="capitalize">
              <Text component="span" fw={700}>
                Eye Colour:{' '}
              </Text>
              {individualUser ? individualUser.eyes : 'Loading...'}
            </Text>
            <Text tt="capitalize">
              <Text component="span" fw={700}>
                Glasses:{' '}
              </Text>
              {individualUser ? (individualUser.glasses ? 'Yes' : 'No') : 'Loading...'}
            </Text>
            <Text tt="capitalize">
              <Text component="span" fw={700}>
                Roles:{' '}
              </Text>
              {userRoles}
            </Text>
          </Stack>
          {individualUser ? (
            <Image
              src={`/uploads/${individualUser?.avatar}`}
              alt={`Avatar for ${individualUser?.name}`}
              radius={'lg'}
            />
          ) : (
            <Skeleton height={275} width={205} />
          )}
          <Tooltip label="Currently Unavailable">
            <Button
              variant="light"
              color="grape"
              size="md"
              radius="md"
              rightSection={<IconEdit size={20} />}
              component="a"
              disabled
            >
              Edit User
            </Button>
          </Tooltip>
        </Group>
      </Paper>
    </div>
  );
}
