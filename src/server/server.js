// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
// define the Express app
const app = express();

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());
// Allow also CORS

// log HTTP requests
app.use(morgan('combined'));
/*
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
*/

/**
 * Routing
 */

const articleRoutes = require('./Routes/articlesRoutes');
const usersRoutes = require('./Routes/usersRoutes');
const statsRoutes = require('./Routes/statsRoutes');
const adminRoutes = require('./Routes/adminRoutes');

app.use('/', articleRoutes);
app.use('/auth/', usersRoutes);
app.use('/stat/', statsRoutes);
app.use('/admin/', adminRoutes);
// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});
