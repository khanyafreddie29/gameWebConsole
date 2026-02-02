// Handles incoming requests and sends responses.
// basically request logic

import gameState from '../models/gameModels.js';

// Get current game state
const getGameState = (req, res) => {
  console.log('📊 GET Game State');
  res.json(gameState.getState());
};

// Register player
const registerPlayer = (req, res) => {
  const { name } = req.body;
  console.log('🎮 Register Player:', name);
  
  if (name && name.trim() !== '') {
    const state = gameState.registerPlayer(name);
    res.json({ 
      success: true, 
      message: `Player ${name} registered!`, 
      state: state 
    });
  } else {
    res.status(400).json({ 
      success: false, 
      message: 'Player name is required' 
    });
  }
};

// Movement controllers
const moveUp = (req, res) => {
  const result = gameState.moveUp();
  console.log('⬆️ Move Up:', result.position);
  
  res.json({ 
    success: true, 
    message: 'Moved up! +5 points', 
    ...result,
    action: 'move_up'
  });
};

const moveDown = (req, res) => {
  const result = gameState.moveDown();
  console.log('⬇️ Move Down:', result.position);
  
  res.json({ 
    success: true, 
    message: 'Moved down! +5 points', 
    ...result,
    action: 'move_down'
  });
};

const moveLeft = (req, res) => {
  const result = gameState.moveLeft();
  console.log('⬅️ Move Left:', result.position);
  
  res.json({ 
    success: true, 
    message: 'Moved left! +5 points', 
    ...result,
    action: 'move_left'
  });
};

const moveRight = (req, res) => {
  const result = gameState.moveRight();
  console.log('➡️ Move Right:', result.position);
  
  res.json({ 
    success: true, 
    message: 'Moved right! +5 points', 
    ...result,
    action: 'move_right'
  });
};

// Action controllers
const dashAction = (req, res) => {
  const result = gameState.dash();
  console.log('💨 Dash Action:', result.position);
  
  res.json({ 
    success: true, 
    message: 'Dashed forward! +15 points', 
    ...result,
    action: 'dash'
  });
};

const attackAction = (req, res) => {
  const result = gameState.attack();
  console.log('👊 Attack Action. Score:', result.score);
  
  res.json({ 
    success: true, 
    message: 'Attack executed! +25 points', 
    ...result,
    action: 'attack'
  });
};

const aimAction = (req, res) => {
  const result = gameState.aim();
  console.log('🎯 Aim Action. Score:', result.score);
  
  res.json({ 
    success: true, 
    message: 'Aiming... +10 points', 
    ...result,
    action: 'aim'
  });
};

const comboAction = (req, res) => {
  const result = gameState.combo();
  console.log('💥 Combo Action. Score:', result.score, 'Health:', result.health);
  
  res.json({ 
    success: true, 
    message: 'Combo attack! +60 points, +15 health', 
    ...result,
    action: 'combo'
  });
};

const powerAction = (req, res) => {
  const result = gameState.powerUp();
  console.log('⚡ Power Action. Level:', result.level, 'Power-ups:', result.powerUps);
  
  res.json({ 
    success: true, 
    message: 'Power up acquired! Level up! +40 points', 
    ...result,
    action: 'power'
  });
};

// Reset game
const resetGame = (req, res) => {
  console.log('🔄 Resetting game...');
  gameState.reset();
  
  res.json({ 
    success: true, 
    message: 'Game reset successfully!', 
    state: gameState.getState()
  });
};

// Health check
const healthCheck = (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    game: 'ROYALGAME Backend',
    version: '1.0.0'
  });
};

// Add these new controller functions:

// Get leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await gameState.getLeaderboard();
    res.json({
      success: true,
      leaderboard,
      count: leaderboard.length
    });
  } catch (error) {
    console.error('❌ Error getting leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leaderboard'
    });
  }
};

// Get player stats
const getPlayerStats = async (req, res) => {
  const { playerId } = req.params;
  
  try {
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'Player not found'
      });
    }
    
    res.json({
      success: true,
      player: {
        playerName: player.playerName,
        score: player.score,
        highScore: player.highScore,
        level: player.level,
        gamesPlayed: player.gamesPlayed,
        totalPlayTime: player.totalPlayTime,
        createdAt: player.createdAt,
        lastPlayed: player.lastPlayed
      }
    });
  } catch (error) {
    console.error('❌ Error getting player stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch player stats'
    });
  }
};

export {
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
}