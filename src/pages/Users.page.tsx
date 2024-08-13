import {
  Button,
  Collapse,
  Group,
  Paper,
  Radio,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconTable, IconLayout2, IconFilterOff } from '@tabler/icons-react';
// import { UserFilters } from '@/lib/interfaces.ts';
import { UsersGrid } from '@/components/UsersGrid.tsx';
import { UsersTable } from '@/components/UsersTable.tsx';
import { useUsersContext } from '../context/UsersContext';

export function UsersPage() {
  const { usersTableView, setUsersTableView, userFilters, setUserFilters, defaultFilters } =
    useUsersContext();
  const [opened, { toggle }] = useDisclosure(false);

  function handleFilterChange(name: string, value: string | null) {
    setUserFilters((previousFilters) => {
      const updatedFilters = {
        ...previousFilters,
        [name]: value,
      };

      if (name === 'glasses') {
        updatedFilters.glasses = value === 'glasses' ? true : value === 'no-glasses' ? false : null;
      }

      try {
        sessionStorage.setItem('userFilters', JSON.stringify(updatedFilters));
      } catch (error) {
        console.error('Could not save filters to Local Storage:', error);
      }
      return updatedFilters;
    });
  }

  function handleClearUserFilters() {
    setUserFilters(defaultFilters);
    sessionStorage.removeItem('userFilters');
  }

  return (
    <>
      <Group>
        <Title order={1}>Users</Title>
        <Button my={'md'} onClick={toggle} color="grape" rightSection={<IconFilter size={18} />}>
          {opened ? 'Hide filters' : 'Show Filters'}
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

      <Collapse in={opened}>
        <Paper shadow="sm" p={'lg'} mb="md" withBorder bg={'gray.1'} miw={600}>
          <Stack gap={10}>
            <Group grow wrap={'wrap'}>
              <TextInput
                label="Name"
                placeholder="Enter user's name to filter list"
                name="name"
                value={userFilters.name || undefined}
                onChange={(e) => handleFilterChange('name', e.currentTarget.value)}
              />
              <Select
                label="Hair Colour"
                placeholder="Pick value"
                data={['Black', 'Brown', 'Blonde', 'Red', 'Grey']}
                name="hair"
                value={userFilters.hair || undefined}
                onChange={(value) => handleFilterChange('hair', value)}
                checkIconPosition="left"
                clearable
              />
              <Select
                label="Eye Colour"
                placeholder="Pick value"
                data={['Brown', 'Blue', 'Green', 'Grey']}
                name="eyes"
                value={userFilters.eyes || undefined}
                onChange={(value) => handleFilterChange('eyes', value)}
                checkIconPosition="left"
                clearable
              />
              <Select
                label="Gender"
                placeholder="Pick value"
                data={['Male', 'Female']}
                name="gender"
                value={userFilters.gender || undefined}
                onChange={(value) => handleFilterChange('gender', value)}
                checkIconPosition="left"
                clearable
              />
              <Select
                label="Role"
                placeholder="Pick value"
                data={[
                  { value: '1', label: 'Standard User' },
                  { value: '2', label: 'Administrator' },
                  { value: '3', label: 'Super User' },
                  { value: '4', label: 'Guest User' },
                ]}
                name="roles"
                value={userFilters.roles || undefined}
                onChange={(value) => handleFilterChange('roles', value)}
                checkIconPosition="left"
                clearable
              />
            </Group>

            <Radio.Group
              label="Glasses?"
              defaultValue="all"
              name="glasses"
              value={
                userFilters.glasses === true
                  ? 'glasses'
                  : userFilters.glasses === false
                    ? 'no-glasses'
                    : 'all'
              }
              onChange={(value) => handleFilterChange('glasses', value)}
            >
              <Group>
                <Radio label="All" value="all" />
                <Radio label="Glasses" value="glasses" />
                <Radio label="No Glasses" value="no-glasses" />
                <Button
                  my={'md'}
                  onClick={handleClearUserFilters}
                  color="grape"
                  rightSection={<IconFilterOff size={18} />}
                  w={'150'}
                >
                  Clear Filters
                </Button>
              </Group>
            </Radio.Group>
          </Stack>
        </Paper>
      </Collapse>

      {usersTableView ? <UsersTable /> : <UsersGrid />}
    </>
  );
}
