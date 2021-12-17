import Phaser from "phaser";
import { GameScene } from "./gameScene.js";




const config = {
  type: Phaser.AUTO,
  parent: "container",
  width: 500,
  height: 300,
  zoom :2,
 pixelArt:true,
  physics: {
    default : 'arcade',
    arcade: {
    gravity: {y: 1000},
    debug: false
    },
  },
  scene: [GameScene]//{
    //init : init, 
    //preload: preload,
    //create: create,
    //update:update
  //}
};


const game = new Phaser.Game(config);
