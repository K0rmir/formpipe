import React, { useEffect } from 'react';
import { Button, Card, Group, Image, Title } from '@mantine/core';
import { useUsersContext } from '../context/UsersContext';

export function UsersGrid() {
  const { users, getUsers } = useUsersContext();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Group miw={600}>
        {users.map((user, index) => (
          <Card radius={'md'} withBorder key={index} w={238}>
            <Card.Section>
              {/* We know where the images are, so we just grab the file based on the filename associated with the user */}
              <Image src={`/uploads/${user.avatar}`} alt={`Avatar for ${user.name}`} />
            </Card.Section>
            <Title my={'md'} order={4}>
              {user.name}
            </Title>
            <Button
              size={'xs'}
              fullWidth
              variant={'outline'}
              color={'grape'}
              component={'a'}
              href={`/users/view/${user.id}`}
            >
              View
            </Button>
          </Card>
        ))}
      </Group>
    </>
  );
}
