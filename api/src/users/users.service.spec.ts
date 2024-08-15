import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModelFactory } from 'src/test.utils/factory';
import { faker } from '@faker-js/faker';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UsersService],
    })
      // Add to be auto-transaction.
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create-method', () => {
    it('Create a new user when the data was input.', async () => {
      const data: CreateUserDto = {
        email: faker.internet.exampleEmail(),
        password: faker.internet.password(),
      };
      const result = await service.create(data);
      expect(result.id).not.toBeNull();
      expect(result.email).toBe(data.email);
      expect(result.password).not.toBeNull();
    });
    it('Get the user was created from the DB when the data was input.', async () => {
      const data: CreateUserDto = {
        email: faker.internet.exampleEmail(),
        password: faker.internet.password(),
      };
      const user = await service.create(data);
      const result = await prisma.user.findUnique({
        where: { id: user.id },
      });
      expect(result.id).not.toBeNull();
      expect(result.email).toBe(data.email);
      expect(result.password).not.toBeNull();
    });
  });
  describe('findAllのテスト', () => {
    it('全てのユーザーが返ってくること', async () => {
      // serviceのメソッドを使用したいわけではないためprismaを使用。
      const user1 = await UserModelFactory.create();
      const user2 = await UserModelFactory.create();

      const results = await service.findAll();
      expect(results.length).toBe(2);
      expect(results[0].id).not.toBeNull();
      expect(results[0].email).toBe(user1.email);
      expect(results[0].name).toBe(user1.name);
      expect(results[1].id).not.toBeNull();
      expect(results[1].email).toBe(user2.email);
      expect(results[1].name).toBe(user2.name);
    });
  });
  describe('findOneのテスト', () => {
    it('単一のユーザーが返ってくること', async () => {
      // 作成済みユーザーの情報
      // ユーザーの事前作成と取得
      const user = await UserModelFactory.create();
      const foundUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      // ユーザー情報の取得
      const result = await service.findOne(foundUser.id);
      expect(result.id).not.toBeNull();
      expect(result.email).toBe(user.email);
      expect(result.name).toBe(user.name);
    });

    it('When email is input, returning a user.', async () => {
      // 作成済みユーザーの情報
      // ユーザーの事前作成と取得
      const user = await UserModelFactory.create();
      const foundUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      // ユーザー情報の取得
      const result = await service.findOne(foundUser.email);
      expect(result.id).not.toBeNull();
      expect(result.email).toBe(user.email);
      expect(result.name).toBe(user.name);
    });
  });
  describe('updateのテスト', () => {
    it('入力した情報で、ユーザー情報が更新されること', async () => {
      // 作成済みユーザーの情報
      // ユーザーの事前作成と取得
      const user = await await UserModelFactory.create();
      const foundUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      // 更新ユーザーの情報
      const updateData: UpdateUserDto = {
        email: faker.internet.exampleEmail(),
        name: faker.person.fullName(),
      };

      // ユーザー情報の更新
      const result = await service.update(foundUser.id, updateData);
      expect(result.id).not.toBeNull();
      expect(result.email).toBe(updateData.email);
      expect(result.name).toBe(updateData.name);
    });

    it('updateUserDtoを入力すると、DBに更新されたユーザー情報が入ること', async () => {
      // 作成済みユーザーの情報
      // ユーザーの事前作成と取得
      const user = await UserModelFactory.create();
      const foundUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });
      // 更新ユーザーの情報
      const updateData: UpdateUserDto = {
        email: faker.internet.exampleEmail(),
        name: faker.person.fullName(),
      };
      // ユーザー情報の更新
      const updatedUser = await service.update(foundUser.id, updateData);

      const result = await prisma.user.findUnique({
        where: {
          id: updatedUser.id,
        },
      });
      expect(result.id).not.toBeNull();
      expect(result.email).toBe(updateData.email);
      expect(result.name).toBe(updateData.name);
    });

    it('入力したメールアドレスが既に存在するときに、エラーを投げること', async () => {
      // 作成済みユーザー1の情報
      // ユーザーの事前作成と取得
      const user1 = await UserModelFactory.create();

      // 作成済みユーザー2の情報
      const user2 = await UserModelFactory.create();

      // 更新ユーザーの情報
      const updateData: UpdateUserDto = {
        email: user2.email,
        name: faker.person.fullName(),
      };

      // ユーザー1の情報の更新
      await expect(service.update(user1.id, updateData)).rejects.toThrow(
        'このメールアドレスは既に存在しています。',
      );
    });
  });

  describe('removeのテスト', () => {
    it('入力したIDで、ユーザーが削除されること', async () => {
      // 作成済みユーザーの情報
      // ユーザーの事前作成と取得
      const user = await UserModelFactory.create();

      // ユーザー情報の削除
      const result = await service.remove(user.id);
      expect(result).not.toBeNull();
    });
  });

  it('createUserDtoを入力すると、DBに更新されたユーザー情報が削除されること', async () => {
    // 作成済みユーザーの情報
    // ユーザーの事前作成と取得
    const user = await UserModelFactory.create();
    // ユーザー情報の削除
    await service.remove(user.id);

    // Nullの値を期待する場合は、findUnique()メソッドを使用。
    const result = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    expect(result).toBeNull();
  });

  it('入力されたユーザーが存在しないとき、IDを返すこと', async () => {
    const userId = 1;
    const result = await service.remove(userId);
    await expect(result).toBe(userId);
  });
});
