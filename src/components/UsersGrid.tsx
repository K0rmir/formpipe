import { Button, Card, Group, Image, Title, Text, LoadingOverlay } from '@mantine/core';
import { useUsersStore } from '../store/usersStore';
import { useUsers } from '@/users/useUsers';

export function UsersGrid() {
  // const users = useUsersStore((state) => state.users);
  const visible = useUsersStore((state) => state.visible); // visible state from Zustand

  const { data: users, isLoading, error } = useUsers();

  return (
    <>
      <Group miw={600} justify="flex-start" pos={'relative'}>
        {isLoading && <LoadingOverlay />}
        {/* <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} /> */}
        {users?.map((user, index) => (
          <Card radius={'md'} withBorder key={index} w={302} shadow="sm">
            <Card.Section>
              <Image src={`/uploads/${user.avatar}`} alt={`Avatar for ${user.name}`} />
            </Card.Section>
            <Title my={'md'} order={4}>
              {user.name}
            </Title>
            <Text fw={500}>{user.roles.join(' & ')}</Text>

            <Button
              size={'xs'}
              fullWidth
              variant={'outline'}
              color={'grape'}
              component={'a'}
              href={`/users/${user.id}`}
            >
              View
            </Button>
          </Card>
        ))}
      </Group>
    </>
  );
}
