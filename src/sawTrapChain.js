
export class SawTrapChain extends Phaser.GameObjects.Sprite
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'sawTrapChain');
        config.scene.add.existing(this);
        
        
    }

}