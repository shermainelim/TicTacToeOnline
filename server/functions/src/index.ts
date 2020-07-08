import * as functions from 'firebase-functions';
import app from './server';

exports.game = functions.https.onRequest(app);
