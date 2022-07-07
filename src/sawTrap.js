import { directionsToMove, enemyStates } from "./constantEnums";
import { Trap } from "./trap";

export class SawTrap extends Trap
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'sawTrap');
        this.state=enemyStates.ACTIVE;
        this.directionMoving=directionsToMove.LEFT
        this.setDepth(0);
        this.speed;
        this.turns;
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

            if (properties[i].name==='turns')
            {
                this.speed=properties[i].value;
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


    update()
    {
        if (this.state===enemyStates.ACTIVE)
        {
            var touchingLeftSide = this.body.blocked.left;
            var touchingRightSide = this.body.blocked.right;
            //this.moveEnemy();
            this.body.setVelocityX(-this.speed);
            this.anims.play('sawTrapRunAnim', true);
        }
    }
}


