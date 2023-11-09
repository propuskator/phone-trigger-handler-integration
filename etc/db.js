module.exports = {
    production : {
        port     : process.env.DB_PORT || 3306,
        username : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        host     : process.env.DB_HOST,
        dialect  : 'mysql',
        pool     : {
            max     : +process.env.DB_POOL_MAX     || 64,
            min     : +process.env.DB_POOL_MIN     || 32,
            acquire : +process.env.DB_POOL_ACQUIRE || 5000,
            idle    : +process.env.DB_POOL_IDLE    || 2500
        },
        logging : !!process.env.DB_QUERY_LOG || false
    },
    development : {
        port     : process.env.DB_PORT || 3306,
        username : process.env.DB_USER || 'access_user',
        password : process.env.DB_PASSWORD || 'secret_password',
        database : process.env.DB_NAME || 'access',
        host     : process.env.DB_HOST || 'access-percona',
        dialect  : 'mysql',
        pool     : {
            max     : +process.env.DB_POOL_MAX     || 64,
            min     : +process.env.DB_POOL_MIN     || 32,
            acquire : +process.env.DB_POOL_ACQUIRE || 60000,
            idle    : +process.env.DB_POOL_IDLE    || 2500
        },
        logging : !!process.env.DB_QUERY_LOG || false
    },
    test : {
        port     : process.env.DB_PORT || 3306,
        username : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        host     : process.env.DB_HOST,
        dialect  : 'mysql',
        pool     : {
            max     : +process.env.DB_POOL_MAX     || 64,
            min     : +process.env.DB_POOL_MIN     || 32,
            acquire : +process.env.DB_POOL_ACQUIRE || 5000,
            idle    : +process.env.DB_POOL_IDLE    || 2500
        },
        logging : !!process.env.DB_QUERY_LOG || false
    }
};
