import { Trap } from "./trap";

export class SpikeTrap extends Trap
{
    constructor(config)
    {
        super(config.scene,config.x,config.y,'spikeTrap');

    }
}
