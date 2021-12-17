import { flagStates, fruitStates } from "./constantEnums";

export class Fruit extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,sprite)
    {
        super(scene,x,y,sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.fruits.add(this);
        scene.gameObjects.add(this);
        
       // this.state=fruitStates.ACTIVE;
    }


  

  
}