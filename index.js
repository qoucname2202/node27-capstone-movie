const express = require('express')
const app = express()
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { PORT } = require('./src/config')
const cookieParser = require('cookie-parser')
const rootRoute = require('./src/routes')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors())
app.use(cookieParser())
app.use(morgan('common'))
app.use(express.static('.'))

const options = {
  definition: {
    info: {
      title: 'API Movie',
      version: 'v1',
      description: '/swagger/v1/swagger.json'
    }
  },
  apis: ['src/swagger/index.js']
}
const specs = swaggerJsDoc(options)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs))

app.use('/api', rootRoute)
app.listen(PORT, () => console.log(`🚀 Server Running On Port ${PORT || 3001}`))
