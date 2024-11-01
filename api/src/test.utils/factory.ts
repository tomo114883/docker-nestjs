import {
  defineMotivatorFactory,
  defineStressorFactory,
  defineUserFactory,
} from 'src/__generated__/fabbrica';
import { fakerJA as faker } from '@faker-js/faker';

// Define UserModelFactory to use in the test from defineUserFactory.
export const UserModelFactory = defineUserFactory({
  defaultData: () => ({
    email: faker.internet.exampleEmail(), // Using exampleEmail() is better than email().
    password: faker.internet.password(),
    name: faker.person.firstName(),
    createdAt: new Date(), // Add created date for reality.
    updatedAt: new Date(), // Add updated date for reality.
    deletedAt: null, // Represent a value is Null, not undefined.
  }),
});

export const MotivatorModelFactory = defineMotivatorFactory({
  defaultData: () => ({
    name: faker.word.noun(),
    weight: faker.number.int({ min: 1, max: 5 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    user: UserModelFactory, // This part of the column is mandatory because I defined so.
  }),
});

export const StressorModelFactory = defineStressorFactory({
  defaultData: () => ({
    name: faker.word.noun(),
    weight: faker.number.int({ min: 1, max: 5 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    user: UserModelFactory,
  }),
});
