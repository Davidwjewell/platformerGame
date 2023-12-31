import { springStates } from "./constantEnums";

export class Spring extends Phaser.Physics.Arcade.Sprite
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'springIdle');
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        config.scene.springs.add(this);
        config.scene.gameObjects.add(this);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.state=springStates.IDLE;
        this.springVelocity=800;
        this.body.setSize(24, 10);
        this.body.setOffset(2, 18);
        this.playSpringAnimation=true;
    }

    update(config)
    {
        if (this.state === springStates.ACTIVE)
        {
            if (this.playSpringAnimation)
            {
                this.playSpringAnimation=false;
                this.anims.play('springJumpAnim', false).once('animationcomplete' , ()=>{
                this.state = springStates.IDLE;
                this.playSpringAnimation=true;
                });;
            }      
        }
    }
}