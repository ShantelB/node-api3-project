// code away!
require('dotenv').config()

const server = require('./server');

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`\n == API on port ${port} == \n`))

