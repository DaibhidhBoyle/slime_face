import * as info from './info.js'
import * as buttons from './buttons.js'

boot();

function boot(){
  info.infomaticsBoot();
  buttons.buttonsBoot();
}

// <g id = "fade" >
//   <animate attributeName="opacity" begin="enable" from="0" to="0.6" dur="0.2" final="keep"/>
//   <animate attributeName="opacity" begin="enable+0.3" from="0.6" to="0" dur="0.2" final="keep"/>
//   <image href="images/sundry/exclaimation_1.png" width="16%" height="20%" x="95" y="155" />
// </g>

// <g id = "fade" >
//   <animate attributeName="opacity" begin="enable" from="0" to="0.6" dur="0.2" final="keep"/>
//   <animate attributeName="opacity" begin="enable+0.3" from="0.6" to="0" dur="0.2" final="keep"/>
//   <image href="images/sundry/exclaimation_1.png" width="16%" height="20%" x="95" y="155" opacity="0"/>
// </g>
