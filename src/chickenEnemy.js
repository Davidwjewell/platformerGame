import { Enemy } from "./enemy";
import { directionsToMove, enemyStates, enemyTypes} from "./constantEnums";

export class ChickenEnemy extends Enemy
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'chickenEnemyIdle')
        {
            this.type=enemyTypes.CHICKEN_ENEMY;
            this.speed=125;
            this.state=enemyStates.IDLE;
            this.playHitAnimation=true;
            this.checkForHit=true;
            this.playerCheckRange = 200;
            this.directionMoving = directionsToMove.LEFT;
            this.checkDirectionOffset=20;
           // this.body.setSize(23, 20);
            //this.body.setOffset(5, 13);
        }
    }

    update(config)
    {
        var touchingLeftSide = this.body.blocked.left;
        var touchingRightSide = this.body.blocked.right;

        if (touchingLeftSide)
            {
                this.state = enemyStates.IDLE;
    
            }
    
            //BLOCKED RIGHT
    
            if (touchingRightSide)
            {
                this.state = enemyStates.IDLE;
    
            }

            if (this.state === enemyStates.IDLE)
            {
                //idle anim
                this.anims.play('chickenEnemyIdleAnim', true);
                // See if player in range X VAlue
                if ((config.scene.newPlayer.x < this.x+this.playerCheckRange) && (config.scene.newPlayer.x>this.x-this.playerCheckRange))
                {
                    if (this.y > config.scene.newPlayer.y-10 && this.y < config.scene.newPlayer.y + 10)
                    this.state = enemyStates.ACTIVE
                }

                if (config.scene.newPlayer.x<this.x) 
                {
                    this.directionMoving=directionsToMove.LEFT;
                }
                else
                {
                        this.directionMoving=directionsToMove.RIGHT;
                }

              
            }

            if (this.state === enemyStates.ACTIVE)
            {
                //active anim
                this.anims.play('chickenEnemyRunAnim', true);
                //moveTo(config.scene.newPlayer.x,config.scene.newPlayer.y,this.speed)
               
                console.log(this.directionMoving)
                 //MOVE LEFT    
                if (this.directionMoving === directionsToMove.LEFT)
                {
                    if (this.x > config.scene.newPlayer.x - this.checkDirectionOffset)
                    {
                    this.body.setVelocityX(-this.speed);
                    this.flipX=false;
                    }
                    else
                    {
                        this.directionMoving = directionsToMove.RIGHT
                    }
    
                }
                //MOVE RIGHT
                if (this.directionMoving === directionsToMove.RIGHT)
                {
                    if (this.x < config.scene.newPlayer.x + this.checkDirectionOffset)
                    {
                    this.body.setVelocityX(this.speed);
                    this.flipX=true;
                    }
                    else
                    {
                        this.directionMoving = directionsToMove.LEFT
                    }
    
                }



            }

             //ENEMY HIT
        if (this.state === enemyStates.HIT && this.checkForHit)
            {
              
                this.checkForHit=false;
    
                if (this.playHitAnimation)
                {
                    
                    this.playHitAnimation=false;
                    this.setVelocityX(0);
    
                    this.anims.play('chickenEnemyHitAnim', false).once('animationcomplete', () =>{
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



