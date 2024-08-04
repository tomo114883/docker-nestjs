import type { User } from "@prisma/client";
import type { Motivator } from "@prisma/client";
import type { Stressor } from "@prisma/client";
import type { Type } from "@prisma/client";
import type { TypesOnMotivators } from "@prisma/client";
import type { TypesOnStressors } from "@prisma/client";
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
    Stressors?: Prisma.StressorCreateNestedManyWithoutUserInput;
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
type StressoruserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutStressorsInput["create"]>;
};
type StressortypeFactory = {
    _factoryFor: "Type";
    build: () => PromiseLike<Prisma.TypeCreateNestedOneWithoutStressorsInput["create"]>;
};
type StressorFactoryDefineInput = {
    name?: string;
    weight?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    user: StressoruserFactory | Prisma.UserCreateNestedOneWithoutStressorsInput;
    type?: StressortypeFactory | Prisma.TypeCreateNestedOneWithoutStressorsInput;
    typesOnStressors?: Prisma.TypesOnStressorsCreateNestedManyWithoutStressorInput;
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
type TypeFactoryDefineInput = {
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    motivators?: Prisma.MotivatorCreateNestedManyWithoutTypeInput;
    Stressors?: Prisma.StressorCreateNestedManyWithoutTypeInput;
    typesOnMotivators?: Prisma.TypesOnMotivatorsCreateNestedManyWithoutTypeInput;
    typesOnStressors?: Prisma.TypesOnStressorsCreateNestedManyWithoutTypeInput;
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
type TypesOnStressorsStressorFactory = {
    _factoryFor: "Stressor";
    build: () => PromiseLike<Prisma.StressorCreateNestedOneWithoutTypesOnStressorsInput["create"]>;
};
type TypesOnStressorstypeFactory = {
    _factoryFor: "Type";
    build: () => PromiseLike<Prisma.TypeCreateNestedOneWithoutTypesOnStressorsInput["create"]>;
};
type TypesOnStressorsFactoryDefineInput = {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    Stressor: TypesOnStressorsStressorFactory | Prisma.StressorCreateNestedOneWithoutTypesOnStressorsInput;
    type: TypesOnStressorstypeFactory | Prisma.TypeCreateNestedOneWithoutTypesOnStressorsInput;
};
type TypesOnStressorsTransientFields = Record<string, unknown> & Partial<Record<keyof TypesOnStressorsFactoryDefineInput, never>>;
type TypesOnStressorsFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<TypesOnStressorsFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<TypesOnStressors, Prisma.TypesOnStressorsCreateInput, TTransients>;
type TypesOnStressorsFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<TypesOnStressorsFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: TypesOnStressorsFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<TypesOnStressors, Prisma.TypesOnStressorsCreateInput, TTransients>;
type TypesOnStressorsTraitKeys<TOptions extends TypesOnStressorsFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface TypesOnStressorsFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "TypesOnStressors";
    build(inputData?: Partial<Prisma.TypesOnStressorsCreateInput & TTransients>): PromiseLike<Prisma.TypesOnStressorsCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TypesOnStressorsCreateInput & TTransients>): PromiseLike<Prisma.TypesOnStressorsCreateInput>;
    buildList(list: readonly Partial<Prisma.TypesOnStressorsCreateInput & TTransients>[]): PromiseLike<Prisma.TypesOnStressorsCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.TypesOnStressorsCreateInput & TTransients>): PromiseLike<Prisma.TypesOnStressorsCreateInput[]>;
    pickForConnect(inputData: TypesOnStressors): Pick<TypesOnStressors, "id">;
    create(inputData?: Partial<Prisma.TypesOnStressorsCreateInput & TTransients>): PromiseLike<TypesOnStressors>;
    createList(list: readonly Partial<Prisma.TypesOnStressorsCreateInput & TTransients>[]): PromiseLike<TypesOnStressors[]>;
    createList(count: number, item?: Partial<Prisma.TypesOnStressorsCreateInput & TTransients>): PromiseLike<TypesOnStressors[]>;
    createForConnect(inputData?: Partial<Prisma.TypesOnStressorsCreateInput & TTransients>): PromiseLike<Pick<TypesOnStressors, "id">>;
}
export interface TypesOnStressorsFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends TypesOnStressorsFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): TypesOnStressorsFactoryInterfaceWithoutTraits<TTransients>;
}
interface TypesOnStressorsFactoryBuilder {
    <TOptions extends TypesOnStressorsFactoryDefineOptions>(options: TOptions): TypesOnStressorsFactoryInterface<{}, TypesOnStressorsTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends TypesOnStressorsTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends TypesOnStressorsFactoryDefineOptions<TTransients>>(options: TOptions) => TypesOnStressorsFactoryInterface<TTransients, TypesOnStressorsTraitKeys<TOptions>>;
}
export declare const defineTypesOnStressorsFactory: TypesOnStressorsFactoryBuilder;
