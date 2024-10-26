'use client';

import { ChartBarIcon, HomeIcon } from '@heroicons/react/24/outline';
import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
      icon: <HomeIcon className="w-4 h-4" />,
    },
    {
      link: 'http://localhost:8081/charts/monthly',
      label: 'Monthly Chart',
      icon: <ChartBarIcon className="w-4 h-4" />,
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
        {navInfo.map((e, i) => {
          return (
            <NavLink
              key={i}
              href={e.link}
              label={e.label}
              leftSection={e.icon}
            />
          );
        })}
        <div className="mx-auto">
          <Logout />
        </div>
      </AppShell.Navbar>
      <AppShell.Main>
        <div className="flex flex-col min-h-screen">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
