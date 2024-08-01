import { fakerJA as faker } from '@faker-js/faker';
import { defineUserFactory } from 'src/__generated__/fabbrica';
import { defineMotivationFactory } from 'src/__generated__/fabbrica';
import { defineStressFactory } from 'src/__generated__/fabbrica';

// Define UserModelFactory to use in the test from defineUserFactory.
export const UserModelFactory = defineUserFactory({
  defaultData: () => ({
    email: faker.internet.exampleEmail(), // Using exampleEmail() is better than email().
    name: faker.person.firstName(),
    createdAt: new Date(), // Add created date for reality.
    updatedAt: new Date(), // Add updated date for reality.
    deletedAt: null, // Represent a value is Null, not undefined.
  }),
});

// Same above
export const MotivationModelFactory = defineMotivationFactory({
  defaultData: () => ({
    name: faker.word.noun(),
    weight: faker.number.int({ min: 1, max: 5 }),
    userId: faker.number.int(), // Assuming you have user IDs to associate with
    typeId: faker.number.int(),
    createdAt: new Date(), // Same above
    updatedAt: new Date(), // Same above
    deletedAt: null, // Same above
    user: UserModelFactory, // This part of the column is mandatory because I defined so.
  }),
});

export const StressModelFactory = defineStressFactory({
  defaultData: () => ({
    name: faker.word.noun(),
    weight: faker.number.int({ min: 1, max: 5 }),
    userId: faker.number.int(), // Assuming you have user IDs to associate with
    typeId: faker.number.int(),
    createdAt: new Date(), // Same above
    updatedAt: new Date(), // Same above
    deletedAt: null, // Same above
    user: UserModelFactory, // Same above
  }),
});
