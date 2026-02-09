<script setup>
import Console from './components/Console.vue'
</script>

<template>
  <Console/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap');

html, body{
  overflow: hidden;
}

*{
  font-family: Jost, Arial, Helvetica, sans-serif;
}

body{
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #9d67ea 0%, #1a1a2e 100%);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* ===== LOADING SCREEN ===== */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
}

.loading-container {
  text-align: center;
  max-width: 600px;
  padding: 40px;
  animation: fadeIn 0.8s ease-out;
}

/* Animated Logo */
.loading-logo {
  margin-bottom: 30px;
}

.crown-animation {
  position: relative;
  margin-bottom: 20px;
}

.crown-spin {
  font-size: 4rem;
  color: gold;
  animation: spin 3s linear infinite, glow 2s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
}

.crown-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulseGlow 2s ease-in-out infinite;
}

.controller-animation {
  margin-top: 20px;
}

.controller {
  display: inline-flex;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 25px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.button {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: inline-block;
}

.button.red { background: #ef4444; }
.button.blue { background: #3b82f6; }
.button.green { background: #10b981; }
.button.yellow { background: #f59e0b; }

.button.pulse {
  animation: buttonPulse 1.5s ease-in-out infinite;
  animation-delay: var(--delay);
}

/* Loading Text */
.loading-title {
  font-size: 2.5rem;
  background: linear-gradient(90deg, #9d4edd, #ff00ff, #00ffff, #9d4edd);
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradientShift 3s ease infinite;
  margin-bottom: 10px;
  font-family: Bubblegum Sans, Arial, Helvetica, sans-serif;
}

.loading-subtitle {
  color: #d8b4fe;
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.8;
  animation: fadeInOut 2s infinite;
}

/* Progress Bar */
.progress-container {
  margin: 40px 0;
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #9d4edd, #7c3aed);
  border-radius: 3px;
  width: 0%;
  animation: progressLoad 2s ease-in-out infinite;
}

.progress-text {
  color: #a78bfa;
  font-size: 0.9rem;
  font-family: Bubblegum Sans, Arial, Helvetica, sans-serif;
}

/* Loading Tips */
.loading-tips {
  margin: 30px 0;
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 10px;
  border: 4px solid #9d4edd;
}

.tip {
  color: #c4b5fd;
  margin: 8px 0;
  font-size: 0.95rem;
  opacity: 0.8;
}

.tip:first-child {
  opacity: 1;
  color: #d8b4fe;
  font-weight: 500;
}

/* Version Info */
.version-info {
  color: #6b7280;
  font-size: 0.8rem;
  margin-top: 30px;
  font-family: Bubblegum Sans, Arial, Helvetica, sans-serif;
  opacity: 0.6;
}

/* ===== ANIMATIONS ===== */
@keyframes spin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

@keyframes glow {
  0% { filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5)); }
  100% { filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.8)); }
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes buttonPulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.3); opacity: 1; }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes progressLoad {
  0% { width: 0%; left: 0; }
  50% { width: 70%; }
  100% { width: 100%; left: 100%; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.box {
  border: 3px solid hsla(281, 80%, 15%, 0.849);
  border-radius: 25px;
  height: 720px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px; /* Added spacing between children */
  width: 600px;
  background-color: #8e26ef;
  font-family: Bubblegum Sans, Arial, Helvetica, sans-serif ;
  box-shadow: 
    0 0 40px rgba(157, 78, 221, 0.5),
}

.display1 {
  border: 2px solid black;
  border-radius: 10px;
  height: 215px;
  width: 450px;
  padding: 20px;
  border: inset;
  background-color: #e0e0e0;
  
}

.display1 h3{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Status Header - status indicator next to Game Status */
.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.game-status-title {
  margin: 0;
  font-size: 1.1rem;
  color: #6d28d9;
}

/* Status Indicator */
.status-indicator {
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  background: #ef4444;
  color: white;
  letter-spacing: 1px;
}

.status-indicator.active {
  background: #10b981;
}

/* Border bottom */
.header-border {
  height: 2px;
  background: #d8b4fe;
  border-radius: 1px;
  margin-bottom: 15px;
}

 /* .status-indicator {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  background: #ef4444;
  color: white;
  text-align: center;
  max-width: 100px;
  justify-content: center;
}

.status-indicator.active {
  background: #10b981;
} */

.display2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid;
  border-radius: 10px;
  height: 100px;
  width: 420px;
  padding: 10px;
  border: inset;
  background-color: #e0e0e0;
}

.controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3,1fr);
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 300px;
  margin: 10px 0;
}

.controls button {
  padding: 3px 10px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  font-weight: bold;
  font-size: .7rem;
  min-width: 40px;
  border-radius: 200px;
  box-shadow: 5px 5px 3px #18042e;
}

.controls button:hover {
  background-color: #e0e0e0;
  transform: translateY(-3px) scale(1.05);
  border-color: #9d4edd;
  box-shadow: 0 10px 25px rgba(157, 78, 221, 0.4);
}

.controls button:active {
  background-color: #d0d0d0;
}

.display2 button{
  margin-top: 20px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #D8B4FE;
  cursor: pointer;
  font-weight: bold;
  font-size: .7rem;
  border-radius: 100px;
  width: 110px;
}

.display2 button:hover{
  transform: translateY(-5px);
  border-color: #9d4edd;
  box-shadow: 
    0 8px 10px rgba(28, 7, 46, 0.638);
}

.display2 input{
  border: none;
  border-bottom: 1px solid rgb(108, 37, 171);
  padding: 5px;
  width: 270px;
}

.display2 input:focus{
  border-radius: 10px;
  outline: none;
  border-color: #9d4edd;
  box-shadow: 0 0 0 3px rgba(157, 78, 221, 0.2);
}

.display2 h3{
  color: #4a5568;
}

.crown {
  color: gold;
}

/* Button group - side by side */
.button-group {
  display: flex;
  gap: 15px;
  justify-content: center;
  width: 50px;
  max-width: 400px;
}

.action-btn {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 120px;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* Enter button */
.enter-btn {
  background: linear-gradient(135deg, #9d4edd 0%, #7c3aed 100%);
  color: white;
}

.enter-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #8b3ed1 0%, #6d28d9 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(157, 78, 221, 0.4);
}

/* Reset button */
.reset-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.reset-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(239, 68, 68, 0.4);
}

/* Hint text */
.hint {
  margin-top: 10px;
  color: #10b981;
  font-weight: 500;
  text-align: center;
  padding: 8px 15px;
  background: #d1fae5;
  border-radius: 6px;
  border: 1px solid #a7f3d0;
}

</style>