//# sourceMappingURL=app.d.ts.map
import { WebHost } from '@microsoft/mixed-reality-extension-sdk';
import dotenv from 'dotenv';
import { resolve as resolvePath } from 'path';
import App from './app';

/* eslint-disable no-console */
process.on('uncaughtException', err => console.log('uncaughtException', err));
process.on('unhandledRejection', reason => console.log('unhandledRejection', reason));
/* eslint-enable no-console */

// Read .env if file exists
dotenv.config();

// Start listening for connections, and serve static files
const server = new WebHost({

    baseDir: resolvePath(__dirname, '../public')
});

// Handle new application sessions
server.adapter.onConnection(context => new App(context,));

