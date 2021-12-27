import { fruitStates } from "./constantEnums.js";
import {Fruit} from "./fruit.js"

export class Banana extends Fruit
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'banana');
        this.state=fruitStates.ACTIVE;
        this.playCollectAnim=true;
        this.animationKey='bananaAnim';
    }


}

