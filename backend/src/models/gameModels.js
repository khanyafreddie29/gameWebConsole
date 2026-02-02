// Stores and manages the game data.
// database 

// Game State Model
// class GameState {
//   constructor() {
//     this.reset(); 
//     // game state to start afresh
//   }

//   reset() {
//     this.playerName = "";
//     // beginning of game, no player yet
//     this.score = 0;
//     // game score starts at 0 
//     this.position = { x: 0, y: 0 };
//     // mapping, position on map
//     this.powerUps = [];
//     // character level up, empty because no character 
//     this.health = 100;
//     // default health setup
//     this.level = 1;
//     // default character level
//   }

//   // Getters
//   getState() {
//     return {
//       playerName: this.playerName,
//       score: this.score,
//       position: { ...this.position },
//       powerUps: [...this.powerUps],
//       health: this.health,
//       level: this.level
//     };
//   }

//   // Setters
//   registerPlayer(name) {
//     this.playerName = name.trim();
//     this.resetGameData();
//     return this.getState();
//   }

//   resetGameData() {
//     this.score = 0;
//     this.position = { x: 0, y: 0 };
//     this.powerUps = [];
//     this.health = 100;
//     this.level = 1;
//   }

//   // Movement methods
//   moveUp() {
//     this.position.y -= 1;
//     this.score += 5;
//     return { position: this.position, score: this.score };
//   }

//   moveDown() {
//     this.position.y += 1;
//     this.score += 5;
//     return { position: this.position, score: this.score };
//   }

//   moveLeft() {
//     this.position.x -= 1;
//     this.score += 5;
//     return { position: this.position, score: this.score };
//   }

//   moveRight() {
//     this.position.x += 1;
//     this.score += 5;
//     return { position: this.position, score: this.score };
//   }

//   // Action methods
//   dash() {
//     this.position.x += 2;
//     this.score += 15;
//     return { position: this.position, score: this.score };
//   }

//   attack() {
//     this.score += 25;
//     return { score: this.score };
//   }

//   aim() {
//     this.score += 10;
//     return { score: this.score };
//   }

//   combo() {
//     this.score += 60;
//     this.health = Math.min(100, this.health + 15);
//     // player with default health pts and combo adds 60 pts and 15+ health pts
//     return { score: this.score, health: this.health };
//   }

//   powerUp() {
//     this.powerUps.push('special_power');
//     this.score += 40;
//     this.level += 1;
//     return { 
//       score: this.score, 
//       level: this.level, 
//       powerUps: [...this.powerUps] 
//     };
//   }
// }

// // Create singleton instance
// const gameState = new GameState();
// export default gameState;

import Player from './Player.js';

class GameState{
  constructor(){
    this.reset()
  }

  reset(){
    this.playerName = ``;
    this.score = 0;
    this.position = {x: 0, y: 0};
    this.powerUps = [];
    this.health = 100;
    this.level = 1;
    this.playerId = null
  }

  // get state from the database
  async getState(){
    if (!this.playerId){
      return this.getLocalState()
    }
    try{
      const player = await Player.findById(this.playerId)
      if (player){
        return {
          playerName: player.playerName,
          score: player.score,
          position: player.position,
          powerUps: player.powerUps,
          health: player.health,
          level: player.level,
          highScore: player.highScore,
          gamesPlayed: player.gamesPlayed,
          playerid: player._id
        }
      }
    } catch (error){
      console.error(`Errror fetching player from DB:`, error)
    }
    return this.getLocalState();
  }
  getLocalState(){
    return {
      playerName: this.playerName,
      score: this.score,
      position: this.position,
      powerUps: this.powerUps,
      health: this.health,
      level: this.level,
      highScore: 0,
      gamesPlayed: 0,
      playerId: this.playerId
    }
  }
  //  register player in the db
  async registerPlayer(name){
    try{
      let player = await Player.findOne({playerName: name});

      if (!player){
        // create a new player if not in the db
        player = new Player({
          playerName: name,
          score: 0,
          position: {x: 0, y: 0},
          health: 100,
          level: 1,
          powerUps: [],
          gamesplayed: 0
        });
        await player.save();
        console.log(`new player created in the database:`, name)
      } else {
        console.log(`existing player loaded from database:`, name)
      }

      // updating the local state
      this.playerName = player.playerName;
      this.score = player.score;
      this.position = player.position;
      this.health = player.health;
      this.level = player.level;
      this.powerUps = player.powerUps;
      this.playerId = player._id

      return this.getLocalState()
    }catch(error){
      console.error(`error registering player in the database:`, error)
      throw error
    }
  }

  // save game state to the database
  async saveGameState(){
    if (!this.playerId)return;

    try{
      await Player.findByIdAndUpdate(this.playerId, {
        score: this.score,
         position: this.position,
        health: this.health,
        level: this.level,
        powerUps: this.powerUps,
        $inc: {gamesPlayed: 1}
      })
      console.log(`game saved to the databased for:`, this.playerName)
    }catch(error){
      console.error(`error saving game to the database`, error)
    }
  }

  // Movement methods (update database too)
  async moveUp() {
    this.position.y -= 1;
    this.score += 5;
    await this.saveToDatabase();
    return { position: this.position, score: this.score };
  }

  async moveDown() {
    this.position.y += 1;
    this.score += 5;
    await this.saveToDatabase();
    return { position: this.position, score: this.score };
  }

  async moveLeft() {
    this.position.x -= 1;
    this.score += 5;
    await this.saveToDatabase();
    return { position: this.position, score: this.score };
  }

  async moveRight() {
    this.position.x += 1;
    this.score += 5;
    await this.saveToDatabase();
    return { position: this.position, score: this.score };
  }

  // Action methods
  async dash() {
    this.position.x += 2;
    this.score += 15;
    await this.saveToDatabase();
    return { position: this.position, score: this.score };
  }

  async attack() {
    this.score += 25;
    await this.saveToDatabase();
    return { score: this.score };
  }

  async aim() {
    this.score += 10;
    await this.saveToDatabase();
    return { score: this.score };
  }

  async combo() {
    this.score += 60;
    this.health = Math.min(100, this.health + 15);
    await this.saveToDatabase();
    return { score: this.score, health: this.health };
  }

   async powerUp() {
    this.powerUps.push('special_power');
    this.score += 40;
    this.level += 1;
    await this.saveToDatabase();
    return { 
      score: this.score, 
      level: this.level, 
      powerUps: [...this.powerUps] 
    };
  }

  // Reset game (keep player in database)
  async resetGame() {
    if (this.playerId) {
      try {
        await Player.findByIdAndUpdate(this.playerId, {
          score: 0,
          position: { x: 0, y: 0 },
          health: 100,
          level: 1,
          powerUps: []
        });
      } catch (error) {
        console.error('❌ Error resetting player in DB:', error);
      }
    }
    
    this.reset();
    return this.getLocalState();
  }

  // Get leaderboard
  static async getLeaderboard(limit = 10) {
    try {
      return await Player.find()
        .sort({ highScore: -1, score: -1 })
        .limit(limit)
        .select('playerName score highScore level gamesPlayed');
    } catch (error) {
      console.error('❌ Error fetching leaderboard:', error);
      return [];
    }
  }
}

const gameState = new GameState()
export default gameState;