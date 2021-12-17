import { projectileStates } from "../constantEnums";

export class Projectile extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, sprite)
    {
        super(scene, x, y, sprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        scene.projectiles.add(this);
        scene.gameObjects.add(this);
        this.body.setAllowGravity(false);
        //SET STATE TO ACTIVE
        this.state=projectileStates.ACTIVE;
    }



}