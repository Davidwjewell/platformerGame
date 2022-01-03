import { Projectile } from "./assets/projectile";
import { directionsToMove, projectileStates } from "./constantEnums";

export class BeeEnemyProjectile extends Projectile
{
    constructor(config)
    {
        super(config.scene,config.x, config.y, 'beeEnemyBullet')
        {
            this.hit=false;
            this.directionMoving=directionsToMove.DOWN;
            this.speed=200;
            //SIZE OF PHYSICS BODY
            this.body.setSize(8, 8);
            //OFFSET FOR HITBOX
            //this.body.setOffset(8, 8);
            
        }


    }

    update()
    {
        if (this.directionMoving === directionsToMove.DOWN)
        {
            this.body.setVelocityY(+this.speed);
        }

        if (this.state === projectileStates.COLLLIDE)
        {
            
            this.body.setEnable(false);
            this.setActive(false).setVisible(false);

        }



    }


}