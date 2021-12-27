import { Banana } from "./banana";
import { boxStates } from "./constantEnums";

export class Box extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,sprite)
    {
        super(scene,x,y,sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.gameObjects.add(this);
        scene.objects.add(this);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.body.setSize(20, 21);
        this.body.setOffset(4, 1.5);     
        this.state=boxStates.IDLE;
        this.createParts=true;
        this.collision=false;
    }

    update(config)
    {
       
        if (this.state === boxStates.HIT)
        {
            this.anims.play(this.hitAnimationkey, true).once('animationcomplete' , ()=>{
                this.state = boxStates.BROKEN;
            });;

        }

        if (this.state === boxStates.BROKEN)
        {

            if (this.createParts)
            {
                
                this.createParts=false;
                
                
                new BoxPartTopLeft({scene:config.scene,x:this.x-5,y:this.y-5});
                new BoxPartTopRight({scene:config.scene,x:this.x+5,y:this.y-5});
                new BoxPartBottomLeft({scene:config.scene,x:this.x-5,y:this.y+5});
                new BoxPartBottomRight({scene:config.scene,x:this.x+5,y:this.y+5});
               
                this.spawnfruit(config.scene);
                this.body.setEnable(false);
                this.setVisible(false);
            }
                    

        }

    }

    spawnfruit(scene)
    {
        console.log(scene);
        new Banana({scene:scene,x:this.x,y:this.y});


    }




}


export class Box1 extends Box
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'box1Idle');
        this.hitAnimationkey="box1HitAnim";
    }

}

export class BoxPart extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,sprite)
    {
        super (scene,x,y,sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setSize(10,10);
       
      
       
    }

}

export class BoxPartTopLeft extends BoxPart
{   
    constructor(config)
    {
 
        super (config.scene,config.x,config.y,'boxPartTopLeft');
        this.body.setVelocityY(-25);
        this.body.setVelocityX(-25);

    }

}

export class BoxPartTopRight extends BoxPart
{   
    constructor(config)
    {
 
        super (config.scene,config.x,config.y,'boxPartTopRight');
        this.body.setVelocityY(25);
        this.body.setVelocityX(25);

    }
}

export class BoxPartBottomLeft extends BoxPart
{   
    constructor(config)
    {
 
        super (config.scene,config.x,config.y,'boxPartBottomLeft');
        this.body.setVelocityY(-25);
        this.body.setVelocityX(-25);

    }
}

export class BoxPartBottomRight extends BoxPart
{   
    constructor(config)
    {
 
        super (config.scene,config.x,config.y,'boxPartBottomRight');
        this.body.setVelocityY(25);
        this.body.setVelocityX(25);

    }
}