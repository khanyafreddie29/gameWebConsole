// defines player data, validation rules and auto-saving of timestamps and high score updates

import mongoose from 'mongoose';

// defining the player schema
const playerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true,
        //required - must have a value
        unique: true,
        //no repeats
        trim: true,
        minlength: 3,
        maxlength: 20
    },

    score: {
        type: Number,
        default: 0
        // default - if none, beginning
    },

    highScore: {
        type: Number,
        default: 0
    },

    position: {
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        }
        // position on map
    },

    health: {
        type: Number,
        default: 100,
        min: 0,
        max: 100
    },

    level:{
        type: Number,
        default: 1
    },

    powerUps: [{
        type: String,
        enum: ['specialPower', 'speedBoost', 'HealthPack', 'DoubleScore']
    }],

    gamesPlayed: {
        type: Number,
        default: 0
        // trackks total games played
    },

    totalPlayTime: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
        // sets to the current date/time
    },

    lastPlayed: {
        type: Date,
        default: Date.now
    }
});

// playerSchema.pre('save', function(next) {
//     try{
//         this.lastPlayed = new Date();  // Set to current time
//         return next();  // Continue with save operation
//     } catch(error){
//        return next(error)
//     }
// });

playerSchema.pre('save', async function() {
  this.lastPlayed = new Date();
  // No next() needed for async functions in Mongoose 6+
});

// updating players' last played timestamp before saving the game
playerSchema.methods.updateHighScore = function() {
    if (this.score > this.highScore){
        this.highScore = this.score
        // updates if current score is higher
    }
    return this.save()
}

// adding a powerup
playerSchema.methods.addPowerUp = function(powerUp){
    if (!this.powerUps.includes(powerUp)){
        this.powerUps.push(powerUp)
    }
    return this.save()
};

// removing a power-up
playerSchema.methods.removePowerUp = function(powerUp){
    this.powerUps = this.powerUps.filter(p => p !== powerUp)
    return this.save()
}

const Player = mongoose.model(`Player`, playerSchema)

export default Player;