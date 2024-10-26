'use client';

import { Radio } from '@mantine/core';
import { Button, Group, TextInput } from '@mantine/core';
import { Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

export default function CreateModal() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      weight: 1,
      variable: true,
    },

    validate: {
      name: (value) => (value ? null : '名前を入力してください'),
      weight: (value) =>
        value >= 1 && value <= 5 ? null : '重みは1から5の間で入力してください',
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="要因の新規作成">
        {
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              withAsterisk
              label="名前"
              placeholder="名前"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <TextInput
              withAsterisk
              label="重み"
              placeholder="重み"
              key={form.key('weight')}
              {...form.getInputProps('weight')}
            />

            <Radio.Group name="variable" label="自分の意志で変更可能か">
              <Group mt="xs">
                <Radio value="true" label="変数" />
                <Radio value="false" label="定数" />
              </Group>
            </Radio.Group>

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        }
      </Modal>

      <Button className="mr-auto px-4" onClick={open}>
        新規作成
      </Button>
    </>
  );
}
