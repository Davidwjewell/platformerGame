import { EnemyPlant } from "./assets/enemyPlant.js";
import { enemyTypes, fruitTypes, mapObjectTypes, objectTypes, trapTypes } from "./constantEnums.js";
import { MushRoomEnemy } from "./enemyMushroom.js";
import { SnailEnemy } from "./enemySnail.js";
import { Flag } from "./flag.js";
import { Orange } from "./orange.js";
import { SpikeTrap } from "./spikeTrap.js";
import { Banana } from "./banana.js";
import { Box, Box1 } from "./box.js";
import { SpikeBallTrap } from "./spikeBallTrap.js";
import { SpikeBallChain } from "./spikeBallChain.js";
import { RockEnemy1, RockEnemy2, RockEnemy3 } from "./rockEnemy.js";
import { Apple } from "./apple.js";
import { Player } from "./player.js";
import { BeeEnemy } from "./beeEnemy.js";



export function loadPlayer(config)
{

    var playerStartLocation;

    if (config.map.objects)
    {
        playerStartLocation=config.map.getObjectLayer('player')['objects'][0];
        if (playerStartLocation)
        {
            config.context.newPlayer = new Player({scene:config.context,x:playerStartLocation.x,y:playerStartLocation.y});
        }
        console.log(playerStartLocation);
    }
}


export function loadEnemies(config)
{


    var enemySpawnLocations;
   
   //check map fo object layer
    if (config.map.objects)
    {
      
        //check for enemy layer
        for (var i=0; i<config.map.objects.length;i++)
        {
            if (config.map.objects[i].name === mapObjectTypes.ENEMY)
            {
                 //if exists 
                enemySpawnLocations=config.map.getObjectLayer('enemy')['objects'];


            }

        }     
          
    }


    
  
    if (enemySpawnLocations)
    {
      
    enemySpawnLocations.forEach(enemy => {
      
        addEnemyByType(enemy,config.context);

        });

        }

}



export function addEnemyByType(enemy,scene)
{
    switch (enemy.type)
    {
        case enemyTypes.MUSHROOM_ENEMY:
            {   
                    
                new MushRoomEnemy({scene:scene,x:enemy.x+enemy.width/2,y:enemy.y-enemy.height/2});
                break;   

            }

        case enemyTypes.FLOWER_ENEMY:
            {
                new EnemyPlant({scene:scene,x:enemy.x+enemy.width/2,y:enemy.y-enemy.height/2});
                break;
    
            }

            case enemyTypes.SNAIL_ENEMY:
            {
                new SnailEnemy({scene:scene,x:enemy.x+enemy.width/2,y:enemy.y-enemy.height/2});
                break;
            }
            case enemyTypes.ROCK_ENEMY1:
            {
                console.log(enemy);
                new RockEnemy1({scene:scene,x:enemy.x+enemy.width/2,y:enemy.y-enemy.height/2});
                break;
                
            }
            case enemyTypes.ROCK_ENEMY2:
                {
                   // console.log(enemy);
                    new RockEnemy2({scene:scene,x:enemy.x+enemy.width/2,y:enemy.y-enemy.height/2});
                    break;
                    
                }
            case enemyTypes.ROCK_ENEMY3:
                {
                    //console.log(enemy);
                    new RockEnemy3({scene:scene,x:enemy.x+enemy.width/2,y:enemy.y-enemy.height/2});
                    break;
                        
                }
            case enemyTypes.BEE_ENEMY:
                {
                    new BeeEnemy({scene:scene,x:enemy.x+enemy.width/2,y:enemy.y-enemy.height/2});
                    break;
                }
            
        
    }


}


export function loadFlag(config)
{

    var flagLocation;

    if (config.map.objects)
    {
        for (var i=0; i<config.map.objects.length;i++)
        {
            if (config.map.objects[i].name === mapObjectTypes.FLAG)
            {
                 //if exists 
                flagLocation=config.map.getObjectLayer('flag')['objects'];
               
            }

        }     

    }


    if (flagLocation)
    {   
        console.log('flag added');
    
        flagLocation.forEach(flag =>{
           
            config.context.newFlag = new Flag({scene:config.context,x:flag.x+flag.width/2,y:flag.y-flag.height/2});
          });
      
    }

    
}

