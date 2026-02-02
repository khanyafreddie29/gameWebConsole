import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
    faArrowUp, faArrowDown, faArrowRight, faArrowLeft, faFistRaised, faBullseye, faCookieBite, faShoePrints, faCrown } from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faArrowUp, faArrowDown, faArrowRight, faArrowLeft, faFistRaised, faBullseye, faCookieBite, faShoePrints, faCrown)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
createApp(App).mount('#app')
