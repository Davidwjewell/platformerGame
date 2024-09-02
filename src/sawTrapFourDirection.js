import { directionsToMove, enemyStates } from "./constantEnums";
import { Trap } from "./trap";

export class SawTrapFourDirection extends Trap
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'sawTrap');
        this.state=enemyStates.ACTIVE;
        this.directionMoving;
        this.setDepth(0);
        this.speed;
        this.vertical=false;
        this.turnsArray = {};
        this.body.setSize(34, 34);
        this.body.setOffset(2, 2);
        this.move1=false;
        this.move2=false;
        this.move3-false;
        this.move4=false;
        this.move1Y=0;
        this.move1X=0;
        this.move2X=0;
        this.move2Y=0;
        this.move3X=0;
        this.move3Y=0;
        this.move4X=0;
        this.move4Y=0;
        this.assignCustomProperites(config.properties);
        
    }


    assignCustomProperites(properties)
    {
        console.log(properties);
        var length=properties.length;

        for (var i =0; i < length; i++)
        {
            if (properties[i].name==='speed')
            {
                this.speed=properties[i].value;
            }

            if (properties[i].name==='move1Y')
                {
                    this.move1Y=properties[i].value;
                }

            if (properties[i].name==='move1X')
            {
                this.move1X=properties[i].value;
            }  
            if (properties[i].name==='move2Y')
            {
                this.move2Y=properties[i].value;
            }
        
            if (properties[i].name==='move2X')
            {
                this.move2X=properties[i].value;
            }  
            if (properties[i].name==='move3Y')
                {
                    this.move3Y=properties[i].value;
                }
            
            if (properties[i].name==='move3X')
                {
                    this.move3X=properties[i].value;
                }  
            if (properties[i].name==='move4Y')
                    {
                        this.move4Y=properties[i].value;
                    }
                
                if (properties[i].name==='move4X')
                    {
                        this.move4X=properties[i].value;
                    }  
             if (properties[i].name==='firstmovepoint') 
                {
                    if (properties[i].value==='move1')
                    {
                        this.move1=true;
                    } 

                    if (properties[i].value==='move3')
                    {
                        this.move3=true;
                    } 
                }      
        }

    }

    moveEnemy(config)
    {
        console.log(this.x+' '+this.y);
        //First move
        if (this.move1)
        {
            
            config.scene.physics.moveTo(this,this.move1X,this.move1Y,this.speed)

            if (this.x <= this.move1X && Math.round(this.y) === this.move1Y)
            {
                this.x = this.move1X;
                this.move1=false;
                this.move2=true;
            }

          
        }
        

        if (this.move2)
        {
           
            config.scene.physics.moveTo(this,this.move2X,this.move2Y,this.speed)    
            if (Math.round(this.x) === this.move2X && this.y >= this.move2Y)
                {
                    this.move2=false;
                    this.move3=true;
                }

               
        }
        
        if (this.move3)
            {
                config.scene.physics.moveTo(this,this.move3X,this.move3Y,this.speed)
                if (this.x >= this.move3X && Math.round(this.y) === this.move3Y)
                    {
                        this.move3=false;
                        this.move4=true;
                    }
            }
        
            if (this.move4)
                {
                    config.scene.physics.moveTo(this,this.move4X,this.move4Y,this.speed)
                    if (Math.round(this.x) === this.move4X && this.y <= this.move4Y)
                        {
                            this.move4=false;
                            this.move1=true;
                        }
                }
        //this.body.moveTo(this.move1X,this.move1Y);
    }

    update(config)
    {
        if (this.state===enemyStates.ACTIVE)
        {
            
            this.moveEnemy(config);
            //MOVE LEFT    
          
            this.anims.play('sawTrapRunAnim', true);
        }
    }
}