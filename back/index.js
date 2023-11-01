require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

const Models = require('./models')

const usersRoutes = require('./routes/Login')
const watchedRoutes = require('./routes/Watched')
const watchlistRoutes = require('./routes/Watchlist')
const topRoutes = require('./routes/Top')

app.use("/users", usersRoutes)
app.use("/watched", watchedRoutes)
app.use("/watchlist", watchlistRoutes)
app.use("/top", topRoutes)

Models.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})