export function loadFruits(config)
{

    var fruitLocations;
    if (config.map.objects)
    {

        for (var i=0; i<config.map.objects.length;i++)
        {
            if (config.map.objects[i].name === mapObjectTypes.FRUIT)
            {
                 //if exists 
                 fruitLocations = config.map.getObjectLayer('fruits')['objects'];
               
            }

        }     

    }
    

    if (fruitLocations)
    {
        fruitLocations.forEach(fruit =>{
            switch (fruit.type)
            {
                case fruitTypes.ORANGE:
                    {
                       // console.log('new orange');
                        new Orange({scene:config.context,x:fruit.x+fruit.width/2,y:fruit.y-fruit.height/2});
                        break;
                    }
                case fruitTypes.BANANA:
                    {
                       // console.log('new banana')
                        new Banana({scene:config.context,x:fruit.x+fruit.width/2,y:fruit.y-fruit.height/2});
                        break;
                    }
                    case fruitTypes.APPLE:
                        {
                            console.log('new apple')
                            new Apple({scene:config.context,x:fruit.x+fruit.width/2,y:fruit.y-fruit.height/2});
                            break;
                        }    

            }
            
          });
      

    }
   

}

export function loadTraps(config)
{
    var trapLocations;

    if (config.map.objects)
    {

        for (var i=0; i<config.map.objects.length;i++)
        {
            if (config.map.objects[i].name === mapObjectTypes.TRAPS)
            {
                 //if exists 
                 trapLocations = config.map.getObjectLayer('traps')['objects'];
               
            }

         

        }     

    }
    

    if (trapLocations)
    {
       

        trapLocations.forEach(trap =>{

            addTrapByType(trap, config.context);

    
        });
      

    }



}

function addTrapByType(trap, scene)
{

    switch (trap.type)
    {
        case trapTypes.SPIKE_TRAP:
            {   
                    
                new SpikeTrap({scene:scene,x:trap.x+trap.width/2,y:trap.y-trap.height/2});
                break;
            }

        case trapTypes.SPIKED_BALL:
        {
            //console.log(trap);
            var angle=trap.properties[0].value;
            var centerX=trap.properties[1].value;
            var centerY=trap.properties[2].value;
            var distToCenter=trap.properties[3].value;
            new SpikeBallTrap({scene:scene,x:trap.x+trap.width/2,y:trap.y-trap.height/2,angle:angle,centerX:centerX,centerY:centerY,distToCenter:distToCenter});
            break;

        }   
        case trapTypes.SPIKED_BALL_CHAIN:
        {
            //console.log(trap);
           // console.log('chain link');
            var angle=trap.properties[0].value;
            var centerX=trap.properties[1].value;
            var centerY=trap.properties[2].value;
            var distToCenter=trap.properties[3].value;

            new SpikeBallChain({scene:scene,x:trap.x+trap.width/2,y:trap.y-trap.height/2,angle:angle,centerX:centerX,centerY:centerY,distToCenter:distToCenter});
            break;
        } 



    }

    
}

export function loadObjects(config)
{
    var objectLocations;

    if (config.map.objects)
    {

        for (var i=0; i<config.map.objects.length;i++)
        {
            if (config.map.objects[i].name === mapObjectTypes.OBJECTS)
            {
                 //if exists 
                 objectLocations = config.map.getObjectLayer('objects')['objects'];
               
            }

        }     

    }

    if (objectLocations)
    {

        objectLocations.forEach(object =>{
        addObjectByType(object, config.context);
            
        });
      

    }



}

function addObjectByType(object, scene)
{
   
    if (object)
    {
        switch (object.type)
        {
            case objectTypes.BOX1 :
                {
                    new Box1({scene:scene,x:object.x+object.width/2,y:object.y-object.height/2});

                }

        }


    }


}