import { platformStates } from "./constantEnums.js";

export class FanPlatform extends Phaser.Physics.Arcade.Sprite
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'platformOff');
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        config.scene.platforms.add(this);
        config.scene.gameObjects.add(this);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.body.setAllowGravity(false);
     
        this.state=platformStates.ACTIVE
        this.playerTouchedPlatform=false;
        this.playOnAnimation=true;
        this.startY=config.y;
        this.floatRange=10;
        this.floatSpeed = 10;
        this.floatUp=true;
        this.floatDown=false;
        this.fallSpeed=35;
        this.resetPosition=false;
        this.body.setSize(30, 7);
        this.body.setOffset(1, 2);
    }


    update(config)
    {
            
        if (this.state === platformStates.ACTIVE)
        {
            if (this.y < (this.startY - this.floatRange))
            {
                this.floatDown = true;
                this.floatUp = false;
            }

            if (this.y > this.startY + this.floatRange)
                {
                    this.floatDown = false;
                    this.floatUp = true;
                }

            if (this.floatUp)
            {
                this.body.setVelocityY(-this.floatSpeed)
                
            }

            if (this.floatDown)
                {
                    this.body.setVelocityY(+this.floatSpeed)
                    
                }
            this.anims.play('platformOnAnim', true);
            //play animation
        }
       
        if (this.state === platformStates.PLAYER_ON)
        {
            this.body.setVelocityY(+this.fallSpeed);
           // console.log(this.body.touching.up)
           // console.log(!this.body.touching.up)
           console.log(config.scene.newPlayer.body.velocity.y);
            if (!this.body.touching.up)
            {
                if ((config.scene.newPlayer.body.velocity.y)<-1)
                {
                    this.state = platformStates.RESET;
                }
              //console.log ('not up');
            }
       
            
        }
       
        if (this.state === platformStates.RESET)
        {
            console.log('reset state');
            this.anims.play('platformOnAnim', true);
            if (this.y > this.startY)
            {
                this.body.setVelocityY(-this.floatSpeed)
            }

            if (this.y < this.startY)
            {
                this.state = platformStates.ACTIVE
            }
        }

        

    }
}
