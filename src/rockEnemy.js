import { Enemy } from "./enemy";
import { directionsToMove, enemyStates, enemyTypes} from "./constantEnums";

export class RockEnemy extends Enemy
{
    constructor(scene,x,y,sprite)
    {
        super(scene,x,y,sprite); 
        {    
            
            
            //DEFAULT MOVE LEFT
            this.directionMoving=directionsToMove.LEFT;
            //DEFAULT STATE IDLE
            this.state=enemyStates.ACTIVE;
            //PLAY HIT ANIMATION
            this.playHitAnimation=true;
            //CHECK WHETHER ENEMY IS IN HIT STATE
            this.checkForHit=true;
            
         
        }         


    }

    update(config)
    {
        
        if (this.state===enemyStates.ACTIVE)
        {
            this.moveEnemy();
        }

        if (this.state===enemyStates.HIT && this.checkForHit)
        {
            this.checkForHit=false;
            this.body.setEnable(false);
            this.timeOfHit=config.time;
            this.setVelocity(0);
            
            this.state=enemyStates.HIT_STATE;
           
        }

        if (this.state === enemyStates.HIT_STATE)
        {
           //console.log(this.texture);
           this.setTexture(this.hitTexture);
            if(config.time-this.timeOfHit>this.hitStateTimer)
            {
                this.state=enemyStates.SPAWN
            }
        }
        if (this.state===enemyStates.SPAWN)
        {
            this.spawnNewEnemies({scene:config.scene,type:this.spawns});
            this.state=enemyStates.DEATH
        }
        if(this.state===enemyStates.DEATH)
        {
            
            this.setActive(false).setVisible(false);
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

        //if (this.state === enemyStates.ACTIVE)

        //{

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
            this.anims.play(this.runAnimationKey, true);

       // }
       
    }

    spawnNewEnemies(config)
    {
        
        var XSpawnPosEnemy1=this.x-(this.width/2);
        //var YSpawnPosEnemy1;

        var XSpawnPosEnemy2=this.x+(this.width/2);
        //var YSpawnPosEnemy2;

        if (config.type === enemyTypes.ROCK_ENEMY2)
        {
            new RockEnemy2({scene:config.scene,x:XSpawnPosEnemy1,y:this.y});
            new RockEnemy2({scene:config.scene,x:XSpawnPosEnemy2,y:this.y,directionMoving:directionsToMove.RIGHT});

        }

        if (config.type === enemyTypes.ROCK_ENEMY3)
        {
            new RockEnemy3({scene:config.scene,x:XSpawnPosEnemy1,y:this.y});
            new RockEnemy3({scene:config.scene,x:XSpawnPosEnemy2,y:this.y,directionMoving:directionsToMove.RIGHT});

        }

        

    }
}


export class RockEnemy1 extends RockEnemy
{
    constructor(config)
    {
        
        super(config.scene,config.x,config.y,'rockEnemy1Idle');
        //SIZE 
        //movement speed       
        this.speed=30;
        //type
        this.type=enemyTypes.ROCK_ENEMY1;
        //animation keys
        this.runAnimationKey='rockEnemy1RunAnim';
        //spawns
        this.spawns=enemyTypes.ROCK_ENEMY2;
        //timer for hit state
        this.hitStateTimer=150;
        //time enemy hit
        this.timeOfHit=0;
        //hit texture
        this.hitTexture='rockEnemy1Hit';

    }

}

export class RockEnemy2 extends RockEnemy
{
    constructor(config)
    {
        
        super(config.scene,config.x,config.y,'rockEnemy2Idle');
        //direction moving
        if (config.directionMoving === directionsToMove.RIGHT)
        {
            this.directionMoving=directionsToMove.RIGHT;
        }
        //SIZE 
        //speed
        this.speed=45;
        //type
        this.type=enemyTypes.ROCK_ENEMY2;
        //spawns
        this.spawns=enemyTypes.ROCK_ENEMY3;
         //timer for hit state
         this.hitStateTimer=150;
         //time enemy hit
         this.timeOfHit=0;
        //animation key run
        this.runAnimationKey='rockEnemy2RunAnim';
        //hit texture
        this.hitTexture='rockEnemy2Hit'

    }

  
}

export class RockEnemy3 extends RockEnemy
{
    constructor(config)
    {
        
        super(config.scene,config.x,config.y,'rockEnemy3Idle');
         //direction moving
         if (config.directionMoving === directionsToMove.RIGHT)
         {
             this.directionMoving=directionsToMove.RIGHT;
         }
        //SIZE 
        //speed
        this.speed=60;
        //type
        this.type=enemyTypes.ROCK_ENEMY3;
        //animation key run
        this.runAnimationKey='rockEnemy3RunAnim';
        this.hitAnimationKey='rockEnemy3HitAnim';
        this.playHitAnimation=true;


    }

    update()
    {
         
        if (this.state===enemyStates.ACTIVE)
        {
            this.moveEnemy();
        }

          //ENEMY HIT
          if (this.state === enemyStates.HIT && this.checkForHit)
          {
            
              this.checkForHit=false;
  
              if (this.playHitAnimation)
                {
                  
                  this.playHitAnimation=false;
                  this.setVelocityX(0);
  
                  this.anims.play(this.hitAnimationKey, false).once('animationcomplete', () =>{
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
