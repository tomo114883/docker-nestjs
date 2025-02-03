import { Motivator, Stressor, User } from '@prisma/client';

const users: User[] = [
  {
    id: 1,
    name: 'user1',
    email: 'user1@example.com',
    password: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

const monthlyData = [
  { date: 'Nov 1', motiv: 1, stress: 2 },
  { date: 'Nov 2', motiv: 1 },
  { date: 'Nov 3', motiv: 1, stress: 2 },
  { date: 'Nov 4', motiv: 1, stress: 2 },
  { date: 'Nov 5' },
  { date: 'Nov 6' },
  { date: 'Nov 7', motiv: 3 },
  { date: 'Nov 8', motiv: 1, stress: 2 },
  { date: 'Nov 9' },
  { date: 'Nov 10', motiv: 1, stress: 2 },
  { date: 'Nov 11', motiv: 1, stress: 2 },
  { date: 'Nov 12', motiv: 2 },
  { date: 'Nov 13', motiv: 1, stress: 2 },
  { date: 'Nov 14' },
  { date: 'Nov 15' },
  { date: 'Nov 16' },
  { date: 'Nov 17', motiv: 3 },
  { date: 'Nov 18', motiv: 1, stress: 2 },
  { date: 'Nov 19', motiv: 1 },
  { date: 'Nov 20', motiv: 1, stress: 2 },
  { date: 'Nov 21', motiv: 1, stress: 2 },
  { date: 'Nov 22' },
  { date: 'Nov 23' },
  { date: 'Nov 24', motiv: 1, stress: 2 },
  { date: 'Nov 25', motiv: 2 },
  { date: 'Nov 26', motiv: 1, stress: 2 },
  { date: 'Nov 27', motiv: 3 },
  { date: 'Nov 28', motiv: 1, stress: 2 },
  { date: 'Nov 29', motiv: 1 },
  { date: 'Nov 30' },
  { date: 'Nov 31', motiv: 1, stress: 2 },
];

const copingMotivators: { data: Motivator[] } = {
  data: [
    {
      id: 1,
      name: 'motivator1',
      weight: 1,
      variable: true,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 2,
      name: 'motivator2',
      weight: 1,
      variable: true,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ],
};
const copingStressors: { data: Stressor[] } = {
  data: [
    {
      id: 3,
      name: 'stressor1',
      weight: 1,
      variable: true,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 4,
      name: 'stressor2',
      weight: 1,
      variable: true,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 5,
      name: 'stressor3',
      weight: 1,
      variable: true,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ],
};
const copingText: string =
  'Lorem ipsum dolor amet, consectetur adipiscing elit. Vulputate mollis fames ante quis autem differed purulent sceleris well-fated tellus. Nis enim feugiat ipsum pellentesque lectus ipsum burna curatur Libero sagittis dictum egestas blandium magna facils.';
const copeList: string[] = [
  'Lorem ipsum dolor amet',
  'Vulputate mollis fames ante',
  'Que autem differed purulent',
  'Sceleris well-fated tellus',
];
export {
  users,
  monthlyData,
  copingMotivators,
  copingStressors,
  copingText,
  copeList,
};
