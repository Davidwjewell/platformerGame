import { boxStates, directionsToMove, enemyStates, enemyTypes, flagStates, fruitStates, projectileStates } from "./constantEnums";
import { checkRemainingFruit } from "./gameLogic";

export function playerTouchShell(enemy,player)
{
  //If Type is snail shell
  if (enemy.type === enemyTypes.SNAIL_ENEMY_SHELL)  
  {
      if (enemy.state !==enemyStates.SHELL_HIT_TOP)
      {
      //IF player jumps on shell
      if (player.body.touching.down)  
      { 

          //IF shell not moving (Idle) then kill 
          if(enemy.state === enemyStates.SHELL_IDLE)
          {
              console.log('set state shell hit top');
              enemy.state = enemyStates.SHELL_ACTIVE;
         
          }
          //if shell is moving then set idle (stop moving)
          else if (enemy.state === enemyStates.SHELL_ACTIVE)
          {
              console.log('set idle');
              enemy.setVelocity(0);
              enemy.state = enemyStates.SHELL_IDLE;
          }
       // HOLDING UP DOUBLE JUMP
       if (this.cursors.up.isDown)
       {
           player.setVelocityY(-500);
       }
       // REGULAR JUMP
       else
       {
           console.log('not holding');
           player.setVelocityY(-200);
       }
      
       return;
      
      }
      //IF player touched idle shell
      //apply velocity
      if (enemy.state === enemyStates.SHELL_IDLE)
      {
          if (player.body.touching.right)
          {
              
              //enemy.body.setVelocityX(this.speed);
              enemy.directionMoving=directionsToMove.RIGHT;
              enemy.state = enemyStates.SHELL_ACTIVE;
          }
          if (player.body.touching.left)
          {
             enemy.directionMoving=directionsToMove.LEFT;
              enemy.state=enemyStates.SHELL_ACTIVE;
          }

          return;

      }
           console.log('death');
           player.death = true;
      

      }

       //

      }

}


export function shellTouchEnemy(shell,enemy)
{
    if (enemy.state !== enemyStates.HIT)
    {
        enemy.state=enemyStates.HIT;
    }
    

}

export function shellTouchShell(shell1,shell2)
{
  
    if (shell1.state !== enemyStates.SHELL_HIT_SIDE)
    {
        shell1.state = enemyStates.SHELL_HIT_SIDE;

    }

    if (shell2.state !== enemyStates.SHELL_HIT_SIDE)
    {
        shell2.state = enemyStates.SHELL_HIT_SIDE;
    }




}

export function playerTouchEnemy(enemy,player)
{ 


      
         //if enemy not in hit state
        if (enemy.state !== enemyStates.HIT)
        {
        //player jumps on top
        if (player.body.touching.down)  
        {
         enemy.state = enemyStates.HIT;
         enemy.isHit=true;
         // HOLDING UP DOUBLE JUMP
         if (this.cursors.up.isDown)
         {
             player.setVelocityY(-500);
         }
         // REGULAR JUMP
         else
         {            
            player.setVelocityY(-200);
         }
         //ENEMY STATE HIT 
 
     }
     //player touched by enemy 
     //set as dead
         else
 
         {
             console.log(enemy);
             console.log('death');
             player.death = true;
 
         }   
   }
    

}

export function fruitTouched(player,fruit)
{

    if (fruit.state === fruitStates.ACTIVE)
    {
        fruit.body.enable = false;
        fruit.state = fruitStates.TOUCHED;
    }

    //checkRemainingFruit(this);


}

export function playerTouchedFlag(player,flag)
{
    
    if (flag.state===flagStates.ACTIVE)
    {
        flag.flagTouched=true;
    }


}


export function enemyCollision(enemy1, enemy2)
{

    //create array for testing
    var enemyArray=[];
    enemyArray.push(enemy1);
    enemyArray.push(enemy2);
    //ITERATE AND TEST FOR EACH ENEMY

    for (var i=0; i<enemyArray.length; i++)
        {
              //IF MOVING LEFT GO RIGHT
        if (enemyArray[i].directionMoving === directionsToMove.LEFT)
            {
            enemyArray[i].directionMoving = directionsToMove.RIGHT;
            }
            //MOVING RIGHT GO LEFT
        else
            {
            enemyArray[i].directionMoving=directionsToMove.LEFT;
            }           

        }
  
}


export function projectileTouchPlayer(player, projectile)
{
    
    //set player as dead
    player.death = true; 
    //set projectile as touched


}

export function playerTouchBox(player, box)
{
    if (player.body.touching.up)
    {
        if (box.state !== boxStates.HIT)
        {
            box.state = boxStates.HIT;
        }
        
    }


}

export function enemyProjectileCollision(projectile)
{
    projectile.state = projectileStates.COLLLIDE;

}

export function trapTouched(player)
{
    console.log('trap');
      //set player as dead
      player.death = true; 

}

export function shellTouchedBox(shell,box)
{   
   if (box.state !== boxStates.HIT)
   {
        box.state = boxStates.HIT;
   }
    
}