export const directionsToMove={
    LEFT : "left",
    RIGHT : "right",
    UP : "up",
    DOWN : "down"
};


export const enemyStates={
    IDLE : "Idle",      //Idle state
    ACTIVE : "Active",  // Active enemy 
    HIT : "Hit",        //Enemy hit
    SLEEP : "Sleep",    //Enemy has taken hit and is in idle state
    SHOOT : "Shoot",    //Shoot projectile
    SHELL_IDLE : "Shell_Idle", //Shell Idle
    SHELL_ACTIVE : "Shell_Active", //Shell Moving
    SHELL_HIT_SIDE : "Shell_Hit_Side", // SHELL Side collision
    SHELL_HIT_TOP : "Shell_Hit_Top", //shell hit from top (Jumped on)
    DEATH : "Death",     //Death
    SPAWN : "Spawn",     //Rock enemy spawn new enemies once hit
    HIT_STATE: "Hit_State" // rock enemy state used to show sprite
};

export const projectileStates={
    ACTIVE : "Active",
    COLLLIDE : "Collide"
};


export const flagStates={
    IDLE:"Idle",
    RAISE:"Raise",
    ACTIVE:"Active"
};

export const fruitStates={
    ACTIVE: "Active",
    TOUCHED: "Touched",
    DISABLED : "Disabled"
}

export const enemyTypes={
    MUSHROOM_ENEMY: "mushroom_Enemy",
    FLOWER_ENEMY:"flower_Enemy",
    SNAIL_ENEMY:"snail_Enemy",
    SNAIL_ENEMY_SHELL:"snail_Enemy_Shell",
    ROCK_ENEMY1:"rock_enemy_1",
    ROCK_ENEMY2:"rock_enemy_2",
    ROCK_ENEMY3:"rock_enemy_3",
    BEE_ENEMY:"bee_Enemy"
}

export const levels={
    LEVEL_1:{
        name: 'Level 1',
        mapName : 'level1Map',
        mapData : 'src/assets/level_1.json',
        next : 'LEVEL_2'
    },
    LEVEL_2:{
        name : 'Level 2',
        mapName : 'level2Map',
        mapData : 'src/assets/level_2.json',
        next : 'LEVEL_3'
    },
    LEVEL_3:{
        name : 'Level 3',
        mapName : 'level3Map',
        mapData : 'src/assets/level_3.json',
        next : 'LEVEL_1'
    }
}


export const mapObjectTypes={
    ENEMY: 'enemy',
    FLAG : 'flag',
    FRUIT : 'fruits',
    TRAPS : 'traps',
    OBJECTS : 'objects',
    PLAYER_START : 'player_Start'
}

export const gameStates= {
    RUN: 'run',
    STOP : 'stop'
};

export const trapTypes = {
    SPIKE_TRAP : "spike_Trap",
    SPIKED_BALL:  "spiked_Ball",
    SPIKED_BALL_CHAIN: "spike_Ball_Chain"
};

export const fruitTypes ={
    ORANGE : "orange",
    BANANA : "banana",
    APPLE : "apple"
};

export const objectTypes={
    BOX1 : 'box1'
};

export const boxStates={
    HIT : "hit",
    IDLE : "idle",
    BROKEN : "broken"
};