// Game State Model
class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.playerName = '';
    this.score = 0;
    this.position = { x: 0, y: 0 };
    this.powerUps = [];
    this.health = 100;
    this.level = 1;
  }

  // Getters
  getState() {
    return {
      playerName: this.playerName,
      score: this.score,
      position: { ...this.position },
      powerUps: [...this.powerUps],
      health: this.health,
      level: this.level
    };
  }

  // Setters
  registerPlayer(name) {
    this.playerName = name.trim();
    this.resetGameData();
    return this.getState();
  }

  resetGameData() {
    this.score = 0;
    this.position = { x: 0, y: 0 };
    this.powerUps = [];
    this.health = 100;
    this.level = 1;
  }

  // Movement methods
  moveUp() {
    this.position.y -= 1;
    this.score += 5;
    return { position: this.position, score: this.score };
  }

  moveDown() {
    this.position.y += 1;
    this.score += 5;
    return { position: this.position, score: this.score };
  }

  moveLeft() {
    this.position.x -= 1;
    this.score += 5;
    return { position: this.position, score: this.score };
  }

  moveRight() {
    this.position.x += 1;
    this.score += 5;
    return { position: this.position, score: this.score };
  }

  // Action methods
  dash() {
    this.position.x += 2;
    this.score += 15;
    return { position: this.position, score: this.score };
  }

  attack() {
    this.score += 25;
    return { score: this.score };
  }

  aim() {
    this.score += 10;
    return { score: this.score };
  }

  combo() {
    this.score += 60;
    this.health = Math.min(100, this.health + 15);
    return { score: this.score, health: this.health };
  }

  powerUp() {
    this.powerUps.push('special_power');
    this.score += 40;
    this.level += 1;
    return { 
      score: this.score, 
      level: this.level, 
      powerUps: [...this.powerUps] 
    };
  }
}

// Create singleton instance
const gameState = new GameState();
export default gameState;