import { Projectile } from "./assets/projectile";
import { directionsToMove, projectileStates } from "./constantEnums";

export class TrunkEnemyProjectile extends Projectile
{
    constructor(config)
    {
        super(config.scene,config.x, config.y, 'trunkEnemyProjectile')
        {
            console.log(config.direction);
            this.hit=false;
            this.directionMoving=config.direction;
            this.speed=200;
            //SIZE OF PHYSICS BODY
            this.body.setSize(8, 8);
            //OFFSET FOR HITBOX
            //this.body.setOffset(8, 8);
            
        }


    }

    update(config)
    {
        if (this.directionMoving === directionsToMove.LEFT)
        {
            this.body.setVelocityX(-this.speed);
        }
        else
        {
            this.body.setVelocityX(this.speed);
        }

        if (this.state === projectileStates.COLLLIDE)
        {
            
            this.body.setEnable(false);
            this.setActive(false).setVisible(false);

        }


        

    }





}