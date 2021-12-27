import { fruitStates } from "./constantEnums.js";
import {Fruit} from "./fruit.js"

export class Orange extends Fruit
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'orange');
        this.state=fruitStates.ACTIVE;
        this.playCollectAnim=true;
        this.animationKey='orangeAnim';
    }


}

