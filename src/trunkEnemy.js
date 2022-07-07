import { directionsToMove, enemyStates, enemyTypes } from "./constantEnums";
import { Enemy } from "./enemy";
import { TrunkEnemyProjectile } from "./trunkEnemyProjectile";

export class TrunkEnemy extends Enemy
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'trunkEnemyIdle');
        {
            this.type=enemyTypes.TRUNK_ENEMY;
            this.speed=50;
            this.directionMoving=directionsToMove.LEFT;
            this.state=enemyStates.ACTIVE;
            this.playHitAnimation=true;
            this.checkForHit=true;
            this.shootTime=0;
            this.isShooting=false;
            this.shootingDelayTime=1000;
            this.projectileOffsetY=2;
            this.projectileOffsetX=5;
            this.setOffset(20,10);
            this.setSize(24,30);
        }

    }

    moveEnemy()
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
        }
    }

    update (config)
    {
      
        if (this.state===enemyStates.ACTIVE)
        {
            if (this.checkForTarget(config.scene.newPlayer))
             {       
                 this.state=enemyStates.TARGET_IN_RANGE;
             }
             else
             {
                this.moveEnemy();
                this.anims.play('trunkEnemyRunAnim', true);
             }
           
        }

        if (this.state === enemyStates.TARGET_IN_RANGE)
        {
            console.log('in range');
            this.body.setVelocity(0);  
            if (config.time - this.shootTime > this.shootingDelayTime)  
            {  
                this.state = enemyStates.SHOOT;
            }

        }


        if (this.state === enemyStates.HIT  && this.checkForHit)
        { 
            this.checkForHit=false;
            this.body.setVelocity(0);
            this.anims.play('trunkEnemyHitAnim', false).once('animationcomplete', () => {
            this.body.setEnable(false);
            this.state = enemyStates.DEATH; 
            });
        }
        if (this.state === enemyStates.SHOOT)
        {
            //play shooting animatiom
            if (!this.isShooting)
            {   
            this.isShooting=true; 
            this.anims.play('trunkEnemyAttackAnim', false).once('animationcomplete', () =>{
            this.isShooting=false;  
            if (this.state!==enemyStates.HIT)
            {
                if (this.directionMoving===directionsToMove.LEFT)
                {
                    new TrunkEnemyProjectile({scene: config.scene, x:this.x-this.projectileOffsetX , y: this.y+this.projectileOffsetY, direction : this.directionMoving});
                }
                else
                {
                    new TrunkEnemyProjectile({scene: config.scene, x:this.x+this.projectileOffsetX , y: this.y+this.projectileOffsetY, direction : this.directionMoving});
                }
               
                this.shootTime=config.time;   
                this.state=enemyStates.ACTIVE;
            }           
            });  
            }
        }    

        if (this.state === enemyStates.DEATH)
        {
            this.killEntity();
        }

    }

    checkForTarget(player)
    {
        //offset amount for checking Y pos vs player Y
        var checkBounds = 5;

        var playerMinY=player.y-checkBounds;
        var playerMaxY=player.y+checkBounds;

        //check Flip X


        if (this.y > playerMinY && this.y < playerMaxY)
        {
            //If moving left check player x to be smaller then enemy x
            if (this.directionMoving===directionsToMove.LEFT)
            {
                if (player.x<this.x)
                {
                    return true;
                }
            }
            else
            {
                //check player x to be greater then enemy x
                if (player.x>this.x)
                {
                    return true;
                }
            }
                
           
            
        }

      
    }


}