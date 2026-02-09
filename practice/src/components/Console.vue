<script setup>
// Component logic goes here
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import { faArrowUp, faArrowDown, faArrowRight, faArrowLeft, faFistRaised, faBullseye, faCookieBite, faShoePrints, faCrown, faUser } from '@fortawesome/free-solid-svg-icons'
// importing game state variable
import { ref, onMounted } from 'vue'

// step 2 - connecting the url
const API_URL = 'http://localhost:3001/api/game'
// connects to backend server where all apis are called.

// test data
// const gameState = ref({
//   playerName: "TEST PLAYER",
//   score: 100,
//   position: {x: 5, y: 7},
//   powerUps: ['special_power'],
//   health: 100,
//   level: 5
// });

// step 3 - game state variable
const gameState = ref({
  playerName: '',  // Change back to empty
  score: 0,
  position: { x: 0, y: 0 },
  powerUps: [],
  health: 100,
  level: 1
});

console.log("API_URL:", API_URL);
console.log("gameState:", gameState.value);

// controls the full loading screen that shows when the app starts
// when true, displays th animation and hides the game console
const isLoadingScreen = ref(true);

// Update onMounted to hide loading after fetch
onMounted(async () => {
  console.log("Console component mounted");
  await fetchGameState();
  // Hide loading screen after 8 seconds
  setTimeout(() => {
    isLoadingScreen.value = false;
    // when false, hides the loading screen
    // shows the actual game console
  }, 5000);
});

const message = ref(`Welcome to ROYALGAME! Enter your player name to begin.`)
// step 4 - sets a default welcome message

const playerName = ref("")
const isLoading = ref(false)
// isLoading controls the buttons loading states during game actions
// when false, enables all buttons

// step 6 - create a fetch function to get the game state from backend
const fetchGameState = async() => {
  try{
    console.log("fetching game state from backend..");
    const response = await fetch(`${API_URL}/state`)
    // calls the backend script
    const data = await response.json()
    //converts the response into json
    gameState.value = data
    // updates the local game state(gameState.value) with the backend data(data)
    console.log(`Game State updated:`, data)
  } catch (error){
    console.error(`Error fetching game state:`, error)
    message.value = `Cannot connect to game server.`
  }
}

onMounted(() => {
  console.log("Console component mounted");
  fetchGameState()
})

// step 9 - register player function
const registerPlayer = async() => {
  // check if the input is empty - when the server is offline
  if (!playerName.value.trim()) {
    message.value = `Error. Please enter a name.`;
    return;
  }
  isLoading.value = true;
  // when true, disables all game buttons
  // prevents multiple clicks when action processes
  // before click, enabled
  // during click, disabled during api call
  // after click, enabled
  message.value = `Registering player...`;
  // console.log("Registering player: ", playerName.value)
  //playerName.value is the value of playerName
  try{
    //send a request to backend
    const response = await fetch(`${API_URL}/player`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: playerName.value})
    })
    const data = await response.json();
    // the data from the backend will appear as the response
    if (data.success){
      // update local state with backend response (game state in frontend)
      gameState.value = data.state;
      message.value = `${data.message}`;
      playerName.value = "";
      console.log(`Player registered successfully: `, data)
    } else{
      // show error message from backend
      message.value = `${data.message}`;
      console.log(`Resgistration failed: `, data)
    }
  } catch (error){
    console.error(`Error registering player: `, error)
    message.value = `Cannot connect to server. Backend is not running.`
  } finally {
    isLoading.value = false;
  }
}

