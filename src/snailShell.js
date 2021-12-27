//MUSHROOM ENEMY

import { Enemy } from "./enemy";
import { directionsToMove, enemyStates, enemyTypes} from "./constantEnums";

export class SnailEnemyShell extends Phaser.Physics.Arcade.Sprite
{
    constructor(config)
    {
 
        super(config.scene,config.x,config.y,'snailEnemyShellIdle'); 
        {    
            //enemy type
            this.type=enemyTypes.SNAIL_ENEMY_SHELL;
            //movement speed       
            this.speed=175;
            //DEFAULT MOVE LEFT
            this.directionMoving=config.directionFacing;
           //IF RIGHT FLIP X
            if (config.directionFacing===directionsToMove.RIGHT)
            {            
                this.flipX=true;
            }
            //DEFAULT STATE IDLE
            this.state=enemyStates.SHELL_IDLE;
            //PLAY HIT ANIMATION
            this.playHitAnimation=true;
            //CHECK WHETHER ENEMY IS IN HIT STATE
            this.checkForHit=true;
            //PHYSICS
            config.scene.add.existing(this);
            config.scene.physics.add.existing(this);
            this.setCollideWorldBounds(true);
            config.scene.shells.add(this);
            config.scene.gameObjects.add(this);
            //Size
            this.body.setSize(26, 21);
            this.body.setOffset(7, 3);
          
           
            
            

        }         


    }

    update()
    {


        var touchingLeftSide = this.body.blocked.left;
        var touchingRightSide = this.body.blocked.right;

         //BLOCKED LEFT   
        if (touchingLeftSide)
        {
            this.directionMoving=directionsToMove.RIGHT;

        }

        //BLOCKED RIGHT

        if (touchingRightSide)
        {
            this.directionMoving=directionsToMove.LEFT;

        }

        if (this.state === enemyStates.SHELL_IDLE)
        {

            this.anims.play('snailEnemyShellIdleAnim', true);

        }
        if (this.state === enemyStates.SHELL_ACTIVE)

        {

            //MOVE LEFT    
            if (this.directionMoving === directionsToMove.LEFT)
            {
                this.body.setVelocityX(-this.speed);
                this.flipX=false;

            }
            //MOVE RIGHT
            if (this.directionMoving === directionsToMove.RIGHT)
            {
                this.body.setVelocityX(this.speed);
                this.flipX=true;

            }
   

        }

        //SHELL JUMPED ON (HIT FROM TOP) WHILE 
        if (this.state === enemyStates.SHELL_HIT_SIDE)
        {
         
                console.log(this.playHitAnimation);
                if (this.playHitAnimation)
                {   
                                
                   this.playHitAnimation=false;
                   // this.setVelocityX(0);
                    this.anims.play('snailEnemyShellHitTopAnim', false).once('animationcomplete', () =>{
                   
                    this.body.setEnable(false);    
                    this.state = enemyStates.DEATH;                
                    });
    
                }

        }

         //ENEMY DEATH
         if (this.state === enemyStates.DEATH)
         {   
             //move enemy off screen        
             //this.killEntity();
             this.y+=5;
 
         }

}

}