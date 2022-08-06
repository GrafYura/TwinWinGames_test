import {Application, Container, Graphics} from './pixi.min.mjs';
import { assetsMap } from './assetsMap.js';
import { Slot } from './Slot.js';
const app = new Application({
	view: document.querySelector('#canvas'),
	width:660,
	height:330,
	backgroundColor:0x2c2c2c,
    forceCanvas:true,
 });

 assetsMap.sprites.forEach(sprite => {
    app.loader.add(sprite.name, sprite.url)
 });
 const runGame = ()=>{
               app.stage.addChild(Slot.generate(app, 110));
    }
app.loader.load(runGame)