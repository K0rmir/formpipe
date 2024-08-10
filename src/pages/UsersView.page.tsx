import { useEffect, useState } from 'react';
import { Title, Text, Group, Stack, Image, Paper, LoadingOverlay, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { User, userRoles } from '@/lib/interfaces.ts';

export function UsersView() {
  const [userData, setUserData] = useState<User>();
  const [userRoles, setUserRoles] = useState<userRoles[]>([]);
  const [visible, { open, close }] = useDisclosure(false);

  const userId: string | undefined = useParams().id;

  useEffect(() => {
    open();
    fetch(`http://localhost:3000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        const roleDescriptions = data?.roles.map((role: string) => {
          switch (role) {
            case '1':
              return 'Standard User';
            case '2':
              return 'Adminstrator';
            case '3':
              return 'Super User';
            case '4':
              return 'Guest User';
          }
        });
        setUserRoles(roleDescriptions);
        close();
      });
  }, []);

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
            <Title order={1}>{userData ? userData.name : 'Loading...'}</Title>
            <Text tt="capitalize">
              <Text component="span" fw={700}>
                Gender:{' '}
              </Text>
              {userData ? userData.gender : 'Loading...'}
            </Text>
            <Text tt="capitalize">
              <Text component="span" fw={700}>
                Hair Colour:{' '}
              </Text>
              {userData ? userData.hair : 'Loading...'}
            </Text>
            <Text tt="capitalize">
              <Text component="span" fw={700}>
                Eye Colour:{' '}
              </Text>
              {userData ? userData.eyes : 'Loading...'}
            </Text>
            <Text tt="capitalize">
              <Text component="span" fw={700}>
                Glasses:{' '}
              </Text>
              {userData ? (userData.glasses ? 'Yes' : 'No') : 'Loading...'}
            </Text>
            <Text tt="capitalize">
              <Text component="span" fw={700}>
                Roles:{' '}
              </Text>
              {userRoles.length ? userRoles.join(' & ') : 'Loading...'}
            </Text>
          </Stack>
          {userData ? (
            <Image
              src={`/uploads/${userData?.avatar}`}
              alt={`Avatar for ${userData?.name}`}
              radius={'lg'}
            />
          ) : (
            <Skeleton height={275} width={205} />
          )}
        </Group>
      </Paper>
    </div>
  );
}
