/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import { TodoSchema } from '../schemas/Todo.schema';
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input(TodoSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).todo.aggregate(input))),

        createMany: procedure.input(TodoSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).todo.createMany(input))),

        create: procedure.input(TodoSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).todo.create(input))),

        deleteMany: procedure.input(TodoSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).todo.deleteMany(input))),

        delete: procedure.input(TodoSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).todo.delete(input))),

        findFirst: procedure.input(TodoSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).todo.findFirst(input))),

        findFirstOrThrow: procedure.input(TodoSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).todo.findFirstOrThrow(input))),

        findMany: procedure.input(TodoSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).todo.findMany(input))),

        findUnique: procedure.input(TodoSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).todo.findUnique(input))),

        findUniqueOrThrow: procedure.input(TodoSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).todo.findUniqueOrThrow(input))),

        groupBy: procedure.input(TodoSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).todo.groupBy(input))),

        updateMany: procedure.input(TodoSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).todo.updateMany(input))),

        update: procedure.input(TodoSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).todo.update(input))),

        upsert: procedure.input(TodoSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).todo.upsert(input))),

    }
    );
}
