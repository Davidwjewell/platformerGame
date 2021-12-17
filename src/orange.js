import { fruitStates } from "./constantEnums.js";
import {Fruit} from "./fruit.js"
import { checkRemainingFruit } from "./gameLogic.js";

export class Orange extends Fruit
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'orange');
        this.state=fruitStates.ACTIVE;
        this.playCollectAnim=true;

    }

    update(config)
    {
        if (this.state===fruitStates.ACTIVE)
        {
            this.anims.play('orangeAnim', true);
        }

        if (this.state === fruitStates.TOUCHED)
        {
            if (this.playCollectAnim)
            {
                this.playCollectAnim=false;
                this.anims.play('fruitCollected', false).once('animationcomplete' , ()=>{
                this.state = fruitStates.DISABLED;
            });
            }
        }

        if (this.state === fruitStates.DISABLED)
        {
            this.destroy();
            checkRemainingFruit(config.scene);
        }


        
    }


}