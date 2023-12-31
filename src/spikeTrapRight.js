import { Trap } from "./trap";

export class SpikeTrapRight extends Trap
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'spikeTrapRight');
        this.setSize(6,16);
        this.setOffset(0,0);
    }
}


