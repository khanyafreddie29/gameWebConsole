// run middleware first (auth checks, validation, etc.)
// decide which controller function gets called for which request path

import express from 'express';
import {
  getGameState,
  registerPlayer,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  dashAction,
  attackAction,
  aimAction,
  comboAction,
  powerAction,
  resetGame,
  healthCheck,
  getLeaderboard,
  getPlayerStats
} from '../controllers/gameController.js';

const router = express.Router();

// Game state routes
router.get('/state', getGameState);
router.post('/player', registerPlayer);
router.post('/reset', resetGame);
router.get('/leaderboard', getLeaderboard);
router.get('/player/:playerId', getPlayerStats);

// Movement routes
router.post('/move/up', moveUp);
router.post('/move/down', moveDown);
router.post('/move/left', moveLeft);
router.post('/move/right', moveRight);

// Action routes
router.post('/action/dash', dashAction);
router.post('/action/attack', attackAction);
router.post('/action/aim', aimAction);
router.post('/action/combo', comboAction);
router.post('/action/power', powerAction);

// Health check
router.get('/health', healthCheck);

export default router;