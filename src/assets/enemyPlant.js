import { enemyStates, enemyTypes } from "../constantEnums";
import { Enemy } from "../enemy";
import { PlantEnemyProjectile } from "./plantEnemyProjectile";

export class EnemyPlant extends Enemy
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'plantEnemyIdle');

        //type
        this.type=enemyTypes.FLOWER_ENEMY;
        //SET STATE
        this.state=enemyStates.IDLE;
        //PLAY HIT ANIMATION
        this.playHitAnimation=true;
        //Check for player in range
        this.checkForPlayerInRange=true;
        //shooting time
        this.shootTime=0;
        //is shooting
        this.isShooting=false;
        //shooting delaytime
        this.shootingDelayTime=3000;
        //check for hit
        this.checkForHit=true;
       //set immovable

        this.setImmovable(true);
        
        this.body.setSize(28, 38);
        this.body.setOffset(12,4);


    }

    update(config)
    {
        //check for player in range 
        if (this.state === enemyStates.HIT  && this.checkForHit)
        {
            console.log('hit');
            this.checkForHit=false;

            this.anims.play('plantDeathAnim', false).once('animationcomplete', () => {
                this.body.setEnable(false);    
                this.state = enemyStates.DEATH; 

            });
            //this.killEntity();
        }

        if (this.state === enemyStates.DEATH)
        {

            this.killEntity();
        }
    
        if (this.checkForHit)
        {
        if (config.time - this.shootTime > this.shootingDelayTime)  
        {  
        if (this.checkforTarget(config.scene.newPlayer))
        {
            //SET SHOOT STATE
            //TARGET WITHIN AREA    
            this.state = enemyStates.SHOOT;
        }

        }
        else
        {
            //SET IDLE STATE
            this.state = enemyStates.IDLE;
        }
       

    

        if (this.state === enemyStates.SHOOT)
        {

            //play shooting animatiom
            if (!this.isShooting)
            {
            this.isShooting=true; 
            this.anims.play('plantEnemyShootAnim', false).once('animationcomplete', () =>{
            this.isShooting=false;           
            new PlantEnemyProjectile({scene: config.scene, x:this.x , y: this.y});
            this.shootTime=config.time;
            
            });
            
            }
        }    


        if (this.state === enemyStates.IDLE)
        {

            this.anims.play('plantEnemyIdleAnim', true);

        }

    }
    }


    checkforTarget(player)
    {
    
        //offset amount for checking Y pos vs player Y
        var checkBounds = 50;

        var playerMinY=player.y-checkBounds;
        var playerMaxY=player.y+checkBounds;
        
       
        if (this.y > playerMinY && this.y < playerMaxY)
        {
    
            
            return true;
        }



    }





}