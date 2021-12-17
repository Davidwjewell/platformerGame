import { flagStates } from "./constantEnums";

export function checkRemainingFruit(scene)
{
   
    if (scene.fruits.getLength() === 0)
    {       
        scene.newFlag.state=flagStates.RAISE;

    }
}

