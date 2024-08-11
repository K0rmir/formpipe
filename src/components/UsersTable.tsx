import React, { useEffect, useState } from 'react';
import { Image, Table, NavLink, Group, Text, Button, Anchor, Pagination } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import { useUsersContext } from '../context/UsersContext';

export function UsersTable() {
  const { users, getUsers } = useUsersContext(); // consume users from context
  const [active, setActive] = useState<number>(); // state for index of current active row expansion
  const [currentPage, setCurrentPage] = useState<number>(1); // active page for pagination, initialised at 1
  const itemsPerPage: number = 5; // change this to drop down with options to choose from max users as state

  useEffect(() => {
    getUsers();
  }, []);

  const lastUserIndex = currentPage * itemsPerPage;
  const firstUserIndex = lastUserIndex - itemsPerPage;
  const currentUsers = users.slice(firstUserIndex, lastUserIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Lines 16-22 > This implementation of pagination is fine for small datasets, however if working with a lot more data,
  // having the data paginated directly from the API would be better.
  // Values such as page num & users per page could be passed to api to fetch specific data

  const rows = currentUsers.map((user, index) => (
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
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Pagination
        total={Math.ceil(users.length / itemsPerPage)}
        value={currentPage}
        onChange={handlePageChange}
        color="grape"
      />
    </>
  );
}
