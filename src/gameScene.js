
import {Player} from "./player.js";
import {fruitTouched, playerTouchEnemy, enemyCollision, projectileTouchPlayer, enemyProjectileCollision, playerTouchedFlag, playerTouchShell, shellTouchEnemy, shellTouchShell, trapTouched, shellTouchedBox, playerTouchBox} from "./collisions.js";
import { loadEnemies, loadFlag, loadFruits, loadObjects, loadPlayer, loadTraps } from "./loadfunctions.js";
import { flagStates, gameStates, levels } from "./constantEnums.js";





export class GameScene extends Phaser.Scene{
    constructor()
    {
        super({key : 'GameScene'});
        {
         // this.gameState=gameStates.RUN;
        }
       

    }

    init()
    {
      
      this.level=this.game.level;
      console.log(this.level);
      //levels[levelToLoad]
    }
/*
    init(levelToLoad)
{
   
  if (Object.entries(levelToLoad).length === 0)
  {
    //load first level
    //this.level=levels.LEVEL_1;
    this.level=levels.LEVEL_3;
  }
  
else
{
  this.level=levels[levelToLoad];
}
}
*/

preload() {

 
  //HERO
  this.load.spritesheet('frogIdle', 'src/assets/frog_Idle.png',{frameWidth: 32, frameHeight: 32});
  this.load.spritesheet('frogRun', 'src/assets/frog_Run.png',{frameWidth: 32, frameHeight: 32});
  this.load.spritesheet('frogDoubleJump', 'src/assets/frog_Double_Jump.png',{frameWidth: 32, frameHeight: 32});
  this.load.image('frogJump', 'src/assets/frog_Jump.png');
  this.load.spritesheet('frogWallJump','src/assets/frogWallJump.png', {frameWidth: 32, frameHeight: 32});
  this.load.spritesheet('frogDeath', 'src/assets/frog_Hit.png', {frameWidth: 32, frameHeight: 32});
  //MUSHROOM
  this.load.spritesheet('mushroomEnemyRun', 'src/assets/mushroom_Run.png', {frameWidth: 32, frameHeight: 32});
  this.load.spritesheet('mushroomEnemyHit', 'src/assets/mushroom_Hit.png', {frameWidth: 32, frameHeight: 32});
  //FLOWER
  this.load.spritesheet('plantEnemyIdle', 'src/assets/Plant/plant_Idle.png', {frameWidth: 44, frameHeight: 42});
  this.load.spritesheet('plantEnemyShoot', 'src/assets/Plant/plant_Attack.png', {frameWidth: 44, frameHeight: 42});
  this.load.spritesheet('plantEnemyDeath', 'src/assets/Plant/plant_Hit.png', {frameWidth : 44, frameHeight: 42});
  this.load.image('plantBullet', 'src/assets/Plant/bullet.png');
  //Snail Enemy
  this.load.spritesheet('snailEnemyIdle', 'src/assets/Snail/snail_Idle.png', {frameWidth:38, frameHeight : 24});
  this.load.spritesheet('snailEnemyWalk', 'src/assets/Snail/snail_Walk.png', {frameWidth:38, frameHeight : 24});
  this.load.spritesheet('snailEnemyHit', 'src/assets/Snail/snail_Hit.png', {frameWidth:38, frameHeight : 24});
// Snail Enemy Shell
  this.load.spritesheet('snailEnemyShellIdle', 'src/assets/Snail/snail_Shell_Idle.png', { frameWidth:38, frameHeight : 24});
  this.load.spritesheet('snailEnemyShellHitWall', 'src/assets/Snail/snail_Shell_Hit_Wall.png', { frameWidth:38, frameHeight : 24});
  this.load.spritesheet('snailEnemyShellHitTop', 'src/assets/Snail/snail_Shell_Hit_Top.png', { frameWidth:38, frameHeight : 24});
//Box
  this.load.image('box1Idle', 'src/assets/box/box1_idle.png');
  this.load.spritesheet('box1Hit','src/assets/box/box1_hit.png',{ frameWidth:28, frameHeight : 24} )
  this.load.image('boxPartTopLeft', 'src/assets/box/box1_upperLeft.png');
  this.load.image('boxPartTopRight', 'src/assets/box/box1_upperRight.png');
  this.load.image('boxPartBottomLeft', 'src/assets/box/box1_lowerLeft.png');
  this.load.image('boxPartBottomRight', 'src/assets/box/box1_lowerRight.png');

//Rock
this.load.spritesheet('rockEnemy1Idle','src/assets/rockEnemies/rockEnemy1_Idle.png',{frameWidth:38, frameHeight : 34});
this.load.spritesheet('rockEnemy1Run','src/assets/rockEnemies/rockEnemy1_Run.png',{frameWidth:38, frameHeight : 34});
this.load.image('rockEnemy1Hit','src/assets/rockEnemies/rockEnemy1_Hit.png');
//
this.load.spritesheet('rockEnemy2Idle','src/assets/rockEnemies/rockEnemy2_Idle.png',{frameWidth:32, frameHeight : 28});
this.load.spritesheet('rockEnemy2Run','src/assets/rockEnemies/rockEnemy2_Run.png',{frameWidth:32, frameHeight : 28});
this.load.image('rockEnemy2Hit','src/assets/rockEnemies/rockEnemy2_Hit.png');
//
this.load.spritesheet('rockEnemy3Idle','src/assets/rockEnemies/rockEnemy3_Idle.png',{frameWidth:22, frameHeight : 18});
this.load.spritesheet('rockEnemy3Run','src/assets/rockEnemies/rockEnemy3_Run.png',{frameWidth:22, frameHeight : 18});
this.load.spritesheet('rockEnemy3Hit','src/assets/rockEnemies/rockEnemy3_Hit.png', {frameWidth:22, frameHeight : 18});
//BEE ENEMY
this.load.spritesheet('beeEnemyIdle','src/assets/beeEnemy/beeEnemy_Idle.png',{frameWidth:36 , frameHeight : 34});
this.load.spritesheet('beeEnemyHit','src/assets/beeEnemy/beeEnemy_Hit.png',{frameWidth:36, frameHeight : 34});
this.load.spritesheet('beeEnemyAttack','src/assets/beeEnemy/beeEnemy_Attack.png',{frameWidth:36, frameHeight : 34});
this.load.image('beeEnemyBullet','src/assets/beeEnemy/beeEnemy_Bullet.png');
//RADISH ENEMY
this.load.spritesheet('radishEnemyAir','src/assets/radishEnemy/radishEnemy_Air.png',{frameWidth:30 , frameHeight : 38});
this.load.spritesheet('radishEnemyHit','src/assets/radishEnemy/radishEnemy_Hit.png',{frameWidth:30 , frameHeight : 38});
this.load.spritesheet('radishEnemyIdleGround','src/assets/radishEnemy/radishEnemy_Idle_Ground.png',{frameWidth:30 , frameHeight : 38});
this.load.spritesheet('radishEnemyRun','src/assets/radishEnemy/radishEnemy_Run.png',{frameWidth:30 , frameHeight : 38});
  //BACKGROUNDS
  this.load.image('blueBackground','src/assets/blue_Background.png');
  //TILES
  this.load.image("tiles", "./src/assets/tileset_Extruded.png");
  //this.load.image("tiles", "./src/assets/testassets.png");
  
  //FLAG
  this.load.image("flagIdle","./src/assets/flag_Idle.png");
  this.load.spritesheet("flagRaise", "src/assets/flag_Raise.png", {frameWidth: 64, frameHeight: 64});
  this.load.spritesheet("flagWave","./src/assets/flag_Idle_Wave.png", {frameWidth: 64, frameHeight: 64});
  //FRUITS
  this.load.spritesheet('orange',"./src/assets/orange.png", {frameWidth: 32, frameHeight: 32});
  this.load.spritesheet('banana',"./src/assets/fruits/banana.png", {frameWidth: 32, frameHeight: 32});
  this.load.spritesheet('apple',"./src/assets/fruits/apple.png", {frameWidth: 32, frameHeight: 32});
  this.load.spritesheet('strawberry',"./src/assets/fruits/strawberry.png", {frameWidth: 32, frameHeight: 32});
  //FRUIT COLLECTED
  this.load.spritesheet('fruitCollected','./src/assets/fruit_Collected.png', {frameWidth: 32, frameHeight: 32});
  //MAP
  this.load.tilemapTiledJSON(this.level.mapName,this.level.mapData);
  //TRAPS
  this.load.image('spikeTrap','./src/assets/traps/spike_Trap.png');
  this.load.image('spikeBallTrap','./src/assets/traps/spiked_Ball_Trap.png');
  this.load.image('spikeBallChain','./src/assets/traps/spiked_Ball_Chain.png');
 
  

}


create()
{


//INPUT
  this.cursors = this.input.keyboard.createCursorKeys();
  //PHYSICS GROUPS
  this.gameObjects=this.add.group();
  this.enemies=this.add.group();
  this.traps=this.physics.add.group({
    immovable: true,
    allowGravity: false
});
  this.projectiles=this.physics.add.group();
  this.shells=this.add.group();
  this.enemyColliders=this.add.group();
  this.fruits=this.physics.add.group({
     immovable: true,
     allowGravity: false
});
  this.objects=this.physics.add.group();

  //MAP
  this.map = this.make.tilemap({ key: this.level.mapName });

   //LAYERS

   

  const tileset = this.map.addTilesetImage("platformer_Assets","tiles",16,16,1,2);

   //background
  this.tileBackground = this.add.tileSprite(0,0,this.map.widthInPixels*2,this.map.heightInPixels*2,"blueBackground");

  const worldLayer = this.map.createStaticLayer("World", tileset, 0, 0);
  //const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
  

  const enemyCollisionLayer = this.map.createStaticLayer("enemyColliders",tileset,0,0);
  enemyCollisionLayer.setVisible(false);

 //COLLISIONS LAYERS
  worldLayer.setCollisionByProperty({ collides: true });
  enemyCollisionLayer.setCollisionByProperty({collides: true});


  //World bounds
  this.physics.world.bounds.width = this.map.widthInPixels;
  this.physics.world.bounds.height = this.map.heightInPixels;

  //gameState

  this.gameState=gameStates.RUN;

  //player

  loadPlayer({context:this,map:this.map});
 

  //ENEMIES

   loadEnemies({context:this,map:this.map})

   //FLAG
   loadFlag({context:this,map:this.map});

    //FRUITS
    loadFruits({context:this,map:this.map});

    //TRAPS
    loadTraps({context:this,map:this.map});

    //objects
    loadObjects({context:this,map:this.map});
    

  

//ANIMATIONS
this.anims.create({
  key: 'frogIdleAnim',
  frames: this.anims.generateFrameNumbers('frogIdle', { start: 0, end: 10 }),
  frameRate: 20,
  repeat: 0

});

this.anims.create({
  key: 'frogRunAnim',
  frames: this.anims.generateFrameNumbers('frogRun', { start: 0, end: 11 }),
  frameRate: 20,
  repeat: 0

});

this.anims.create({
  key: 'frogDoubleJumpAnim',
  frames: this.anims.generateFrameNumbers('frogDoubleJump', { start: 0, end: 5 }),
  frameRate: 20,
  repeat: 0
});

this.anims.create({
  key: 'frogWallJumpAnim',
  frames: this.anims.generateFrameNumbers('frogWallJump', { start: 0, end: 4}),
  frameRate: 50,
  repeat: 0
});

this.anims.create({
  key: 'frogDeathAnim',
  frames: this.anims.generateFrameNumbers('frogDeath', { start: 0, end: 6}),
  frameRate: 20,
  repeat: 0
});


//MUSHROOM
this.anims.create({
  key: 'mushroomEnemyRunAnim',
  frames: this.anims.generateFrameNumbers('mushroomEnemyRun', { start: 0, end: 15 }),
  frameRate: 20,
  repeat: 0
});

this.anims.create({
  key: 'mushroomEnemyHitAnim',
  frames: this.anims.generateFrameNumbers('mushroomEnemyHit', { start: 0, end: 4 }),
  frameRate: 15,
  repeat: 0
});


//Plant

this.anims.create({
  key: 'plantEnemyIdleAnim',
  frames: this.anims.generateFrameNumbers('plantEnemyIdle', { start: 0, end: 10 }),
  frameRate: 15,
  repeat: 0
});

this.anims.create({
  key: 'plantEnemyShootAnim',
  frames: this.anims.generateFrameNumbers('plantEnemyShoot', { start: 0, end: 7 }),
  frameRate: 15,
  repeat: 0
});

this.anims.create({
  key: 'plantDeathAnim',
  frames:this.anims.generateFrameNumbers('plantEnemyDeath',{start:0,end: 4}),
  frameRate: 15,
  repeat :0
});


//FLAG


this.anims.create({
  key: 'flagRaiseAnim', 
  frames: this.anims.generateFrameNumbers('flagRaise', {start :0, end :25}),
  frameRate: 20,
  repeat: 0

});

this.anims.create({
  key: 'flagWaveAnim', 
  frames: this.anims.generateFrameNumbers('flagWave', {start :0, end :9}),
  frameRate: 20,
  repeat: 0

});

//Fruits

this.anims.create({
  key : "orangeAnim",
  frames: this.anims.generateFrameNumbers('orange', {start :0, end :16}),
  frameRate : 20,
  repeat : 0
});

this.anims.create({
  key : "bananaAnim",
  frames: this.anims.generateFrameNumbers('banana', {start :0, end :16}),
  frameRate : 20,
  repeat : 0
});

this.anims.create({
  key : "appleAnim",
  frames: this.anims.generateFrameNumbers('apple', {start :0, end :16}),
  frameRate : 20,
  repeat : 0
});

this.anims.create({
  key : "strawberryAnim",
  frames: this.anims.generateFrameNumbers('strawberry', {start :0, end :16}),
  frameRate : 20,
  repeat : 0
});





this.anims.create({
  key : "fruitCollected",
  frames: this.anims.generateFrameNumbers('fruitCollected', {start : 0, end :5}),
  frameRate : 20,
  repeat : 0
});


//SNAIL

this.anims.create({
  key: 'snailEnemyIdleAnim',
  frames: this.anims.generateFrameNumbers('snailEnemyIdle', { start: 0, end: 14}),
  frameRate: 20,
  repeat: 0
});

this.anims.create({
  key: 'snailEnemyWalkAnim',
  frames: this.anims.generateFrameNumbers('snailEnemyWalk', { start: 0, end: 9}),
  frameRate: 20,
  repeat: 0
});

this.anims.create({
  key: 'snailEnemyHitAnim',
  frames: this.anims.generateFrameNumbers('snailEnemyHit', { start: 0, end: 4}),
  frameRate: 20,
  repeat: 0
});

//Snail Shell

this.anims.create({
  key: 'snailEnemyShellIdleAnim',
  frames: this.anims.generateFrameNumbers('snailEnemyShellIdle', { start: 0, end: 5}),
  frameRate: 20,
  repeat: -1
});

this.anims.create({
  key: 'snailEnemyShellHitWallAnim',
  frames: this.anims.generateFrameNumbers('snailEnemyShellHitWall', { start: 0, end: 3}),
  frameRate: 20,
  repeat: 0
});

this.anims.create({
  key: 'snailEnemyShellHitTopAnim',
  frames: this.anims.generateFrameNumbers('snailEnemyShellHitTop', { start: 0, end: 4}),
  frameRate: 20,
  repeat: 0
});



//Box

this.anims.create({
  key: 'box1HitAnim',
  frames: this.anims.generateFrameNumbers('box1Hit', { start: 0, end: 2}),
  frameRate: 20,
  repeat: 0
});

//Rock enemy 1
this.anims.create({
  key: 'rockEnemy1IdleAnim',
  frames: this.anims.generateFrameNumbers('rockEnemy1Idle', { start: 0, end: 13}),
  frameRate: 20,
  repeat: 0
});
this.anims.create({
  key: 'rockEnemy1RunAnim',
  frames: this.anims.generateFrameNumbers('rockEnemy1Run', { start: 0, end: 13}),
  frameRate: 20,
  repeat: 0
});


//Rock enemy 1
this.anims.create({
  key: 'rockEnemy2IdleAnim',
  frames: this.anims.generateFrameNumbers('rockEnemy2Idle', { start: 0, end: 12}),
  frameRate: 20,
  repeat: 0
});
this.anims.create({
  key: 'rockEnemy2RunAnim',
  frames: this.anims.generateFrameNumbers('rockEnemy2Run', { start: 0, end: 13}),
  frameRate: 20,
  repeat: 0
});
//rock enemy 3
this.anims.create({
  key: 'rockEnemy3IdleAnim',
  frames: this.anims.generateFrameNumbers('rockEnemy3Idle', { start: 0, end: 10}),
  frameRate: 20,
  repeat: 0
});
this.anims.create({
  key: 'rockEnemy3RunAnim',
  frames: this.anims.generateFrameNumbers('rockEnemy3Run', { start: 0, end: 13}),
  frameRate: 20,
  repeat: 0
});
this.anims.create({
  key: 'rockEnemy3HitAnim',
  frames: this.anims.generateFrameNumbers('rockEnemy3Hit', { start: 0, end: 4}),
  frameRate: 20,
  repeat: 0
});

//BEE ENEMY

this.anims.create({
  key: 'beeEnemyIdleAnim',
  frames: this.anims.generateFrameNumbers('beeEnemyIdle', { start: 0, end: 5}),
  frameRate: 20,
  repeat: 0
});

this.anims.create({
  key: 'beeEnemyAttackAnim',
  frames: this.anims.generateFrameNumbers('beeEnemyAttack', { start: 0, end: 7}),
  frameRate: 20,
  repeat: 0
});
this.anims.create({
  key: 'beeEnemyHitAnim',
  frames: this.anims.generateFrameNumbers('beeEnemyHit', { start: 0, end: 4}),
  frameRate: 20,
  repeat: 0
});


this.anims.create({
  key: 'radishEnemyAirAnim',
  frames: this.anims.generateFrameNumbers('radishEnemyAir', { start: 0, end: 5}),
  frameRate: 20,
  repeat: 0
});

this.anims.create({
  key: 'radishEnemyHitAnim',
  frames: this.anims.generateFrameNumbers('radishEnemyHit', { start: 0, end: 4}),
  frameRate: 20,
  repeat: 0
});

this.anims.create({
  key: 'radishEnemyIdleGroundAnim',
  frames: this.anims.generateFrameNumbers('radishEnemyIdleGround', { start: 0, end: 8}),
  frameRate: 20,
  repeat: 0
});

this.anims.create({
  key: 'radishEnemyRunAnim',
  frames: this.anims.generateFrameNumbers('radishEnemyRun', { start: 0, end: 11}),
  frameRate: 20,
  repeat: 0
});









// PLAYER
  //this.newPlayer = new Player({scene:this,x:100,y:100});


  //COLLIDERS
  //physics group
 
  //PLAYER
  this.physics.add.collider(this.enemies, this.newPlayer, playerTouchEnemy, null, this);
  this.physics.add.collider(this.newPlayer, worldLayer);
  this.physics.add.collider(this.newPlayer, this.objects, playerTouchBox, null, this);
  //ENEMIES
  this.physics.add.collider(this.enemies, worldLayer);
  this.physics.add.collider(this.enemies, this.enemies, enemyCollision, null, this);
  this.physics.add.collider(this.enemies,enemyCollisionLayer);
  //SHELL
  this.physics.add.collider(this.shells,worldLayer);
  this.physics.add.collider(this.objects,this.shells, shellTouchedBox, null, this);
  this.physics.add.collider(this.shells, this.newPlayer, playerTouchShell, null, this);
  this.physics.add.overlap(this.shells,this.enemies, shellTouchEnemy,null, this);
  this.physics.add.collider(this.shells,this.shells,shellTouchShell,null,this);
  //projectiles
  this.physics.add.collider(this.projectiles,worldLayer, enemyProjectileCollision, null, this);
  this.physics.add.overlap(this.projectiles,this.newPlayer,projectileTouchPlayer,null,this);
  //flag
  if (this.newFlag)
  {
    this.physics.add.collider(this.newFlag,worldLayer);
    this.physics.add.overlap(this.newPlayer,this.newFlag, playerTouchedFlag, null, this);
  }
  
  //FRUITS
  this.physics.add.overlap(this.newPlayer, this.fruits, fruitTouched, null, this);
 //TRAPS
 this.physics.add.overlap(this.newPlayer, this.traps, trapTouched, null, this);
 //objects
 this.physics.add.collider(this.objects, worldLayer);
 this.physics.add.collider(this.objects, this.enemies, enemyCollision, null, this);




  
  //CAMERA

  this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  this.cameras.main.setRoundPixels(true);
  this.cameras.main.startFollow(this.newPlayer, true);


  //this.cameras.main.fadeIn(2000, 0, 0, 0);
  
}


update(time)
{
  //GAMESTATE RUN
  if (this.gameState=== gameStates.RUN)
  {
    this.tileBackground.tilePositionY-=0.5;


    this.newPlayer.update({time : time, scene:this});
   
     this.gameObjects.getChildren().forEach((enemy)=>{
     enemy.update({time: time,scene:this});
    });

  }

  //GAMESTATE - PLAYER DIED
  if (this.gameState === gameStates.PLAYER_DEATH)
  {
    this.scene.stop(); 
    this.scene.start('LevelIntroScene'); 
  }
  //GAMESTATE STOP - LEVEL FINISHED
  if (this.gameState === gameStates.STOP)
  {
    this.scene.stop();
    this.loadNextLevel();
  }
   

  //TEST STATE TO RAISE FLAG
  if (this.newFlag)
  {
  if (this.newFlag.active)
   {
   if (time > 5000 && this.newFlag.state !== flagStates.ACTIVE)
     {
          this.newFlag.state = flagStates.ACTIVE;
     }
     
    }
      
}
}

loadNextLevel()
{
   console.log('level finished');

    this.game.level=levels[this.level.next];
    console.log(this.game.level);
    if (this.game.level.type==='Level')
    {
      this.scene.start('LevelIntroScene'); 
    }
    if (this.game.level.type==='end_Screen')
    {
      this.scene.start('LevelEndScene');
    }
    
}

}

