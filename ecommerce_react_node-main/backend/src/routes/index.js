import { Router } from 'express';

// helpers
import { verifyAccessToken } from '../helpers/jwt';

// routes
import auth from './auth';
import product from './product';
import order from './order';

const os = require('os');
const redis = require('redis');
const router = Router();
const redisclient = redis.createClient({
  url: 'redis://redis:6379'
});
redisclient.on('error', err => console.log('Redis Client Error', err));
redisclient.on('success!!', () => console.log('connected to redis..'));
redisclient.connect();

 
router.get('/', async(req, res) => {
  redisclient.set('hostname', `${os.hostname}`)
  const myhostname= await redisclient.get('hostname');
  res.send(`${myhostname}`);
  //res.end('hey');
});
router.get('/api/hostname', async(req, res) => {
  //const hostname = os.hostname();
  redisclient.set('hostname', `${os.hostname}`)
  const myhostname= await redisclient.get('hostname');
  res.json({ myhostname });
});

router.use('/auth', auth);
router.use('/product', product);
router.use('/order', verifyAccessToken, order);

export default router;
