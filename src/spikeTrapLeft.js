import { Trap } from "./trap";

export class SpikeTrapLeft extends Trap
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'spikeTrapLeft');
        this.setSize(6,16);
        this.setOffset(10,0);
    }
}


