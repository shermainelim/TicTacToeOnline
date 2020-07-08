import express from 'express';
import cors from 'cors';

//Controllers
import NewGame from './controllers/newGame';
import JoinGame from './controllers/joinGame';

//Services
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

/**
 * @route /new
 * @method POST
 * @description creates a new game in the database and returns the game id as response.
 */
app.post('/new', NewGame);
app.post('/join', JoinGame);

export default app;
