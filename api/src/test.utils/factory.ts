import { fakerJA as faker } from '@faker-js/faker';
import { defineUserFactory } from 'src/__generated__/fabbrica';

export const UserModelFactory = defineUserFactory({
  defaultData: () => ({
    email: faker.internet.exampleEmail(),
  }),
});
