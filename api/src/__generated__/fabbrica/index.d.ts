import type { User } from "@prisma/client";
import type { Motivator } from "@prisma/client";
import type { Stress } from "@prisma/client";
import type { Type } from "@prisma/client";
import type { TypesOnMotivators } from "@prisma/client";
import type { TypesOnStresses } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import type { Resolver } from "@quramy/prisma-fabbrica/lib/internal";
export { resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";
type BuildDataOptions<TTransients extends Record<string, unknown>> = {
    readonly seq: number;
} & TTransients;
type TraitName = string | symbol;
type CallbackDefineOptions<TCreated, TCreateInput, TTransients extends Record<string, unknown>> = {
    onAfterBuild?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onBeforeCreate?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onAfterCreate?: (created: TCreated, transientFields: TTransients) => void | PromiseLike<void>;
};
export declare const initialize: (options: import("@quramy/prisma-fabbrica/lib/initialize").InitializeOptions) => void;
type UserFactoryDefineInput = {
    email?: string;
    name?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    motivators?: Prisma.MotivatorCreateNestedManyWithoutUserInput;
    stresses?: Prisma.StressCreateNestedManyWithoutUserInput;
};
type UserTransientFields = Record<string, unknown> & Partial<Record<keyof UserFactoryDefineInput, never>>;
type UserFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<User, Prisma.UserCreateInput, TTransients>;
type UserFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: UserFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<User, Prisma.UserCreateInput, TTransients>;
type UserTraitKeys<TOptions extends UserFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface UserFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "User";
    build(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput>;
    buildList(list: readonly Partial<Prisma.UserCreateInput & TTransients>[]): PromiseLike<Prisma.UserCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput[]>;
    pickForConnect(inputData: User): Pick<User, "id">;
    create(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<User>;
    createList(list: readonly Partial<Prisma.UserCreateInput & TTransients>[]): PromiseLike<User[]>;
    createList(count: number, item?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<User[]>;
    createForConnect(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Pick<User, "id">>;
}
export interface UserFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends UserFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): UserFactoryInterfaceWithoutTraits<TTransients>;
}
interface UserFactoryBuilder {
    <TOptions extends UserFactoryDefineOptions>(options?: TOptions): UserFactoryInterface<{}, UserTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends UserTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends UserFactoryDefineOptions<TTransients>>(options?: TOptions) => UserFactoryInterface<TTransients, UserTraitKeys<TOptions>>;
}
export declare const defineUserFactory: UserFactoryBuilder;
type MotivatoruserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutMotivatorsInput["create"]>;
};
type MotivatortypeFactory = {
    _factoryFor: "Type";
    build: () => PromiseLike<Prisma.TypeCreateNestedOneWithoutMotivatorsInput["create"]>;
};
type MotivatorFactoryDefineInput = {
    name?: string;
    weight?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    user: MotivatoruserFactory | Prisma.UserCreateNestedOneWithoutMotivatorsInput;
    type?: MotivatortypeFactory | Prisma.TypeCreateNestedOneWithoutMotivatorsInput;
    typesOnMotivators?: Prisma.TypesOnMotivatorsCreateNestedManyWithoutMotivatorInput;
};
type MotivatorTransientFields = Record<string, unknown> & Partial<Record<keyof MotivatorFactoryDefineInput, never>>;
type MotivatorFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<MotivatorFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Motivator, Prisma.MotivatorCreateInput, TTransients>;
type MotivatorFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<MotivatorFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: MotivatorFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Motivator, Prisma.MotivatorCreateInput, TTransients>;
type MotivatorTraitKeys<TOptions extends MotivatorFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface MotivatorFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Motivator";
    build(inputData?: Partial<Prisma.MotivatorCreateInput & TTransients>): PromiseLike<Prisma.MotivatorCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.MotivatorCreateInput & TTransients>): PromiseLike<Prisma.MotivatorCreateInput>;
    buildList(list: readonly Partial<Prisma.MotivatorCreateInput & TTransients>[]): PromiseLike<Prisma.MotivatorCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.MotivatorCreateInput & TTransients>): PromiseLike<Prisma.MotivatorCreateInput[]>;
    pickForConnect(inputData: Motivator): Pick<Motivator, "id">;
    create(inputData?: Partial<Prisma.MotivatorCreateInput & TTransients>): PromiseLike<Motivator>;
    createList(list: readonly Partial<Prisma.MotivatorCreateInput & TTransients>[]): PromiseLike<Motivator[]>;
    createList(count: number, item?: Partial<Prisma.MotivatorCreateInput & TTransients>): PromiseLike<Motivator[]>;
    createForConnect(inputData?: Partial<Prisma.MotivatorCreateInput & TTransients>): PromiseLike<Pick<Motivator, "id">>;
}
export interface MotivatorFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends MotivatorFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): MotivatorFactoryInterfaceWithoutTraits<TTransients>;
}
interface MotivatorFactoryBuilder {
    <TOptions extends MotivatorFactoryDefineOptions>(options: TOptions): MotivatorFactoryInterface<{}, MotivatorTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends MotivatorTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends MotivatorFactoryDefineOptions<TTransients>>(options: TOptions) => MotivatorFactoryInterface<TTransients, MotivatorTraitKeys<TOptions>>;
}
export declare const defineMotivatorFactory: MotivatorFactoryBuilder;
type StressuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutStressesInput["create"]>;
};
type StresstypeFactory = {
    _factoryFor: "Type";
    build: () => PromiseLike<Prisma.TypeCreateNestedOneWithoutStressesInput["create"]>;
};
type StressFactoryDefineInput = {
    name?: string;
    weight?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    user: StressuserFactory | Prisma.UserCreateNestedOneWithoutStressesInput;
    type?: StresstypeFactory | Prisma.TypeCreateNestedOneWithoutStressesInput;
    typesOnStresses?: Prisma.TypesOnStressesCreateNestedManyWithoutStressInput;
};
type StressTransientFields = Record<string, unknown> & Partial<Record<keyof StressFactoryDefineInput, never>>;
type StressFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<StressFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Stress, Prisma.StressCreateInput, TTransients>;
type StressFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<StressFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: StressFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Stress, Prisma.StressCreateInput, TTransients>;
type StressTraitKeys<TOptions extends StressFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface StressFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Stress";
    build(inputData?: Partial<Prisma.StressCreateInput & TTransients>): PromiseLike<Prisma.StressCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.StressCreateInput & TTransients>): PromiseLike<Prisma.StressCreateInput>;
    buildList(list: readonly Partial<Prisma.StressCreateInput & TTransients>[]): PromiseLike<Prisma.StressCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.StressCreateInput & TTransients>): PromiseLike<Prisma.StressCreateInput[]>;
    pickForConnect(inputData: Stress): Pick<Stress, "id">;
    create(inputData?: Partial<Prisma.StressCreateInput & TTransients>): PromiseLike<Stress>;
    createList(list: readonly Partial<Prisma.StressCreateInput & TTransients>[]): PromiseLike<Stress[]>;
    createList(count: number, item?: Partial<Prisma.StressCreateInput & TTransients>): PromiseLike<Stress[]>;
    createForConnect(inputData?: Partial<Prisma.StressCreateInput & TTransients>): PromiseLike<Pick<Stress, "id">>;
}
export interface StressFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends StressFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): StressFactoryInterfaceWithoutTraits<TTransients>;
}
interface StressFactoryBuilder {
    <TOptions extends StressFactoryDefineOptions>(options: TOptions): StressFactoryInterface<{}, StressTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends StressTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends StressFactoryDefineOptions<TTransients>>(options: TOptions) => StressFactoryInterface<TTransients, StressTraitKeys<TOptions>>;
}
export declare const defineStressFactory: StressFactoryBuilder;
type TypeFactoryDefineInput = {
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    motivators?: Prisma.MotivatorCreateNestedManyWithoutTypeInput;
    stresses?: Prisma.StressCreateNestedManyWithoutTypeInput;
    typesOnMotivators?: Prisma.TypesOnMotivatorsCreateNestedManyWithoutTypeInput;
    typesOnStresses?: Prisma.TypesOnStressesCreateNestedManyWithoutTypeInput;
};
type TypeTransientFields = Record<string, unknown> & Partial<Record<keyof TypeFactoryDefineInput, never>>;
type TypeFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<TypeFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Type, Prisma.TypeCreateInput, TTransients>;
type TypeFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<TypeFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: TypeFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Type, Prisma.TypeCreateInput, TTransients>;
type TypeTraitKeys<TOptions extends TypeFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface TypeFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Type";
    build(inputData?: Partial<Prisma.TypeCreateInput & TTransients>): PromiseLike<Prisma.TypeCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TypeCreateInput & TTransients>): PromiseLike<Prisma.TypeCreateInput>;
    buildList(list: readonly Partial<Prisma.TypeCreateInput & TTransients>[]): PromiseLike<Prisma.TypeCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.TypeCreateInput & TTransients>): PromiseLike<Prisma.TypeCreateInput[]>;
    pickForConnect(inputData: Type): Pick<Type, "id">;
    create(inputData?: Partial<Prisma.TypeCreateInput & TTransients>): PromiseLike<Type>;
    createList(list: readonly Partial<Prisma.TypeCreateInput & TTransients>[]): PromiseLike<Type[]>;
    createList(count: number, item?: Partial<Prisma.TypeCreateInput & TTransients>): PromiseLike<Type[]>;
    createForConnect(inputData?: Partial<Prisma.TypeCreateInput & TTransients>): PromiseLike<Pick<Type, "id">>;
}
export interface TypeFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends TypeFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): TypeFactoryInterfaceWithoutTraits<TTransients>;
}
interface TypeFactoryBuilder {
    <TOptions extends TypeFactoryDefineOptions>(options?: TOptions): TypeFactoryInterface<{}, TypeTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends TypeTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends TypeFactoryDefineOptions<TTransients>>(options?: TOptions) => TypeFactoryInterface<TTransients, TypeTraitKeys<TOptions>>;
}
export declare const defineTypeFactory: TypeFactoryBuilder;
type TypesOnMotivatorsmotivatorFactory = {
    _factoryFor: "Motivator";
    build: () => PromiseLike<Prisma.MotivatorCreateNestedOneWithoutTypesOnMotivatorsInput["create"]>;
};
type TypesOnMotivatorstypeFactory = {
    _factoryFor: "Type";
    build: () => PromiseLike<Prisma.TypeCreateNestedOneWithoutTypesOnMotivatorsInput["create"]>;
};
type TypesOnMotivatorsFactoryDefineInput = {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    motivator: TypesOnMotivatorsmotivatorFactory | Prisma.MotivatorCreateNestedOneWithoutTypesOnMotivatorsInput;
    type: TypesOnMotivatorstypeFactory | Prisma.TypeCreateNestedOneWithoutTypesOnMotivatorsInput;
};
type TypesOnMotivatorsTransientFields = Record<string, unknown> & Partial<Record<keyof TypesOnMotivatorsFactoryDefineInput, never>>;
type TypesOnMotivatorsFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<TypesOnMotivatorsFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<TypesOnMotivators, Prisma.TypesOnMotivatorsCreateInput, TTransients>;
type TypesOnMotivatorsFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<TypesOnMotivatorsFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: TypesOnMotivatorsFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<TypesOnMotivators, Prisma.TypesOnMotivatorsCreateInput, TTransients>;
type TypesOnMotivatorsTraitKeys<TOptions extends TypesOnMotivatorsFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface TypesOnMotivatorsFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "TypesOnMotivators";
    build(inputData?: Partial<Prisma.TypesOnMotivatorsCreateInput & TTransients>): PromiseLike<Prisma.TypesOnMotivatorsCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TypesOnMotivatorsCreateInput & TTransients>): PromiseLike<Prisma.TypesOnMotivatorsCreateInput>;
    buildList(list: readonly Partial<Prisma.TypesOnMotivatorsCreateInput & TTransients>[]): PromiseLike<Prisma.TypesOnMotivatorsCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.TypesOnMotivatorsCreateInput & TTransients>): PromiseLike<Prisma.TypesOnMotivatorsCreateInput[]>;
    pickForConnect(inputData: TypesOnMotivators): Pick<TypesOnMotivators, "id">;
    create(inputData?: Partial<Prisma.TypesOnMotivatorsCreateInput & TTransients>): PromiseLike<TypesOnMotivators>;
    createList(list: readonly Partial<Prisma.TypesOnMotivatorsCreateInput & TTransients>[]): PromiseLike<TypesOnMotivators[]>;
    createList(count: number, item?: Partial<Prisma.TypesOnMotivatorsCreateInput & TTransients>): PromiseLike<TypesOnMotivators[]>;
    createForConnect(inputData?: Partial<Prisma.TypesOnMotivatorsCreateInput & TTransients>): PromiseLike<Pick<TypesOnMotivators, "id">>;
}
export interface TypesOnMotivatorsFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends TypesOnMotivatorsFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): TypesOnMotivatorsFactoryInterfaceWithoutTraits<TTransients>;
}
interface TypesOnMotivatorsFactoryBuilder {
    <TOptions extends TypesOnMotivatorsFactoryDefineOptions>(options: TOptions): TypesOnMotivatorsFactoryInterface<{}, TypesOnMotivatorsTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends TypesOnMotivatorsTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends TypesOnMotivatorsFactoryDefineOptions<TTransients>>(options: TOptions) => TypesOnMotivatorsFactoryInterface<TTransients, TypesOnMotivatorsTraitKeys<TOptions>>;
}
export declare const defineTypesOnMotivatorsFactory: TypesOnMotivatorsFactoryBuilder;
type TypesOnStressesstressFactory = {
    _factoryFor: "Stress";
    build: () => PromiseLike<Prisma.StressCreateNestedOneWithoutTypesOnStressesInput["create"]>;
};
type TypesOnStressestypeFactory = {
    _factoryFor: "Type";
    build: () => PromiseLike<Prisma.TypeCreateNestedOneWithoutTypesOnStressesInput["create"]>;
};
type TypesOnStressesFactoryDefineInput = {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    stress: TypesOnStressesstressFactory | Prisma.StressCreateNestedOneWithoutTypesOnStressesInput;
    type: TypesOnStressestypeFactory | Prisma.TypeCreateNestedOneWithoutTypesOnStressesInput;
};
type TypesOnStressesTransientFields = Record<string, unknown> & Partial<Record<keyof TypesOnStressesFactoryDefineInput, never>>;
type TypesOnStressesFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<TypesOnStressesFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<TypesOnStresses, Prisma.TypesOnStressesCreateInput, TTransients>;
type TypesOnStressesFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<TypesOnStressesFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: TypesOnStressesFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<TypesOnStresses, Prisma.TypesOnStressesCreateInput, TTransients>;
type TypesOnStressesTraitKeys<TOptions extends TypesOnStressesFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface TypesOnStressesFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "TypesOnStresses";
    build(inputData?: Partial<Prisma.TypesOnStressesCreateInput & TTransients>): PromiseLike<Prisma.TypesOnStressesCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TypesOnStressesCreateInput & TTransients>): PromiseLike<Prisma.TypesOnStressesCreateInput>;
    buildList(list: readonly Partial<Prisma.TypesOnStressesCreateInput & TTransients>[]): PromiseLike<Prisma.TypesOnStressesCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.TypesOnStressesCreateInput & TTransients>): PromiseLike<Prisma.TypesOnStressesCreateInput[]>;
    pickForConnect(inputData: TypesOnStresses): Pick<TypesOnStresses, "id">;
    create(inputData?: Partial<Prisma.TypesOnStressesCreateInput & TTransients>): PromiseLike<TypesOnStresses>;
    createList(list: readonly Partial<Prisma.TypesOnStressesCreateInput & TTransients>[]): PromiseLike<TypesOnStresses[]>;
    createList(count: number, item?: Partial<Prisma.TypesOnStressesCreateInput & TTransients>): PromiseLike<TypesOnStresses[]>;
    createForConnect(inputData?: Partial<Prisma.TypesOnStressesCreateInput & TTransients>): PromiseLike<Pick<TypesOnStresses, "id">>;
}
export interface TypesOnStressesFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends TypesOnStressesFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): TypesOnStressesFactoryInterfaceWithoutTraits<TTransients>;
}
interface TypesOnStressesFactoryBuilder {
    <TOptions extends TypesOnStressesFactoryDefineOptions>(options: TOptions): TypesOnStressesFactoryInterface<{}, TypesOnStressesTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends TypesOnStressesTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends TypesOnStressesFactoryDefineOptions<TTransients>>(options: TOptions) => TypesOnStressesFactoryInterface<TTransients, TypesOnStressesTraitKeys<TOptions>>;
}
export declare const defineTypesOnStressesFactory: TypesOnStressesFactoryBuilder;
