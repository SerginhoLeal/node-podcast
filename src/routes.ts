import { Router } from 'express'

import multer from 'multer'

import { CreatorController } from './authentication/Creators/CreatorsControllers'
import { ListenerController } from './authentication/Listener/ListenerController'
import { HomeController } from './home/HomeController'

import authMiddleware from './middleware/auth'

import multerConfig from './config/multer'

const routes = Router()

const creatorController = new CreatorController()
const listenerController = new ListenerController()
const homeController = new HomeController()

routes.post('/hmXyeYM3ZqcwspFqV92Y2Xv', creatorController.login)
routes.post('/25h82FCWbLtFxKyLQeeRm4Q', creatorController.create)

routes.post('/JqYN5FuDT2yKLfsq6HhZXMc', listenerController.login)
routes.post('/ca2JyGhn7bfJW9urqfxKzVb', listenerController.create)

routes.use(authMiddleware)

routes.get('/F284GTPNvkBpFMnfJMLYKc6', homeController.index)
routes.post('/G5LVZPtpBKC4yYSKWbeymH5', multer(multerConfig).single('file'), homeController.create)
routes.delete('/YWy83Ts2aRgGseQquE969Nr/:id', homeController.delete)

export { routes }

/**
* @routes routes.get('/Gn4KWPy3ycBxWAvpMWfaEDP', HomeController.search)
* @rotues routes.post('/u7hSbR6NtMdsu22gjR8pdNc', PlayController.index)
*/
