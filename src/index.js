import Phaser from "phaser";
import { levels } from "./constantEnums.js";
import { GameScene } from "./gameScene.js";
import { LevelEndScene } from "./levelEndScene.js";
import { LevelIntroScene } from "./levelIntroScene.js";




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
    gravity: {y: 1500},
    debug: //false,
    true
    },
  },
  scene: [LevelIntroScene,GameScene,LevelEndScene]
};

const game = new Phaser.Game(config);

game.level=levels.LEVEL_5; //FIRST LEVEL

