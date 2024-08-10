import React, { useEffect, useState } from 'react';
import { Image, Table, NavLink, Group, Text, Button, Anchor } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import { useUsersContext } from '../context/UsersContext';

export function UsersTable() {
  const { users, getUsers } = useUsersContext();
  const [active, setActive] = useState<number>();

  useEffect(() => {
    getUsers();
  }, []);

  const rows = users.map((user, index) => (
    <Table.Tr key={user.name}>
      <Table.Td>
        <NavLink
          label={user.name}
          active={index === active}
          color="grape"
          onClick={() => setActive(index)}
        >
          <Table.Td>
            <Group justify="center">
              <Text tt="capitalize">
                <Text component="span" fw={700}>
                  Gender:{' '}
                </Text>
                {user.gender}
              </Text>
              <Text tt="capitalize">
                <Text component="span" fw={700}>
                  Hair Colour:{' '}
                </Text>
                {user.hair}
              </Text>
              <Text tt="capitalize">
                <Text component="span" fw={700}>
                  Eye Colour:{' '}
                </Text>
                {user.eyes}
              </Text>
              <Text tt="capitalize">
                <Text component="span" fw={700}>
                  Glasses:{' '}
                </Text>
                {user ? (user.glasses ? 'Yes' : 'No') : 'Loading...'}
              </Text>
              <Image
                h={100}
                w={100}
                radius={'75%'}
                mr={75}
                src={`/uploads/${user.avatar}`}
                alt={`Avatar for ${user.name}`}
              />
              <Anchor href={`/users/view/${user.id}`} underline="never">
                <Button
                  variant="light"
                  color="grape"
                  size="lg"
                  radius="md"
                  rightSection={<IconEye size={20} />}
                >
                  View User
                </Button>
              </Anchor>
            </Group>
          </Table.Td>
        </NavLink>
      </Table.Td>
      <Table.Td>{user.roles}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table horizontalSpacing="xl" withTableBorder striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Role</Table.Th>
            {/* <Table.Th /> */}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
