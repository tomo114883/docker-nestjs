import type { User } from "@prisma/client";
import type { Motivation } from "@prisma/client";
import type { Stress } from "@prisma/client";
import type { Type } from "@prisma/client";
import type { TypesOnMotivations } from "@prisma/client";
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
    motivations?: Prisma.MotivationCreateNestedManyWithoutUserInput;
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
type MotivationuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutMotivationsInput["create"]>;
};
type MotivationtypeFactory = {
    _factoryFor: "Type";
    build: () => PromiseLike<Prisma.TypeCreateNestedOneWithoutMotivationsInput["create"]>;
};
type MotivationFactoryDefineInput = {
    name?: string;
    weight?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    user: MotivationuserFactory | Prisma.UserCreateNestedOneWithoutMotivationsInput;
    type?: MotivationtypeFactory | Prisma.TypeCreateNestedOneWithoutMotivationsInput;
    typesOnMotivations?: Prisma.TypesOnMotivationsCreateNestedManyWithoutMotivationInput;
};
type MotivationTransientFields = Record<string, unknown> & Partial<Record<keyof MotivationFactoryDefineInput, never>>;
type MotivationFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<MotivationFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Motivation, Prisma.MotivationCreateInput, TTransients>;
type MotivationFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<MotivationFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: MotivationFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Motivation, Prisma.MotivationCreateInput, TTransients>;
type MotivationTraitKeys<TOptions extends MotivationFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface MotivationFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Motivation";
    build(inputData?: Partial<Prisma.MotivationCreateInput & TTransients>): PromiseLike<Prisma.MotivationCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.MotivationCreateInput & TTransients>): PromiseLike<Prisma.MotivationCreateInput>;
    buildList(list: readonly Partial<Prisma.MotivationCreateInput & TTransients>[]): PromiseLike<Prisma.MotivationCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.MotivationCreateInput & TTransients>): PromiseLike<Prisma.MotivationCreateInput[]>;
    pickForConnect(inputData: Motivation): Pick<Motivation, "id">;
    create(inputData?: Partial<Prisma.MotivationCreateInput & TTransients>): PromiseLike<Motivation>;
    createList(list: readonly Partial<Prisma.MotivationCreateInput & TTransients>[]): PromiseLike<Motivation[]>;
    createList(count: number, item?: Partial<Prisma.MotivationCreateInput & TTransients>): PromiseLike<Motivation[]>;
    createForConnect(inputData?: Partial<Prisma.MotivationCreateInput & TTransients>): PromiseLike<Pick<Motivation, "id">>;
}
export interface MotivationFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends MotivationFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): MotivationFactoryInterfaceWithoutTraits<TTransients>;
}
interface MotivationFactoryBuilder {
    <TOptions extends MotivationFactoryDefineOptions>(options: TOptions): MotivationFactoryInterface<{}, MotivationTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends MotivationTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends MotivationFactoryDefineOptions<TTransients>>(options: TOptions) => MotivationFactoryInterface<TTransients, MotivationTraitKeys<TOptions>>;
}
export declare const defineMotivationFactory: MotivationFactoryBuilder;
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
    motivations?: Prisma.MotivationCreateNestedManyWithoutTypeInput;
    stresses?: Prisma.StressCreateNestedManyWithoutTypeInput;
    typesOnMotivations?: Prisma.TypesOnMotivationsCreateNestedManyWithoutTypeInput;
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
type TypesOnMotivationsmotivationFactory = {
    _factoryFor: "Motivation";
    build: () => PromiseLike<Prisma.MotivationCreateNestedOneWithoutTypesOnMotivationsInput["create"]>;
};
type TypesOnMotivationstypeFactory = {
    _factoryFor: "Type";
    build: () => PromiseLike<Prisma.TypeCreateNestedOneWithoutTypesOnMotivationsInput["create"]>;
};
type TypesOnMotivationsFactoryDefineInput = {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    motivation: TypesOnMotivationsmotivationFactory | Prisma.MotivationCreateNestedOneWithoutTypesOnMotivationsInput;
    type: TypesOnMotivationstypeFactory | Prisma.TypeCreateNestedOneWithoutTypesOnMotivationsInput;
};
type TypesOnMotivationsTransientFields = Record<string, unknown> & Partial<Record<keyof TypesOnMotivationsFactoryDefineInput, never>>;
type TypesOnMotivationsFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<TypesOnMotivationsFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<TypesOnMotivations, Prisma.TypesOnMotivationsCreateInput, TTransients>;
type TypesOnMotivationsFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<TypesOnMotivationsFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: TypesOnMotivationsFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<TypesOnMotivations, Prisma.TypesOnMotivationsCreateInput, TTransients>;
type TypesOnMotivationsTraitKeys<TOptions extends TypesOnMotivationsFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface TypesOnMotivationsFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "TypesOnMotivations";
    build(inputData?: Partial<Prisma.TypesOnMotivationsCreateInput & TTransients>): PromiseLike<Prisma.TypesOnMotivationsCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TypesOnMotivationsCreateInput & TTransients>): PromiseLike<Prisma.TypesOnMotivationsCreateInput>;
    buildList(list: readonly Partial<Prisma.TypesOnMotivationsCreateInput & TTransients>[]): PromiseLike<Prisma.TypesOnMotivationsCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.TypesOnMotivationsCreateInput & TTransients>): PromiseLike<Prisma.TypesOnMotivationsCreateInput[]>;
    pickForConnect(inputData: TypesOnMotivations): Pick<TypesOnMotivations, "id">;
    create(inputData?: Partial<Prisma.TypesOnMotivationsCreateInput & TTransients>): PromiseLike<TypesOnMotivations>;
    createList(list: readonly Partial<Prisma.TypesOnMotivationsCreateInput & TTransients>[]): PromiseLike<TypesOnMotivations[]>;
    createList(count: number, item?: Partial<Prisma.TypesOnMotivationsCreateInput & TTransients>): PromiseLike<TypesOnMotivations[]>;
    createForConnect(inputData?: Partial<Prisma.TypesOnMotivationsCreateInput & TTransients>): PromiseLike<Pick<TypesOnMotivations, "id">>;
}
export interface TypesOnMotivationsFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends TypesOnMotivationsFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): TypesOnMotivationsFactoryInterfaceWithoutTraits<TTransients>;
}
interface TypesOnMotivationsFactoryBuilder {
    <TOptions extends TypesOnMotivationsFactoryDefineOptions>(options: TOptions): TypesOnMotivationsFactoryInterface<{}, TypesOnMotivationsTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends TypesOnMotivationsTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends TypesOnMotivationsFactoryDefineOptions<TTransients>>(options: TOptions) => TypesOnMotivationsFactoryInterface<TTransients, TypesOnMotivationsTraitKeys<TOptions>>;
}
export declare const defineTypesOnMotivationsFactory: TypesOnMotivationsFactoryBuilder;
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
