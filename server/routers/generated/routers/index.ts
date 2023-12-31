/* eslint-disable */
import { AnyRootConfig } from '@trpc/server';
import type { PrismaClient } from '@prisma/client';
import { createRouterFactory, AnyRouter } from '@trpc/server/dist/core/router';
import { createBuilder } from '@trpc/server/dist/core/internals/procedureBuilder';
import createSpaceRouter from './Space.router';
import createSpaceUserRouter from './SpaceUser.router';
import createUserRouter from './User.router';
import createListRouter from './List.router';
import createTodoRouter from './Todo.router';
import createAccountRouter from './Account.router';
import { ClientType as SpaceClientType } from './Space.router';
import { ClientType as SpaceUserClientType } from './SpaceUser.router';
import { ClientType as UserClientType } from './User.router';
import { ClientType as ListClientType } from './List.router';
import { ClientType as TodoClientType } from './Todo.router';
import { ClientType as AccountClientType } from './Account.router';

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = ReturnType<typeof createRouterFactory<Config>>;

export type ProcBuilder<Config extends BaseConfig> = ReturnType<typeof createBuilder<Config>>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        space: createSpaceRouter<Config>(router, procedure),
        spaceUser: createSpaceUserRouter<Config>(router, procedure),
        user: createUserRouter<Config>(router, procedure),
        list: createListRouter<Config>(router, procedure),
        todo: createTodoRouter<Config>(router, procedure),
        account: createAccountRouter<Config>(router, procedure),
    });
}

export interface ClientType<AppRouter extends AnyRouter> {
    space: SpaceClientType<AppRouter>;
    spaceUser: SpaceUserClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    list: ListClientType<AppRouter>;
    todo: TodoClientType<AppRouter>;
    account: AccountClientType<AppRouter>;
}
