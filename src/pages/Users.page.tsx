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
import { UsersGrid } from '@/components/UsersGrid.tsx';
import { UsersTable } from '@/components/UsersTable.tsx';
import { IconFilter, IconTable, IconLayout2 } from '@tabler/icons-react';
import { useUsersContext } from '../context/UsersContext';

export function UsersPage() {
  const { usersTableView, setUsersTableView } = useUsersContext();
  const [opened, { toggle }] = useDisclosure(false);

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
              <TextInput label="Name" placeholder="Enter user's name to filter list" />
              <Select
                label="Hair Colour"
                placeholder="Pick value to filter list"
                data={['Black', 'Brown', 'Blonde', 'Red', 'Grey']}
              />
              <Select
                label="Eye Colour"
                placeholder="Pick value"
                data={['Brown', 'Blue', 'Green', 'Grey']}
              />
              <Select label="Gender" placeholder="Pick value" data={['Male', 'Female']} />
            </Group>

            <Radio.Group label="Glasses?" defaultValue="all">
              <Group>
                <Radio label="All" value="all" />
                <Radio label="Glasses" value="glasses" />
                <Radio label="No Glasses" value="no-glasses" />
              </Group>
            </Radio.Group>
          </Stack>
        </Paper>
      </Collapse>

      {usersTableView ? <UsersTable /> : <UsersGrid />}
    </>
  );
}
