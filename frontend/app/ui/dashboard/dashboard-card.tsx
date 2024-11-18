'use client';

import { DashboardCardProps } from '@/app/lib/definitions';
import { Card } from '@mantine/core';

export const DashboardCard = ({ title, value }: DashboardCardProps) => (
  <>
    <Card shadow="sm" padding="xs" radius="md" withBorder>
      <Card.Section>
        <h3>{title}</h3>
      </Card.Section>
      <h3>{value}</h3>
    </Card>
  </>
);
