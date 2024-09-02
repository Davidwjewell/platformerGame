import { fruitStates } from "./constantEnums.js";
import {Fruit} from "./fruit.js"

export class Melon extends Fruit
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'melon');
        this.state=fruitStates.ACTIVE;
        this.playCollectAnim=true;
        this.animationKey='melonAnim';
    }


}

