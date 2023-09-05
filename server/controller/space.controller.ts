import {TRPCError} from '@trpc/server'
import {submitSpace} from '../service/spaces.service'

export const submitSpaceHandler = async ({ctx, input}: {
    ctx: any;
    input: any;
}) => {
    try {
        console.log({submitSpace: input})
        const submittedSpace = await submitSpace({ ctx, input } )

        if (!submittedSpace) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Space with that ID not found',
            });
        }

        return {
            status: 'success',
            data: {
                submittedSpace: submittedSpace,
            },
        };
    } catch (err: any) {
        throw err;
    }
}
