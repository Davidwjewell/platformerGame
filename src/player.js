import { playerTouchBox, playerTouchEnemy } from "./collisions";
import { gameStates } from "./constantEnums";

export class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(config)
    {
        super(config.scene, config.x, config.y, 'frogIdle');

        this.jumping=false;
        this.speed=100;
        this.jumpingSpeed=425;
        this.doubleJumpingVelocity=350; //half of jumping velocity
        this.doubleJumping=false;
        this.canDoubleJump=false;
        this.haveDoubleJumped=false;
        this.wallJump=false;
        this.canWallJump=false;
        this.playDeathAnimation=true;
        this.veloctyYDoubleJumpMin=-50;
        this.veloctyYDoubleJumpMax=50;
        this.death=false;

        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
  
        
        this.body.setSize(16, 23);
        this.body.setOffset(8, 8);

    }


    update(config)
    {

      if (!this.death)
      {
        var canJump = this.body.blocked.down;


        // if touching floor
        if (canJump)
        {
          
          this.jumping=false;
          this.haveDoubleJumped=false;
          this.canDoubleJump=false;
     
        }

        //if character jumping
        if (this.jumping)       
        {
/*
          var blockedLeft=this.body.blocked.left;
          var blockedRight=this.body.blocked.right;

          
          if (blockedLeft)
          {
            console.log('block left');
            this.jumping=false;
            this.setTexture('frogWallJump');


          }
*/
      //set texture to jumping
        if (this.jumping && !this.doubleJumping)
        {
          //console.log('frog texture set');
          this.setTexture('frogJump');

          //up released can double jump
          if (!config.scene.cursors.up.isDown && !this.haveDoubleJumped)
          {
              this.canDoubleJump=true;                    
          }
     
        }

    //  }
        
        if (this.canDoubleJump && !this.doubleJumping)
        {

          if (config.scene.cursors.up.isDown)
          {
           
            this.doubleJumping=true;
            this.canDoubleJump=false;
            this.body.setVelocityY(-this.doubleJumpingVelocity); 
            this.anims.play('frogDoubleJumpAnim', false).once('animationcomplete', ()=>{    
             
            this.doubleJumping=false;
            this.haveDoubleJumped=true;              
            });

          }

        }

    }
      //move right
        if (config.scene.cursors.right.isDown)
        {
       
          this.body.setVelocityX(this.speed);
          this.flipX=false;
          if (!this.jumping && !this.doubleJumping)
          {      
            this.anims.play('frogRunAnim', true);
          }
        }
      //move left
        else if (config.scene.cursors.left.isDown)
        {
          this.body.setVelocityX(-this.speed);
          this.flipX=true;
          if (!this.jumping && !this.doubleJumping)
          {
            this.anims.play('frogRunAnim', true);
          }
        }
      //idle
        else
        {
          this.body.setVelocityX(0);
          if (!this.jumping && !this.doubleJumping)
          {
            this.anims.play('frogIdleAnim', true);
        //  console.log('frog idle');
          }
       
        }
      //JUMP
        if (config.scene.cursors.up.isDown && canJump || ((config.scene.cursors.up.isDown && this.canWallJump)))
        {
          this.body.setVelocityY(-this.jumpingSpeed);
          this.jumping=true;
          
        }


      }

      //DEAD
    //play Death Animation
       if (this.death)
       {
        

         if (this.playDeathAnimation)
         {
          this.body.setEnable(false);
          this.playDeathAnimation=false;
          this.anims.play('frogDeathAnim', false).once('animationcomplete', ()=>{
            config.scene.gameState=gameStates.PLAYER_DEATH;
          });

         }
          

       }
      
    }
    
  }


  


