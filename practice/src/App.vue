<script setup>
import Console from './components/Console.vue'
</script>

<template>
  <Console/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap');

*{
  font-family: Jost, Arial, Helvetica, sans-serif;
}
body{
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6a14e1 0%, #1a1a2e 100%);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.box {
  border: 3px solid hsla(281, 80%, 15%, 0.849);
  border-radius: 20px;
  height: 670px;
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
  height: 200px;
  width: 450px;
  border: inset;
  background-color: #e0e0e0;
}

.display2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 10px;
  height: 160px;
  width: 420px;
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
}

.controls button {
  padding: 3px 10px;
  border: none;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  font-weight: bold;
  font-size: .7rem;
  min-width: 40px;
  border-radius: 180px;
  box-shadow: 5px 5px 5px #D8B4FE;
  
}

.controls button:hover {
  background-color: #e0e0e0;
  transform: translateY(-5px);
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
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  width: 270px;
}

.crown {
  color: gold;
}
</style>