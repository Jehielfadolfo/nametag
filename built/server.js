"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=app.d.ts.map
const mixed_reality_extension_sdk_1 = require("@microsoft/mixed-reality-extension-sdk");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const app_1 = __importDefault(require("./app"));
/* eslint-disable no-console */
process.on('uncaughtException', err => console.log('uncaughtException', err));
process.on('unhandledRejection', reason => console.log('unhandledRejection', reason));
/* eslint-enable no-console */
// Read .env if file exists
dotenv_1.default.config();
// Start listening for connections, and serve static files
const server = new mixed_reality_extension_sdk_1.WebHost({
    baseDir: path_1.resolve(__dirname, '../public')
});
// Handle new application sessions
server.adapter.onConnection(context => new app_1.default(context));
//# sourceMappingURL=server.js.map