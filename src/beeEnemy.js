import { Enemy } from "./enemy";
import { directionsToMove, enemyStates, enemyTypes} from "./constantEnums";
import { BeeEnemyProjectile } from "./beeEnemyProjectile";

export class BeeEnemy extends Enemy
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'beeEnemyIdle'); 
        { 
            //type
            this.type=enemyTypes.BEE_ENEMY;
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
            //moving animation key
            this.runAnimationKey='beeEnemyIdleAnim';
            //disable gravity
            this.body.setAllowGravity(false);
            //target threshhold
            this.targetXThreshold=10;
             //shooting time
            this.shootTime=0;
             //is shooting
            this.isShooting=false;
            //shooting delaytime
            this.shootingDelayTime=1500;
            //SIZE
            this.body.setSize(20, 30);
            //offset
            this.body.setOffset(8, 4);
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

    checkPlayerPosition(config)
    {
        var playerXPos;
        var playerYPos;

        playerXPos=config.scene.newPlayer.x;
        playerYPos=config.scene.newPlayer.y;


        //Check for player below enemy plus within x threshhold

        if (this.y < playerYPos)
        {
            if ((this.x + this.targetXThreshold) > playerXPos && (this.x - this.targetXThreshold) < playerXPos)
            {
                console.log('bee shoot');
                //SET to fire state
                this.state=enemyStates.SHOOT;

            }
        }
    }

    
    update(config)
    {

        if (this.state===enemyStates.ACTIVE)
        {
            this.moveEnemy();
            this.anims.play(this.runAnimationKey, true);
            if (config.time - this.shootTime > this.shootingDelayTime)  
                {  
                this.checkPlayerPosition({scene:config.scene});
                }
        }

  
        if (this.state === enemyStates.SHOOT)
        {

            //play shooting animatiom
            if (!this.isShooting)
            {
            this.body.setVelocity(0);    
            this.isShooting=true; 
            this.anims.play('beeEnemyAttackAnim', false).once('animationcomplete', () =>{
            this.isShooting=false;           
            new BeeEnemyProjectile({scene: config.scene, x:this.x , y: this.y});
            this.shootTime=config.time;
            this.state=enemyStates.ACTIVE;
            });
            
            }
        }  
        
        if (this.state === enemyStates.HIT  && this.checkForHit)
        {
            console.log('hit');
            this.checkForHit=false;
            this.body.setVelocity(0);
            this.anims.play('beeEnemyHitAnim', false).once('animationcomplete', () => {
                console.log('animation complete');
                this.body.setEnable(false);
                this.state = enemyStates.DEATH; 

            });
            //this.killEntity();
        }

        if (this.state===enemyStates.DEATH)
        {
            
            this.killEntity();
        }


    }
} 