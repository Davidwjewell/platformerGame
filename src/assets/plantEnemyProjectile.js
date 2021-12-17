import { directionsToMove, projectileStates } from "../constantEnums";
import { Projectile } from "./projectile";

export class PlantEnemyProjectile extends Projectile
{
    constructor(config)
    {
        super(config.scene,config.x, config.y, 'plantBullet')
        {
            this.hit=false;
            this.directionMoving=directionsToMove.LEFT;
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

        if (this.state === projectileStates.COLLLIDE)
        {
            
            this.body.setEnable(false);
            this.setActive(false).setVisible(false);

        }


        

    }





}