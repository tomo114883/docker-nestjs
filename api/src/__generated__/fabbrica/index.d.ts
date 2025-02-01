import type { User } from "@prisma/client";
import type { FactorsSet } from "@prisma/client";
import type { Motivator } from "@prisma/client";
import type { Stressor } from "@prisma/client";
import type { Template } from "@prisma/client";
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
    factorsSets?: Prisma.FactorsSetCreateNestedManyWithoutUserInput;
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
type FactorsSetuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutFactorsSetsInput["create"]>;
};
type FactorsSettemplateFactory = {
    _factoryFor: "Template";
    build: () => PromiseLike<Prisma.TemplateCreateNestedOneWithoutFactorsSetInput["create"]>;
};
type FactorsSetFactoryDefineInput = {
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    user: FactorsSetuserFactory | Prisma.UserCreateNestedOneWithoutFactorsSetsInput;
    motivators?: Prisma.MotivatorCreateNestedManyWithoutFactorsSetInput;
    stressors?: Prisma.StressorCreateNestedManyWithoutFactorsSetInput;
    template?: FactorsSettemplateFactory | Prisma.TemplateCreateNestedOneWithoutFactorsSetInput;
};
type FactorsSetTransientFields = Record<string, unknown> & Partial<Record<keyof FactorsSetFactoryDefineInput, never>>;
type FactorsSetFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<FactorsSetFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<FactorsSet, Prisma.FactorsSetCreateInput, TTransients>;
type FactorsSetFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<FactorsSetFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: FactorsSetFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<FactorsSet, Prisma.FactorsSetCreateInput, TTransients>;
type FactorsSetTraitKeys<TOptions extends FactorsSetFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface FactorsSetFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "FactorsSet";
    build(inputData?: Partial<Prisma.FactorsSetCreateInput & TTransients>): PromiseLike<Prisma.FactorsSetCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.FactorsSetCreateInput & TTransients>): PromiseLike<Prisma.FactorsSetCreateInput>;
    buildList(list: readonly Partial<Prisma.FactorsSetCreateInput & TTransients>[]): PromiseLike<Prisma.FactorsSetCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.FactorsSetCreateInput & TTransients>): PromiseLike<Prisma.FactorsSetCreateInput[]>;
    pickForConnect(inputData: FactorsSet): Pick<FactorsSet, "id">;
    create(inputData?: Partial<Prisma.FactorsSetCreateInput & TTransients>): PromiseLike<FactorsSet>;
    createList(list: readonly Partial<Prisma.FactorsSetCreateInput & TTransients>[]): PromiseLike<FactorsSet[]>;
    createList(count: number, item?: Partial<Prisma.FactorsSetCreateInput & TTransients>): PromiseLike<FactorsSet[]>;
    createForConnect(inputData?: Partial<Prisma.FactorsSetCreateInput & TTransients>): PromiseLike<Pick<FactorsSet, "id">>;
}
export interface FactorsSetFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends FactorsSetFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): FactorsSetFactoryInterfaceWithoutTraits<TTransients>;
}
interface FactorsSetFactoryBuilder {
    <TOptions extends FactorsSetFactoryDefineOptions>(options: TOptions): FactorsSetFactoryInterface<{}, FactorsSetTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends FactorsSetTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends FactorsSetFactoryDefineOptions<TTransients>>(options: TOptions) => FactorsSetFactoryInterface<TTransients, FactorsSetTraitKeys<TOptions>>;
}
export declare const defineFactorsSetFactory: FactorsSetFactoryBuilder;
type MotivatorfactorsSetFactory = {
    _factoryFor: "FactorsSet";
    build: () => PromiseLike<Prisma.FactorsSetCreateNestedOneWithoutMotivatorsInput["create"]>;
};
type MotivatorFactoryDefineInput = {
    name?: string;
    weight?: number;
    variable?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    factorsSet: MotivatorfactorsSetFactory | Prisma.FactorsSetCreateNestedOneWithoutMotivatorsInput;
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
type StressorfactorsSetFactory = {
    _factoryFor: "FactorsSet";
    build: () => PromiseLike<Prisma.FactorsSetCreateNestedOneWithoutStressorsInput["create"]>;
};
type StressorFactoryDefineInput = {
    name?: string;
    weight?: number;
    variable?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    factorsSet: StressorfactorsSetFactory | Prisma.FactorsSetCreateNestedOneWithoutStressorsInput;
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
type TemplatefactorsSetFactory = {
    _factoryFor: "FactorsSet";
    build: () => PromiseLike<Prisma.FactorsSetCreateNestedOneWithoutTemplateInput["create"]>;
};
type TemplateFactoryDefineInput = {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    factorsSet: TemplatefactorsSetFactory | Prisma.FactorsSetCreateNestedOneWithoutTemplateInput;
};
type TemplateTransientFields = Record<string, unknown> & Partial<Record<keyof TemplateFactoryDefineInput, never>>;
type TemplateFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<TemplateFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Template, Prisma.TemplateCreateInput, TTransients>;
type TemplateFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<TemplateFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: TemplateFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Template, Prisma.TemplateCreateInput, TTransients>;
type TemplateTraitKeys<TOptions extends TemplateFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface TemplateFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Template";
    build(inputData?: Partial<Prisma.TemplateCreateInput & TTransients>): PromiseLike<Prisma.TemplateCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TemplateCreateInput & TTransients>): PromiseLike<Prisma.TemplateCreateInput>;
    buildList(list: readonly Partial<Prisma.TemplateCreateInput & TTransients>[]): PromiseLike<Prisma.TemplateCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.TemplateCreateInput & TTransients>): PromiseLike<Prisma.TemplateCreateInput[]>;
    pickForConnect(inputData: Template): Pick<Template, "id">;
    create(inputData?: Partial<Prisma.TemplateCreateInput & TTransients>): PromiseLike<Template>;
    createList(list: readonly Partial<Prisma.TemplateCreateInput & TTransients>[]): PromiseLike<Template[]>;
    createList(count: number, item?: Partial<Prisma.TemplateCreateInput & TTransients>): PromiseLike<Template[]>;
    createForConnect(inputData?: Partial<Prisma.TemplateCreateInput & TTransients>): PromiseLike<Pick<Template, "id">>;
}
export interface TemplateFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends TemplateFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): TemplateFactoryInterfaceWithoutTraits<TTransients>;
}
interface TemplateFactoryBuilder {
    <TOptions extends TemplateFactoryDefineOptions>(options: TOptions): TemplateFactoryInterface<{}, TemplateTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends TemplateTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends TemplateFactoryDefineOptions<TTransients>>(options: TOptions) => TemplateFactoryInterface<TTransients, TemplateTraitKeys<TOptions>>;
}
export declare const defineTemplateFactory: TemplateFactoryBuilder;
