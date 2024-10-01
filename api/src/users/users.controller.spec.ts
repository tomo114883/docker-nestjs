import { UserModelFactory } from 'src/test.utils/factory';
import { faker } from '@faker-js/faker';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: DeepMocked<UsersService>; // UsersServiceのディープモックを宣言する。

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
        },
      ],
    }).compile();

    usersController = usersModule.get<UsersController>(UsersController);
    usersService = usersModule.get<DeepMocked<UsersService>>(UsersService); // Substitute the deep-mock for the UsersService.
    jest.clearAllMocks();
  });

  describe('create-method', () => {
    it('適切にusersServiceのメソッドが呼び出され、引数が与えられていること。', async () => {
      // インプットデータを作成。
      const input = {
        email: faker.internet.exampleEmail(),
        name: faker.person.fullName(),
      };

      // コントローラメソッドをトリガーして、その機能をテストする。
      // このメソッドを呼び出すことで、モックしたusersServiceを利用できる。
      await usersController.create(input);

      // 結果としてusersService.findAllメソッドが呼び出されることを確認する。
      expect(usersService.create).toHaveBeenCalledWith(input);
    });
  });

  describe('findAll-method', () => {
    it('適切にusersServiceのメソッドが呼び出され、引数が与えられていること。', async () => {
      await usersController.findAll();

      expect(usersService.findAll).toHaveBeenCalledWith();
    });
  });

  // describe('findOne-method', () => {
  //   it('適切にusersServiceのメソッドが呼び出され、引数が与えられていること。', async () => {
  //     const user = await UserModelFactory.create();

  //     await usersController.findOne(user.id);

  //     expect(usersService.findOne).toHaveBeenCalledWith(user.id);
  //   });
  // });

  describe('update-method', () => {
    it('適切にusersServiceのメソッドが呼び出され、引数が与えられていること。', async () => {
      const user = await UserModelFactory.create();

      const input = {
        email: faker.internet.exampleEmail(),
        name: faker.person.fullName(),
      };

      await usersController.update(user.id, input);

      expect(usersService.update).toHaveBeenCalledWith(user.id, input);
    });
  });

  describe('remove-method', () => {
    it('適切にusersServiceのメソッドが呼び出され、引数が与えられていること。', async () => {
      const user = await UserModelFactory.create();

      await usersController.remove(user.id);

      expect(usersService.remove).toHaveBeenCalledWith(user.id);
    });
  });
});
