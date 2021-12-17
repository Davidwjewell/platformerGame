//MUSHROOM ENEMY

import { Enemy } from "./enemy";
import { directionsToMove, enemyStates, enemyTypes} from "./constantEnums";

export class MushRoomEnemy extends Enemy
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'mushroomEnemyRun'); 
        {    
            //type
            this.type=enemyTypes.MUSHROOM_ENEMY;
            //movement speed       
            this.speed=50;
            //DEFAULT MOVE LEFT
            this.directionMoving=directionsToMove.LEFT;
            //DEFAULT STATE IDLE
            this.state=enemyStates.ACTIVE;
            //PLAY HIT ANIMATION
            this.playHitAnimation=true;
            //CHECK WHETHER ENEMY IS IN HIT STATE
            this.checkForHit=true;
            //SIZE
        
     
            this.body.setSize(25, 19);
            this.body.setOffset(5, 12);
          
           
            
            

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
            this.anims.play('mushroomEnemyRunAnim', true);

        }

        //ENEMY HIT
        if (this.state === enemyStates.HIT && this.checkForHit)
        {
          
            this.checkForHit=false;

            if (this.playHitAnimation)
            {
                
                this.playHitAnimation=false;
                this.setVelocityX(0);

                this.anims.play('mushroomEnemyHitAnim', false).once('animationcomplete', () =>{
                this.body.setEnable(false);    
                this.state = enemyStates.DEATH;                
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