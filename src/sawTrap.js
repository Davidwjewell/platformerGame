import { directionsToMove, enemyStates } from "./constantEnums";
import { Trap } from "./trap";

export class SawTrap extends Trap
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

            if (properties[i].name==='direction')
            {
                console.log(properties[i].value)
                if(properties[i].value==='left')
                {
                    this.directionMoving=directionsToMove.LEFT;
                }
                if(properties[i].value==='down')
                {
                    this.directionMoving=directionsToMove.DOWN;
                }    
            }

            if (properties[i].name==='vertical')
            {
                this.vertical=properties[i].value;
            }

        }

    }

    moveEnemy()
    {
      //  console.log(this.directionMoving)
        //left to right
        if (!this.vertical)
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
        var touchingDown = this.body.blocked.down;
        var touchingUp = this.body.blocked.up;

         //BLOCKED LEFT   
        if (touchingDown)
        {
            this.directionMoving=directionsToMove.UP;

        }

        //BLOCKED RIGHT

        if (touchingUp)
        {
            this.directionMoving=directionsToMove.DOWN;

        }

        //MOVE LEFT    
        if (this.directionMoving === directionsToMove.DOWN)
            {
                this.body.setVelocityY(this.speed);
                this.flipX=false;

            }
        //MOVE RIGHT
        if (this.directionMoving === directionsToMove.UP)
            {
                this.body.setVelocityY(-this.speed);
                this.flipX=true;

            }
      
    }


    update()
    {
        if (this.state===enemyStates.ACTIVE)
        {
            var touchingLeftSide = this.body.blocked.left;
            var touchingRightSide = this.body.blocked.right;
            this.moveEnemy();
            //MOVE LEFT    
          
            this.anims.play('sawTrapRunAnim', true);
        }
    }
}


