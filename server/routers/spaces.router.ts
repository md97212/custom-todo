/* eslint-disable */
import {
    type RouterFactory,
    type ProcBuilder,
    type BaseConfig,
} from './generated/routers'
import {checkRead, checkMutate} from './generated/helper'
import {submitSpaceHandler} from '../controller/space.controller'
import {SpaceInputSchema} from '@zenstackhq/runtime/zod/input'


export default function createRouter<Config extends BaseConfig>(
    router: RouterFactory<Config>,
    procedure: ProcBuilder<Config>,
) {
    return router({
        submitSpace: procedure
            .input(SpaceInputSchema.create)
            .mutation(async ({ctx, input}) =>
                checkMutate(submitSpaceHandler({ctx, input}))),
    })
}