const handleAction = async(action) => {
  // dont allow actions if no player is registered
  if (!gameState.value.playerName){
    message.value = `Please register a player first.`;
    return;
  }

  isLoading.value = true;
  console.log(`Performing action: ${action}`)

  // map button actions to api endpoints
  const endpoints = {
    up: "move/up",
    down: "move/down",
    left: "move/left",
    right: "move/right",
    dash: "action/dash",
    attack: "action/attack",
    aim: "action/aim",
    combo: "action/combo",
    power: "action/power"
  }
  // verifying if the action is valid
  if (!endpoints[action]){
    console.error(`Unknown action: ${action}`);
    message.value = `Unknown action ${action}`;
    isLoading.value = false;
    return;
  }
  try{
    // calling the backend api
    const response = await fetch(`${API_URL}/${endpoints[action]}`, {
      method: "POST",
      headers: { 'Content-Type' : 'application/json'}
    })
    const data = await response.json()

    if (data.success){
      // update game state with the backend response
      await fetchGameState();
      message.value = `${data.message}`;
      console.log(`Action successful: ${action}`, data)
      // based on the btns: attack/dash
    } else{
      message.value = `${data.message}`;
      console.error(`Action failed: ${action}`, data)
    }
  } catch (error){
    console.error(`Error performing ${action}:`, error)
    message.value = `Action failed - check connection`
  } finally {
    isLoading.value = false
  }
}

const resetGame = async() => {
  // confirmation of game reset, if button clicked
  if (!confirm(`Are you sure you want to reset the game?.`)) {
    return;
  }
  try{
    // Try from the backend
    const response = await fetch(`${API_URL}/reset`, {
      method: "POST",
      headers: {"Content-Type" : "application/json"}
    })

    const data = await response.json()

    if (data.success){
      gameState.value = data.state;
      message.value = `Game reset successfully!`
    }
  }catch (error){
    console.error("Error resetting game:", error);
    message.value = `Failed to reset game`
  }
  finally{
    console.log(`Game has been reset successfully.`)
  }
}
</script>


<template>
    <!-- Loading Screen -->
  <div v-if="isLoadingScreen" class="loading-screen">
    <div class="loading-container">
      <!-- Animated Logo -->
      <div class="loading-logo">
        <div class="controller-animation">
          <div class="controller">
            <span class="button red pulse" style="--delay: 0s"></span>
            <span class="button blue pulse" style="--delay: 0.2s"></span>
            <span class="button green pulse" style="--delay: 0.4s"></span>
            <span class="button yellow pulse" style="--delay: 0.6s"></span>
          </div>
        </div>
      </div>
      
      <!-- Loading Text -->
      <h1 class="loading-title">ROYALGAME CONSOLE</h1>
      <p class="loading-subtitle">Initializing Game System...</p>
      
      <!-- Progress Bar -->
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <div class="progress-text">Loading Game Assets</div>
      </div>
      
      <!-- Loading Tips -->
      <div class="loading-tips">
        <p class="tip">💡 Tip: Register your player name to begin</p>
        <p class="tip">🎮 Use all buttons for maximum score</p>
        <p class="tip">👑 Collect power-ups to level up faster</p>
      </div>
      
      <!-- Version Info -->
      <div class="version-info">&copy; 2026 Khanya Freddie | v1.0.0 | Powered by Vue.js & Express.js </div>
    </div>
  </div>

  <main v-else class="box">
    <h3>ROYALGAME CONSOLE <FontAwesomeIcon :icon="faCrown" class="crown"/></h3>
        <div class="display1">
      <!-- ONLY THESE 4 LINES CHANGED -->
      <div class="status-header">
        <h3 class="game-status-title">🎮Game Status:</h3>
        <div class="status-indicator" :class="{ 'active': gameState.playerName }">
          {{ gameState.playerName ? 'ACTIVE' : 'INACTIVE' }}
        </div>
      </div>
      <div class="header-border"></div>
  <!-- END OF CHANGES -->

  <p class="message" style="text-align: center;">{{ message }}</p>
  
  <div v-if="gameState.playerName" class="game-info">
    <p><strong>Player:</strong> {{ gameState.playerName }}</p>
    <p><strong>Score:</strong> {{ gameState.score }} points</p>
    <p><strong>Position:</strong> ({{ gameState.position.x }}, {{ gameState.position.y }})</p>
    <p><strong>Health:</strong> {{ gameState.health }}%</p>
    <p><strong>Level:</strong> {{ gameState.level }}</p>
    <p><strong>Power-ups:</strong> {{ gameState.powerUps.length }}</p>
  </div>
  
  <div v-else class="no-player">
    <p style="text-align: center;">No player registered yet. Enter your name below!</p>
  </div>
