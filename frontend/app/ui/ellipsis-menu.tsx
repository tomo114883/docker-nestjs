'use client';

import {
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
  MinusIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Menu } from '@mantine/core';

export function EllipsisMenu() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <EllipsisVerticalIcon className="h-5 w-5" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>要因</Menu.Label>
        <Menu.Item leftSection={<PencilIcon className="h-4 w-4" />}>
          編集
        </Menu.Item>
        <Menu.Item leftSection={<DocumentDuplicateIcon className="h-4 w-4" />}>
          複製
        </Menu.Item>
        <Menu.Label>対処</Menu.Label>
        <Menu.Item leftSection={<TrashIcon className="h-4 w-4" />}>
          この要因を削除
        </Menu.Item>
        <Menu.Item leftSection={<MinusIcon className="h-4 w-4" />}>
          この重さを変更
        </Menu.Item>
        <Menu.Label>AI</Menu.Label>
        <Menu.Item
          leftSection={<TrashIcon className="h-4 w-4" />}
          component="a"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/cope`}
        >
          対処方法を探す
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
