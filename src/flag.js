import { flagStates, gameStates } from "./constantEnums";

export class Flag extends Phaser.Physics.Arcade.Sprite
{
    constructor(config)
    {
        super(config.scene, config.x, config.y,'flagIdle');
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.state=flagStates.IDLE;
        this.playRaiseAnimation=true;
        this.flagCheck=true;
        this.flagTouched=false;
        config.scene.gameObjects.add(this);
    }


    update(config)
    {

        //RAISE FLAG
        if (this.state === flagStates.RAISE)
        {

            if (this.playRaiseAnimation)
            {
                this.playRaiseAnimation=false;
                this.anims.play('flagRaiseAnim', false).once('animationcomplete', () =>{
                    this.state = flagStates.ACTIVE;
                    });
            }


        }

        //FLAG ACTIVE
        if (this.state === flagStates.ACTIVE)
        {   


            this.anims.play('flagWaveAnim', true);
            if (this.flagTouched)
            {
                config.scene.gameState=gameStates.STOP;

            }

        }


    }
    


}