import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import app from './src/app.js'

dotenv.config()

const PORT = 3000

app.listen(PORT, () => (console.log(`Server is running on http://localhost:${PORT}`)))

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 ROYALGAME Backend Server Started!`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/game/state`);
  console.log('='.repeat(50));
  console.log('\n📋 Available Endpoints:');
  console.log('   GET  /              - API documentation');
  console.log('   GET  /api/game/health    - Health check');
  console.log('   GET  /api/game/state     - Get game state');
  console.log('   POST /api/game/player    - Register player');
  console.log('   POST /api/game/move/*    - Movement actions');
  console.log('   POST /api/game/action/*  - Game actions');
  console.log('   POST /api/game/reset     - Reset game');
  console.log('='.repeat(50));
});