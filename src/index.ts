import dotenv from 'dotenv';
dotenv.config();
// import aliases from './config/moduleAlias';
// import moduleAlias from 'module-alias';
// moduleAlias.addAliases(aliases(__dirname));
import http from 'http';
import { cpus } from 'os';
import cluster from 'cluster';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import apiRoutes from './api/routes';
import DBService from './api/services/DBService';
import SocketService from './api/services/SocketService';
// import { cacheMiddleware, notFoundMiddleware, serverErrorMiddleware } from './middlewares';
// import populateDatabase from './scripts/populateDatabase';
// import collectionsMetada from './config/collections';

const {
  PORT = 8080,
  NODE_ENV,
  API_BASE_PATH = '/',
  PROTOCOL = 'http',
  BASE_URL = 'localhost',
  POPULATE_DATABASE,
  ENABLE_COMPRESSION,
  CACHE_TTL = '60',
} = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan(NODE_ENV === 'production' ? 'common' : 'dev'));
app.use(cors());

if (ENABLE_COMPRESSION) {
  app.use(compression());
}

app.use('/ping', (_req, res) => res.send('pong'));
app.use('/api', apiRoutes);

const publicPath = path.join(__dirname, '../public');

// Setup for serving the react app
app.use(express.static(publicPath));

app.get('/', function (_req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// if (CACHE_TTL !== '-1') {
//   app.use(API_BASE_PATH, cacheMiddleware(Number(CACHE_TTL)), routes);
// }

/** Error handling */
// app.use(notFoundMiddleware);
// app.use(serverErrorMiddleware);

const httpServer = http.createServer(app);

// socket.io setup
SocketService.start(httpServer);
SocketService.on('connection', (socket) => {
  console.log('a user connected');
});
// const io = require('socket.io')(httpServer);
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

(async () => {
  // DatabaseService.setCollections(collectionsMetada);
  await DBService.connect();

  /* istanbul ignore if */
  if (NODE_ENV !== 'test') {
    if (NODE_ENV === 'production') {
      if (cluster.isMaster) {
        const cpusCount = cpus().length;
        for (let i = 0; i < cpusCount; i += 1) {
          cluster.fork();
        }
      } else {
        httpServer.listen(PORT, () => {
          console.log(
            `???? Worker: ${process.pid} started server at ${PROTOCOL}://${BASE_URL}:${PORT} in ${NODE_ENV} mode`,
          );
        });
      }
    } else {
      httpServer.listen(PORT, () => {
        console.log(`???? Server ready at ${PROTOCOL}://${BASE_URL}:${PORT} in ${NODE_ENV} mode`);
      });
    }
  }
})();

export { httpServer as server, app };
