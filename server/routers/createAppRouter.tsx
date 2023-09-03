import {BaseConfig, ProcBuilder, RouterFactory} from './generated/routers'
import createSpacesRouter from './spaces.router'

export default function createAppRouter<Config extends BaseConfig>(
    router: RouterFactory<Config>,
    procedure: ProcBuilder<Config>,
) {
    return router({
        spaces: createSpacesRouter<Config>(router, procedure),
    })
}
