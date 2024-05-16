import express from 'express'
import userRouter from './routes/users.routes'
import databaseService from './services/database.services'
import defaultErrorHandler from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from './constants/dir'
import staticsRouter from './routes/statics.routes'
import cors from 'cors'
import tweetsRouter from './routes/tweets.routes'
import bookmarksRoutes from './routes/bookmarks.routes'
import likesRoutes from './routes/likes.routes'
import searchRoutes from './routes/search.routes'
// import './utils/fake'
config()
// Connect to MongoDB
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexFollowers()
  databaseService.indexVideoStatus()
  databaseService.indexTweets()
})
const app = express()
const port = process.env.PORT || 4000
app.use(express.json())
app.use(cors())
// Init folder for upload
initFolder()
app.use('/users', userRouter)
app.use('/medias', mediasRouter)
app.use('/statics/', staticsRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRoutes)
app.use('/likes/', likesRoutes)
app.use('/search', searchRoutes)
app.use('/static', express.static(UPLOAD_IMAGE_DIR))
// Defaut error handler
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
