import { EnemyPlant } from "./assets/enemyPlant.js";
import { enemyTypes, mapObjectTypes, trapTypes } from "./constantEnums.js";
import { MushRoomEnemy } from "./enemyMushroom.js";
import { SnailEnemy } from "./enemySnail.js";
import { Flag } from "./flag.js";
import { Orange } from "./orange.js";
import { SpikeTrap } from "./spikeTrap.js";




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
      
        var enemyToAdd = addEnemyByType(enemy,config.context);

        if (enemyToAdd)
        {
            config.context.enemies.add(enemyToAdd);
        }
        

        });

        }

}



export function addEnemyByType(enemy,scene)
{
    switch (enemy.type)
    {
        case enemyTypes.MUSHROOM_ENEMY:
            {   
                    
                var newEnemy = new MushRoomEnemy({scene:scene,x:enemy.x+enemy.width/2,y:enemy.y-enemy.height/2});
                return newEnemy;   

            }

        case enemyTypes.FLOWER_ENEMY:
            {
                var newEnemy = new EnemyPlant({scene:scene,x:enemy.x+enemy.width/2,y:enemy.y-enemy.height/2});
                return newEnemy;
    
            }

            case enemyTypes.SNAIL_ENEMY:
            {
                var newEnemy = new SnailEnemy({scene:scene,x:enemy.x+enemy.width/2,y:enemy.y-enemy.height/2});
                return newEnemy;
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

    console.log(flagLocation);
    

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
            new Orange({scene:config.context,x:fruit.x+fruit.width/2,y:fruit.y-fruit.height/2});
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
        console.log(trapLocations);

        trapLocations.forEach(trap =>{

            var trapToAdd=addTrapByType(trap, config.context);

            if (trapToAdd)
            {
                console.log(trapToAdd);
                config.context.traps.add(trapToAdd);

            }
          });
      

    }



}

function addTrapByType(trap, scene)
{

    switch (trap.type)
    {
        case trapTypes.SPIKE_TRAP:
            {   
                    
                return new SpikeTrap({scene:scene,x:trap.x+trap.width/2,y:trap.y-trap.height/2});
            }



    }
    

}