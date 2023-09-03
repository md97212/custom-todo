import {Space} from '@prisma/client'
import {getEnhancedPrisma} from '../db/enhanced'

export const submitSpace = async ({ctx, input}: {
    ctx: any;
    input: any;
}) => {
    console.log({input})
    const db = await getEnhancedPrisma(ctx)

    return (await db.space.update(input)) as Space
}