</div>

    <div class="controls">
      <button @click="handleAction('up')" :disabled="isLoading || !gameState.playerName">
        <FontAwesomeIcon :icon="faArrowUp"/>
        <span>up</span>
      </button>

      <!-- handleAction() controls all buttons together -->

      <button @click="handleAction('down')" :disabled="isLoading || !gameState.playerName">
        <FontAwesomeIcon :icon="faArrowDown"/>
        <span>down</span>
      </button>

      <button @click="handleAction('left')" :disabled="isLoading || !gameState.playerName">
        <FontAwesomeIcon :icon="faArrowLeft"/>
        <span>left</span>
      </button>

      <button @click="handleAction('right')" :disabled="isLoading || !gameState.playerName">
        <FontAwesomeIcon :icon="faArrowRight"/>
        <span>right</span>
      </button>

      <button @click="handleAction('dash')" :disabled="isLoading || !gameState.playerName">
        <FontAwesomeIcon :icon="faShoePrints"/>
        <span>dash</span>
      </button>

      <button @click="handleAction('attack')" :disabled="isLoading || !gameState.playerName">
        <FontAwesomeIcon :icon="faFistRaised"/>
        <span>attack</span>
      </button>

      <button @click="handleAction('aim')" :disabled="isLoading || !gameState.playerName">
        <FontAwesomeIcon :icon="faBullseye"/>
        <span>aim</span>
      </button>

      <button @click="handleAction('combo')" :disabled="isLoading || !gameState.playerName">
        <FontAwesomeIcon :icon="faFistRaised" class="myIcon3"/> +
        <FontAwesomeIcon :icon="faBullseye" class="myIcon"/>
        <span>combo</span>
      </button>

      <button @click="handleAction('power')" :disabled="isLoading || !gameState.playerName">
        <FontAwesomeIcon :icon="faCookieBite" class="myIcon"/>
        <span>power</span>
      </button>
    </div>

   <div class="display2">
  <h3>Player Setup <FontAwesomeIcon :icon="faUser" class="crown"/></h3>
  <div class="input-group">
    <input 
      type="text" 
      v-model="playerName" 
      placeholder="enter your player name:" 
      @keyup.enter="registerPlayer"
      :disabled="isLoading"
    />
  </div>
  
  <div class="button-group">
    <button @click="registerPlayer" class="action-btn enter-btn" :disabled="isLoading">
      <FontAwesomeIcon :icon="faCrown" v-if="!isLoading"/>
      {{ isLoading ? 'PROCESSING...' : 'START GAME' }}
    </button>
    
    <button @click="resetGame" class="action-btn reset-btn" :disabled="isLoading || !gameState.playerName">
      <FontAwesomeIcon :icon="faCrown" v-if="gameState.playerName && !isLoading"/>
      {{ isLoading ? 'PROCESSING...' : 'RESET GAME' }}
    </button>
  </div>
</div>
  </main>
</template>

<style>
.message {
  color: #4a5568;
  font-weight: 500;
  margin: 10px 0;
  min-height: 24px;
}

.game-info {
  margin-top: 15px;
}

.game-info p {
  margin: 8px 0;
  padding: 5px;
  background: #f7fafc;
  border-radius: 10px;
  border: 2px solid #9d4edd;
  font-size: 17px;
}

.game-info strong {
  color: #4a5568;
  margin-right: 10px;
  min-width: 80px;
  font-size: 17px;
}

.game-info{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  justify-content: space-between;
  align-content: space-between;
  gap: 10px;
}

.no-player {
  color: #718096;
  font-style: italic;
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  text-align: center;
  border-radius: 50px;
}

</style>