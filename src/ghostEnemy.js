import { Enemy } from "./enemy";
import { directionsToMove, enemyStates, enemyTypes} from "./constantEnums";

export class GhostEnemy extends Enemy
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'ghostEnemyIdle')
        {
            //type
            this.type=enemyTypes.GHOST_ENEMY;
            //movement speed       
            this.speed=30;
            //DEFAULT MOVE LEFT
            this.directionMoving=directionsToMove.LEFT;
            //DEFAULT STATE IDLE
            this.state=enemyStates.ACTIVE;
            //PLAY HIT ANIMATION
            this.playHitAnimation=true;
            //CHECK WHETHER ENEMY IS IN HIT STATE
            this.playDisappearAnimation=true;
            this.playAppearAnimation=true;
            this.timeHidden=0;
            this.timeAppeared=0;
            this.hideTime=3000;
            this.appearTime=5000;
            this.checkForHit=true;
            //SIZE
            this.body.setSize(28, 25);
            this.body.setOffset(8, 4);
        }
    }

    update(config)
    {
        console.log(this.state)
        //console.log(config.time)
        if (this.state === enemyStates.ACTIVE)
        {
            //SET IF 0
            if (this.timeAppeared === 0)
            {
                this.timeAppeared=config.time;
            }
           
            if (config.time - this.timeAppeared > this.appearTime)
            {
                this.state = enemyStates.GHOST_DISAPPEARING;
            }
          
            this.moveEnemy();
            this.anims.play('ghostEnemyIdleAnim', true);

        }

        if (this.state === enemyStates.GHOST_DISAPPEARING)
        {
            if (this.playDisappearAnimation)
            {
                this.playDisappearAnimation=false;
                this.body.setVelocity(0);
                this.anims.play('ghostEnemyDisappearAnim', false).once('animationcomplete', () => {
                this.state = enemyStates.GHOST_HIDDEN;
                this.timeHidden=config.time;
                this.playDisappearAnimation=true;
                });
            }
            
        }

        if (this.state === enemyStates.GHOST_HIDDEN)
        {
            if (config.time - this.timeHidden > this.hideTime)
                {
                    this.state = enemyStates.GHOST_APPEARING;
                }
            this.moveEnemy();
        }

        if (this.state === enemyStates.GHOST_APPEARING)
        {
            if (this.playAppearAnimation)
            {
                this.playAppearAnimation=false;
                this.body.setVelocity(0);
                this.anims.play('ghostEnemyDisappearAnim', false).once('animationcomplete', () => {
                    this.state = enemyStates.ACTIVE;
                    this.timeAppeared=config.time;
                    this.playAppearAnimation=true;
                });
            }
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