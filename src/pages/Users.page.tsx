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
/**
 * The UsersPage contacts the mock web server to fetch the list of users and displays them in a grid.
 */
export function UsersPage() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Title order={1}>Users</Title>

      <Button my={'md'} onClick={toggle} color="grape">
        {opened ? 'Hide filters' : 'Show Filters'}
      </Button>

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

      <UsersTable />
      {/* <UsersGrid /> */}
    </>
  );
}
