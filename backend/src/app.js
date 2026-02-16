import express from 'express';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes.js';

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Documentation
app.get('/', (req, res) => {
  res.json({ 
    message: '🎮 ROYALGAME API Server', 
    version: '1.0.0',
    endpoints: {
      getState: 'GET /api/game/state',
      registerPlayer: 'POST /api/game/player',
      moveUp: 'POST /api/game/move/up',
      moveDown: 'POST /api/game/move/down',
      moveLeft: 'POST /api/game/move/left',
      moveRight: 'POST /api/game/move/right',
      dash: 'POST /api/game/action/dash',
      attack: 'POST /api/game/action/attack',
      aim: 'POST /api/game/action/aim',
      combo: 'POST /api/game/action/combo',
      power: 'POST /api/game/action/power',
      reset: 'POST /api/game/reset',
      health: 'GET /api/game/health'
    }
  });
});

// Game API routes
app.use('/api/game', gameRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;