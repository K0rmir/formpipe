import { Button, Group, Image } from '@mantine/core';
import { FC, ReactNode } from 'react';
import FormpipeLogo from '../assets/formpipe-logo.svg';

const MenuButton: FC<{ href: string; children: ReactNode }> = ({ href, children }) => (
  <Button color={'grape'} component={'a'} variant="subtle" href={href}>
    {children}
  </Button>
);

export const Menu = () => (
  <Group justify="space-between" px={'lg'}>
    <Image p="xs" h={70} src={FormpipeLogo} alt="Formpipe Logo" />
    <Group ml="xl" gap={'lg'}>
      <MenuButton href="/">Home</MenuButton>
      <MenuButton href="/users">Users</MenuButton>
    </Group>
  </Group>
);
