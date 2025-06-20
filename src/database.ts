const {Pool} = require('pg');
require('dotenv').config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = pool;

/**todo: make the database pool more secure and robust  
 * right now it is just a basic implementation
 * */