exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:admin@ds245518.mlab.com:45518/explore-your-options';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://admin:admin@ds245518.mlab.com:45518/explore-your-options';
exports.PORT = process.env.PORT || 8080;
