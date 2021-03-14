import { Router } from 'express';
import Message from '../models/Message';
import DBService from '../services/DBService';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    console.error('something went wrong', err);
    res.status(500).send('something went wrong');
  }
});

router.post('/', async (req, res) => {
  const message = req.body;
  try {
    DBService.watchCollection('messagecontents');
    const value = await Message.create(message);

    res.status(201).json(value);
  } catch (err) {
    console.error('something went wrong', err);
    res.status(500).send('something went wrong');
  }
});

router.get('/collections', async (req, res) => {
  const collections = await DBService.listCollections();
  res.json(collections);
});

export default router;
