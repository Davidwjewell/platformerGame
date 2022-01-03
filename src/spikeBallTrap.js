import { Trap } from "./trap";

export class SpikeBallTrap extends Trap
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'spikeBallTrap');
        this.setSize(20,20);
        this.angle=config.angle;
        this.angle=config.angle;
        this.centerX=config.centerX;
        this.centerY=config.centerY;
        this.distToCenter=config.distToCenter;
    }


    update()
    {
        Phaser.Math.RotateAroundDistance(this,this.centerX,this.centerY, this.angle, this.distToCenter);
    


    }
}
