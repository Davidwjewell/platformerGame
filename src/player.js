import { playerTouchBox, playerTouchEnemy } from "./collisions";
import { gameStates } from "./constantEnums";

export class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(config)
    {
        super(config.scene, config.x, config.y, 'frogIdle');

        this.jumping=false;
        this.speed=125;
        this.jumpingSpeed=400;
        this.doubleJumpingVelocity=350; //half of jumping velocity
        this.wallJumpingXVelocity=75;
        this.wallJumpingDelayTime=125;
        this.doubleJumping=false;
        this.canDoubleJump=false;
        this.haveDoubleJumped=false;
        this.wallJump=false;
        this.wallGrab=false;
        this.canWallGrab=false;
        this.canWallJump=true;
        this.haveWallJumped=false;
        this.haveWallJumpedTime=0;
        this.onSpring=false;
        this.playDeathAnimation=true;
        this.veloctyYDoubleJumpMin=-50;
        this.veloctyYDoubleJumpMax=500;
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
          var blockedLeft=this.body.blocked.left;
          var blockedRight=this.body.blocked.right;
      
          if (canJump && this.onSpring)
          {
            canJump=false;
          }  



          
              
        if (canJump)
        {
          this.jumping=false;
          this.haveDoubleJumped=false;
          this.canDoubleJump=false; 
          this.canWallGrab=false;
          this.canWallJump=true;
        }

  
        if (!canJump)
        {
          this.onSpring=false;
          if (blockedLeft || blockedRight)
          {
            this.canWallGrab=true;
            if (!config.scene.cursors.up.isDown)
            {
              console.log('up off');
              this.canWallJump=true;
            }
          }
          else
          {
            this.canWallGrab=false;
          }
        }

        if (this.canWallGrab)
        {
            //player holding left or right
            if (config.scene.cursors.left.isDown || config.scene.cursors.right.isDown)
            {
              if (this.body.velocity.y < this.veloctyYDoubleJumpMax && this.body.velocity.y >  this.veloctyYDoubleJumpMin )
              {
                if (!canJump && !this.wallGrab)
                {
                  //console.log('grab wall');
                  //set player state as wall Grab
                  this.wallGrab=true;
                  //set player not jumping
                  this.jumping=false;
                }     
              }           
            }
        }

        //if character jumping
        if (this.jumping)       
        {
          
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
      //wall Grab
      if (this.wallGrab)
        {        
            this.canWallGrab=false;
            this.canDoubleJump=false;
            this.haveDoubleJumped=false;
            this.anims.play('frogWallJumpAnim', true);
            this.setVelocityY(0);
            if (blockedLeft === false  && blockedRight === false)
            {
              this.wallGrab=false;
            }
            if (this.canWallJump)
            {
              if (config.scene.cursors.up.isDown)
              {
              this.wallJump=true;
              this.wallGrab=false;
              this.canWallJump=false;
              }
            }  
        }

        if (this.wallJump)
        {
          this.body.setVelocityY(-this.jumpingSpeed);
          
          if (this.flipX)
          {
            this.body.setVelocityX(this.wallJumpingXVelocity);
          }
          else
          {
            this.body.setVelocityX(-this.wallJumpingXVelocity);
          }       
          this.haveWallJumpedTime=config.time;
          this.wallJump=false;
          this.haveWallJumped=true;
          this.jumping=true;
        }
        if (this.haveWallJumped)
        {      
         
          if (config.time-this.haveWallJumpedTime>this.wallJumpingDelayTime)
          {
            this.haveWallJumped=false;
          } 
        }


      //move right
        if (config.scene.cursors.right.isDown)
        {
          if (!this.haveWallJumped)
          {
          
            this.body.setVelocityX(this.speed);
            this.flipX=false;
            if (!this.jumping && !this.doubleJumping && !this.wallGrab)
           {      
            
            this.anims.play('frogRunAnim', true);
            }
          }
          
        }
      //move left
        else if (config.scene.cursors.left.isDown)
        {
          if (!this.haveWallJumped)
          {
  
            this.body.setVelocityX(-this.speed);
            this.flipX=true;
           if (!this.jumping && !this.doubleJumping && !this.wallGrab)
          {
            this.anims.play('frogRunAnim', true);
          }
          
        }
          
        }
      //idle
        else
        {
          this.body.setVelocityX(0);
          if (!this.jumping && !this.doubleJumping && !this.wallGrab && !this.wallJump)
          {
            this.anims.play('frogIdleAnim', true);
        //  console.log('frog idle');
          }
       
        }
      //JUMP
        if (config.scene.cursors.up.isDown && canJump) // || ((config.scene.cursors.up.isDown && this.canWallJump)))
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


  


