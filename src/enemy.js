//SUPER CLASS FOR ENEMIES

import { enemyTypes } from "./constantEnums";

export class Enemy extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, sprite)
    {
        super(scene, x, y, sprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        scene.enemies.add(this);
        scene.gameObjects.add(this);
        this.isHit=false;
    }

    killEntity()
    {
          
        //DEAD MOVE OFF SCREEN
        this.y+=5;

    }



}