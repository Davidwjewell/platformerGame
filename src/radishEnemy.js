import { Enemy } from "./enemy";
import { directionsToMove, enemyStates, enemyTypes} from "./constantEnums";

export class RadishEnemy extends Enemy
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'radishEnemyAir'); 
        {    
            //type
            this.type=enemyTypes.RADISH_ENEMY;
            //movement speed       
            this.speed=50;
            //DEFAULT MOVE LEFT
            this.directionMoving=directionsToMove.LEFT;
            //DEFAULT STATE IDLE
            this.state=enemyStates.RADISH_AIR;
            //PLAY HIT ANIMATION
            this.playHitAnimation=true;
            //CHECK WHETHER ENEMY IS IN HIT STATE
            this.checkForHit=true;
             //disable gravity
             this.body.setAllowGravity(false);
            //airborne state
            this.airborne=true;  //set with constructor
            //airborne animation
            this.airborneAnimationKey='radishEnemyAirAnim';
            //ground animation
            this.groundAnimationKey='radishEnemyRunAnim';

            //SIZE
           // this.body.setSize(25, 19);
            //this.body.setOffset(5, 12);
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

    update()
    {
       //console.log(this.state);
      if (this.state === enemyStates.RADISH_AIR)
      { 
         // console.log('airborne');
        this.moveEnemy();
        this.anims.play(this.airborneAnimationKey, true);

      }  

      if (this.state === enemyStates.RADISH_GROUND)
      { 
         // console.log('airborne');
        this.moveEnemy();
        this.anims.play(this.groundAnimationKey, true);

      }  

      if (this.state === enemyStates.HIT && this.checkForHit)
      { 
          if (this.airborne)
          {
            this.checkForHit=false;
            this.anims.play('radishEnemyHitAnim', false).once('animationcomplete', () => {
                console.log('animation complete');
                //this.body.setEnable(false);
                this.body.setAllowGravity(true);
                this.checkForHit=true;
                this.airborne=false;
                this.state = enemyStates.RADISH_GROUND; 
            });
        }
        else
        {   
            this.checkForHit=false;
            this.body.setVelocity(0);
            this.anims.play('radishEnemyHitAnim', false).once('animationcomplete', () => {
                this.body.setEnable(false);              
                this.state = enemyStates.DEATH; 
                console.log(this.state);
        });

      }
    
    }
      if (this.state===enemyStates.DEATH)
      {
        console.log('kill');
          this.killEntity();
      }
    }
}