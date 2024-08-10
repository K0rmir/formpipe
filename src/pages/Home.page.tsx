import { Image, Title } from '@mantine/core';

export function HomePage() {
  return (
    <>
      <Title order={1}>User Management App</Title>
      <p>View the README to learn more</p>
      <Image w={200} src="uploads/caitlin.png" alt="Alice" radius={'md'} />
    </>
  );
}
