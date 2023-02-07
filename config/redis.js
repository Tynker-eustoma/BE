const Redis = require('ioredis');
const redisPassword = process.env.REDIS || '7TkXKHKOuFTKKtyo7LfxoX3COuaSy5Zt'

const redis = new Redis({
  port: 11149, // Redis port
  host: 'redis-11149.c292.ap-southeast-1-1.ec2.cloud.redislabs.com', // Redis host
  username: 'default', // needs Redis >= 6
  password: redisPassword,
  db: 0, // Defaults to 0
});

module.exports = redis;