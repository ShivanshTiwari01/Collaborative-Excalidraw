import { WebSocketServer } from 'ws';
import { JWT_SECRET } from '@repo/backend-common/config';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }

  const params = new URLSearchParams(url.split('?')[1]);
  const token = params.get('token');

  ws.on('message', function message(data) {
    ws.send('pong');
  });
});
