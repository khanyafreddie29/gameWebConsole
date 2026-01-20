<script setup>
// Component logic goes here
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import { faArrowUp, faArrowDown, faArrowRight, faArrowLeft, faFistRaised, faBullseye, faCookieBite, faShoePrints, faCrown } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <main class="box">
    <h3>ROYALGAME CONSOLE <FontAwesomeIcon :icon="faCrown" class="crown"/></h3>
    <div class="display1">
      <!-- Content for first display -->
    </div>

    <div class="controls">
      <button>
        <FontAwesomeIcon :icon="faArrowUp"/>
        <span>up</span>
      </button>

      <button>
        <FontAwesomeIcon :icon="faArrowDown"/>
        <span>down</span>
      </button>

      <button>
        <FontAwesomeIcon :icon="faArrowLeft"/>
        <span>left</span>
      </button>

      <button>
        <FontAwesomeIcon :icon="faArrowRight"/>
        <span>right</span>
      </button>

      <button>
        <FontAwesomeIcon :icon="faShoePrints"/>
        <span>dash</span>
      </button>

      <button>
        <FontAwesomeIcon :icon="faFistRaised"/>
        <span>attack</span>
      </button>

      <button>
        <FontAwesomeIcon :icon="faBullseye"/>
        <span>aim</span>
      </button>

      <button>
        <FontAwesomeIcon :icon="faFistRaised" class="myIcon3"/> +
        <FontAwesomeIcon :icon="faBullseye" class="myIcon"/>
        <span>combo</span>
      </button>

      <button>
        <FontAwesomeIcon :icon="faCookieBite" class="myIcon"/>
        <span>power</span>
      </button>
    </div>

    <div class="display2">
      <!-- Content for second display -->
       <h2>Player SetUp <FontAwesomeIcon :icon="faCrown" class="crown"/></h2>
        <input type="text" name="gamername" id="GamerName" placeholder="enter your name player:">
       <button>enter</button>
    </div>
  </main>
</template>

<style scoped>

</style>