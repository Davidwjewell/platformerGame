import { flagStates, fruitStates } from "./constantEnums";
import { checkRemainingFruit } from "./gameLogic";

export class Fruit extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,sprite)
    {
        super(scene,x,y,sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.fruits.add(this);
        scene.gameObjects.add(this);

    }

    update(config)
    {
        if (this.state===fruitStates.ACTIVE)
        {

            this.anims.play(this.animationKey, true);
        }

        if (this.state === fruitStates.TOUCHED)
        {
            if (this.playCollectAnim)
            {
                this.playCollectAnim=false;
                this.anims.play('fruitCollected', false).once('animationcomplete' , ()=>{
                this.state = fruitStates.DISABLED;
            });
            }
        }

        if (this.state === fruitStates.DISABLED)
        {
            this.destroy();
            checkRemainingFruit(config.scene);
        }


        
    }


  

  
}