import { fruitStates } from "./constantEnums.js";
import {Fruit} from "./fruit.js"

export class Strawberry extends Fruit
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'strawberry');
        this.state=fruitStates.ACTIVE;
        this.playCollectAnim=true;
        this.animationKey='strawberryAnim';
    }


}

