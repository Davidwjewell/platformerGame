export class SpikeBallChain extends Phaser.GameObjects.Sprite
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'spikeBallChain');
        this.angle=config.angle;
        this.centerX=config.centerX;
        this.centerY=config.centerY;
        this.distToCenter=config.distToCenter;
        config.scene.add.existing(this);
        config.scene.gameObjects.add(this);
    }

    update()
    {
        Phaser.Math.RotateAroundDistance(this, this.centerX,this.centerY, this.angle, this.distToCenter);

    }
}