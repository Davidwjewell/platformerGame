//Snail ENEMY

import { Enemy } from "./enemy";
import { directionsToMove, enemyStates, enemyTypes} from "./constantEnums";
import { SnailEnemyShell } from "./snailShell";

export class SnailEnemy extends Enemy
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'snailEnemyIdle'); 
        {    
            //type
            this.type=enemyTypes.SNAIL_ENEMY;
            //movement speed       
            this.speed=30;
            //DEFAULT MOVE LEFT
            this.directionMoving=directionsToMove.LEFT;
            //DEFAULT STATE IDLE
            this.state=enemyStates.ACTIVE;
            //PLAY HIT ANIMATION
            this.playHitAnimation=true;
            //CHECK WHETHER ENEMY IS IN HIT STATE
            this.checkForHit=true;
            //SIZE
        
     
            this.body.setSize(30, 21);
            this.body.setOffset(4, 3);
          
           
            
            

        }         


    }

    update(config)
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

        if (this.state === enemyStates.ACTIVE)

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
            this.anims.play('snailEnemyWalkAnim', true);

        }

        //ENEMY HIT
        if (this.state === enemyStates.HIT && this.checkForHit)
        {
          console.log('snail hit ');
            this.checkForHit=false;

            if (this.playHitAnimation)
            {
                
                this.playHitAnimation=false;
                this.setVelocityX(0);

                this.anims.play('snailEnemyHitAnim', false).once('animationcomplete', () =>{
                var snailShellXPos = this.x;
                var snailShellYPos = this.y;   
                new SnailEnemyShell({scene:config.scene,x:snailShellXPos, y:snailShellYPos, directionFacing: this.directionMoving});
                
                this.body.setEnable(false);
                this.setActive(false).setVisible(false);
              
                //this.state = enemyStates.SHELL; 
                });

            }

        }

        




        //ENEMY DEATH
        if (this.state === enemyStates.DEATH)
        {   
            //move enemy off screen        
            this.killEntity();

        }
    }





}