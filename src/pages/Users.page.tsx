import { Button, Group, Title } from '@mantine/core';
import { IconFilter, IconTable, IconLayout2, IconFilterOff } from '@tabler/icons-react';
import { UsersGrid } from '@/components/UsersGrid.tsx';
import { UsersTable } from '@/components/UsersTable.tsx';
import { UsersFilters } from '@/components/UsersFilters.tsx';
import { useUsersStore } from '../store/usersStore';

export function UsersPage() {
  const { users, isFiltersOpen, setIsFiltersOpen, usersTableView, setUsersTableView, visible } =
    useUsersStore();

  return (
    <>
      <Group>
        <Title order={1}>Users</Title>
        <Button
          my={'md'}
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          color="grape"
          rightSection={<IconFilter size={18} />}
        >
          {isFiltersOpen ? 'Hide filters' : 'Show Filters'}
        </Button>
        <Button
          my={'md'}
          onClick={() => setUsersTableView(!usersTableView)}
          color="grape"
          rightSection={usersTableView ? <IconLayout2 size={18} /> : <IconTable size={18} />}
        >
          {usersTableView ? 'Grid View' : 'Table View'}
        </Button>
      </Group>

      {isFiltersOpen && <UsersFilters />}
      {usersTableView ? (
        <UsersTable users={users} visible={visible} />
      ) : (
        <UsersGrid users={users} visible={visible} />
      )}
    </>
  );
}
