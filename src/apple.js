import { fruitStates } from "./constantEnums.js";
import {Fruit} from "./fruit.js"

export class Apple extends Fruit
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'apple');
        this.state=fruitStates.ACTIVE;
        this.playCollectAnim=true;
        this.animationKey='appleAnim';
    }


}

