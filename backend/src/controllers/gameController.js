// Handles incoming requests and sends responses.
// basically request logic

import gameState from '../models/gameModels.js';

// Get current game state
const getGameState = async (req, res) => {
  console.log('📊 GET Game State');
  try {
    const state = await gameState.getState();
    res.json(state);  // Return the state directly (frontend expects this)
  } catch (error) {
    console.error('Error getting game state:', error);
    res.status(500).json({ error: 'Failed to get game state' });
  }
};

// Register player
const registerPlayer = async (req,res) => {
  const {name} = req.body;
  console.log(`Register Player:`, name)

  if (name && name.trim() !== ''){
    try{
      const state = await gameState.registerPlayer(name);
      res.json({
        success: true,
        message: `Player ${name} registered!`,
        state: state
      });
    } catch (error){
      console.error(`Error registering player:`, error);
      res.status(500).json({
        success: false,
        message: error.message || `Error rgistering player`
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: `Player name is required`
    })
  }
};

// Movement controllers
const moveUp = async (req, res) => {
  try{
    const result = await gameState.moveUp();
  console.log('move up:', result.position);
  
  res.json({ 
    success: true, 
    message: 'moved up! +5 points', 
    ...result,
    action: 'move_up'
  });
}catch (error){
  res.status(500).json({success: false, message: error.message})
}
}


const moveDown = async (req, res) => {
  try {
    const result = await gameState.moveDown();
    console.log('move down:', result.position);

    res.json({
      success: true,
      message: 'moved down! +5 points',
      ...result,
      action: 'move_down'
    });
  } catch(error){
    res.status(500).json({success: false, message: error.message})
  }
}

const moveLeft = async (req, res) => {
  try{
    const result = await gameState.moveLeft();
    console.log('move left:', result.position)

    res.json({
      success: true,
      message: 'moved left! +5 points',
      ...result,
      action: 'moved_left'
    });
  } catch(error){
    res.status(500).json({success: false, message: error.message})
  }
}

const moveRight = async (req, res) => {
  try{
    const result = await gameState.moveRight();
    console.log('move right:', result.position)

    res.json({
      success: true,
      message: 'moved right! +5 points',
      ...result,
      action: 'moved_right'
    });
  } catch(error){
    res.status(500).json({success: false, message: error.message})
  }
}

// Action controllers
const dashAction = async (req, res) => {
  try{
    const result = await gameState.dash();
      console.log('dash action:', result.position);

      res.json({
        success: true,
        message: 'dashed forward! +15 points',
        ...result,
        action: 'dash'
      })
  } catch (error){
    res.status(500).json({success:false, message: error.message})
  }
}

const attackAction = async (req, res) => {
  try{
    const result = await gameState.attack();
    console.log('attack action. score:', result.score);

    res.json({
      success: true,
      message: 'attack executed! +25 points',
      ...result,
      action: 'attack'
    })
  } catch (error){
    res.status(500).json({success:false, message: error.message})
  }
}

const aimAction = async (req,res) => {
  try{
    const result = await gameState.aim()
    console.log('aim action. score:', result.score)

    res.json({
      success: true,
      message: 'aiming... +10 points',
      ...result,
      action: 'aim'
    })
  } catch (error){
    res.status(500).json({success: false, message: error.message})
  }
}

const comboAction = async (req, res) => {
  try{
    const result = await gameState.combo();
    console.log('Combo action. score:', result.score, 'health:', result.health);

    res.json({
      success: true,
      message: 'combo attack! +60 points, +15 health pts',
      ...result,
      action: 'combo'
    })
  } catch (error){
    res.status(500).json({success: false, message: error.message})
  }
}

const powerAction = async (req,res) => {
  try{
    const result = await gameState.powerUp();
    console.log('power action. level:', result.level, 'power-ups:', result.powerUps);

    res.json({
      success: true,
      message: 'power up acquired! level up ! +40 points',
      ...result,
      action: 'power'
    })
  } catch(error){
    res.status(500).json({success: false, message: error.message})
  }
}
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