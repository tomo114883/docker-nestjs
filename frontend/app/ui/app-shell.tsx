'use client';

import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  RectangleGroupIcon,
} from '@heroicons/react/24/outline';
import { AppShell, Burger, Group, NavLink, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSword } from '@tabler/icons-react';
import { Logout } from './logout-button';

export function BasicAppShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  const navInfo = [
    {
      link: `${process.env.NEXT_PUBLIC_DOMAIN}`,
      label: 'Home',
      icon: <HomeIcon className="w-6 h-6" />,
    },
    {
      link: `${process.env.NEXT_PUBLIC_DOMAIN}/charts/monthly`,
      label: 'Monthly Chart',
      icon: <ChartBarIcon className="w-6 h-6" />,
    },
    {
      link: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard`,
      label: 'Dashboard',
      icon: <ClipboardDocumentListIcon className="w-6 h-6" />,
    },
    {
      link: `${process.env.NEXT_PUBLIC_DOMAIN}/cope`,
      label: 'Cope with AI',
      icon: <IconSword className="w-6 h-6" />,
    },
    {
      link: `${process.env.NEXT_PUBLIC_DOMAIN}/templates`,
      label: 'Template',
      icon: <RectangleGroupIcon className="w-6 h-6" />,
    },
    {
      link: `${process.env.NEXT_PUBLIC_DOMAIN}/auth`,
      label: 'LogIn',
      icon: <ArrowRightEndOnRectangleIcon className="w-6 h-6" />,
    },
    {
      link: `${process.env.NEXT_PUBLIC_DOMAIN}/templates`,
      label: 'LogOut',
      icon: <ArrowRightStartOnRectangleIcon className="w-6 h-6" />,
    },
  ];

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section grow my="md" component={ScrollArea}>
          <div className="h-10"></div>
          {navInfo.map((nav, i) => {
            return (
              <NavLink
                h={60}
                key={i}
                href={nav.link}
                label={<span className="text-lg">{nav.label}</span>}
                leftSection={nav.icon}
              />
            );
          })}
        </AppShell.Section>
        <AppShell.Section>
          <div className="mx-auto mb-5">
            <Logout />
          </div>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <div className="flex flex-col grow bg-gray-100">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
