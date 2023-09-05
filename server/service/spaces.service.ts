import {Space} from '@prisma/client'
import {getEnhancedPrisma} from '../db/enhanced'

export const submitSpace = async ({ctx, input}: {
    ctx: any;
    input: any;
}) => {
    console.log({submitService: input})
    const db = await getEnhancedPrisma(ctx.prisma)
    console.log({db: db})

    return (await db.space.update(input)) as Space
}
