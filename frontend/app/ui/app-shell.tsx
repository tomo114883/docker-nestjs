'use client';

import { AppShell, Burger, Group, NavLink, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome2 } from '@tabler/icons-react';
import Logout from './logout-button';

export default function BasicAppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  const navInfo = [
    {
      link: 'http://localhost:8081',
      label: 'Home',
      icon: <IconHome2 size="1rem" stroke={1.5} />,
    },
    {
      link: 'http://localhost:8081/charts/monthly',
      label: 'Monthly Chart',
      icon: <IconHome2 size="1rem" stroke={1.5} />,
    },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {navInfo.map((e, index) => {
          return (
            <NavLink
              key={index}
              href={e.link}
              label={e.label}
              leftSection={e.icon}
            />
          );
        })}
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={70} mt="sm" radius={15} animate={false} />
          ))}
        <Logout />
      </AppShell.Navbar>
      <AppShell.Main>
        <div className="flex flex-col min-h-screen">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
