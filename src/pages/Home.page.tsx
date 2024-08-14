import { Image, Title } from '@mantine/core';

export function HomePage() {
  return (
    <>
      <Title order={1}>UserSphere Dashboard</Title>
      <p>Hi Caitlin! Welcome to the UserSphere platform prototype.</p>
      <p>Visit the Users Page in the top right to get started managing your users.</p>
      <Image w={200} src="uploads/caitlin.png" alt="Alice" radius={'md'} />
    </>
  );
}
