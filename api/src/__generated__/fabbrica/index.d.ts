import type { User } from "@prisma/client";
import type { Motivator } from "@prisma/client";
import type { Stressor } from "@prisma/client";
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
    password?: string;
    name?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    motivators?: Prisma.MotivatorCreateNestedManyWithoutUserInput;
    stressors?: Prisma.StressorCreateNestedManyWithoutUserInput;
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
type MotivatorFactoryDefineInput = {
    name?: string;
    weight?: number;
    variable?: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    user: MotivatoruserFactory | Prisma.UserCreateNestedOneWithoutMotivatorsInput;
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
type StressoruserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutStressorsInput["create"]>;
};
type StressorFactoryDefineInput = {
    name?: string;
    weight?: number;
    variable?: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    user: StressoruserFactory | Prisma.UserCreateNestedOneWithoutStressorsInput;
};
type StressorTransientFields = Record<string, unknown> & Partial<Record<keyof StressorFactoryDefineInput, never>>;
type StressorFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<StressorFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Stressor, Prisma.StressorCreateInput, TTransients>;
type StressorFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<StressorFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: StressorFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Stressor, Prisma.StressorCreateInput, TTransients>;
type StressorTraitKeys<TOptions extends StressorFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface StressorFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Stressor";
    build(inputData?: Partial<Prisma.StressorCreateInput & TTransients>): PromiseLike<Prisma.StressorCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.StressorCreateInput & TTransients>): PromiseLike<Prisma.StressorCreateInput>;
    buildList(list: readonly Partial<Prisma.StressorCreateInput & TTransients>[]): PromiseLike<Prisma.StressorCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.StressorCreateInput & TTransients>): PromiseLike<Prisma.StressorCreateInput[]>;
    pickForConnect(inputData: Stressor): Pick<Stressor, "id">;
    create(inputData?: Partial<Prisma.StressorCreateInput & TTransients>): PromiseLike<Stressor>;
    createList(list: readonly Partial<Prisma.StressorCreateInput & TTransients>[]): PromiseLike<Stressor[]>;
    createList(count: number, item?: Partial<Prisma.StressorCreateInput & TTransients>): PromiseLike<Stressor[]>;
    createForConnect(inputData?: Partial<Prisma.StressorCreateInput & TTransients>): PromiseLike<Pick<Stressor, "id">>;
}
export interface StressorFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends StressorFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): StressorFactoryInterfaceWithoutTraits<TTransients>;
}
interface StressorFactoryBuilder {
    <TOptions extends StressorFactoryDefineOptions>(options: TOptions): StressorFactoryInterface<{}, StressorTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends StressorTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends StressorFactoryDefineOptions<TTransients>>(options: TOptions) => StressorFactoryInterface<TTransients, StressorTraitKeys<TOptions>>;
}
export declare const defineStressorFactory: StressorFactoryBuilder;
