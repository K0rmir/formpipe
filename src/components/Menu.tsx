import { Button, Group, Image } from '@mantine/core';
import React, { FC, ReactNode } from 'react';
import FormpipeLogo from '../assets/formpipe-logo.svg';
import { IconHome, IconUsers } from '@tabler/icons-react';

const MenuButton: FC<{
  href: string;
  children: ReactNode;
  leftSection?: ReactNode;
  logo?: ReactNode;
}> = ({ href, children, leftSection, logo }) => (
  <Button color={'grape'} component={'a'} variant="subtle" href={href} leftSection={logo}>
    {children}
  </Button>
);

export const Menu = () => (
  <Group justify="space-between" px={'lg'}>
    <Image p="xs" h={70} src={FormpipeLogo} alt="Formpipe Logo" />
    <Group ml="xl" gap={'lg'}>
      <MenuButton href="/" leftSection={<IconHome />}>
        Home
      </MenuButton>
      <MenuButton href="/users" leftSection={<IconUsers />}>
        Users
      </MenuButton>
    </Group>
  </Group>
);
