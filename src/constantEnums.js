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
    TARGET_IN_RANGE : "In_Range", //Player in range
    SHELL_ACTIVE : "Shell_Active", //Shell Moving
    SHELL_HIT_SIDE : "Shell_Hit_Side", // SHELL Side collision
    SHELL_HIT_TOP : "Shell_Hit_Top", //shell hit from top (Jumped on)
    RADISH_AIR : "Radish_Air", //radish enemy airborne
    RADISH_GROUND : "Radish enemy ground", //radish enemy ground
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
    BEE_ENEMY:"bee_Enemy",
    RADISH_ENEMY:"radish_Enemy",
    TRUNK_ENEMY: "trunk_Enemy"
}

export const levels={
    LEVEL_1:{
        name: 'Mad Mushrooms',
        type : 'Level',
        mapName : 'level1Map',
        mapData : 'src/assets/level_1.json',
        next : 'LEVEL_2'
    },
    LEVEL_2:{
        name : 'Kicking Snails',
        type : 'Level',
        mapName : 'level2Map',
        mapData : 'src/assets/level_2.json',
        next : 'LEVEL_3'
    },
    LEVEL_3:{
        name : 'Spike Ball Hell',
        type : 'Level',
        mapName : 'level3Map',
        mapData : 'src/assets/level_3.json',
        next : 'LEVEL_END'
    },
    LEVEL_4:{
        name : 'Level 4',
        type : 'Level',
        mapName : 'level4Map',
        mapData : 'src/assets/level_4.json',
        next : 'LEVEL_5'
    },
    LEVEL_5:{
        name : 'Level 5',
        type : 'Level',
        mapName : 'level5Map',
        mapData : 'src/assets/level_5.json',
        next : 'LEVEL_1'
    },
    LEVEL_END:
    {
        name: 'Level End',
        type: 'end_Screen'
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
    STOP : 'stop',
    PLAYER_DEATH: 'player_Death'
};

export const trapTypes = {
    SPIKE_TRAP : "spike_Trap",
    SPIKE_TRAP_RIGHT : "spike_Trap_Right",
    SPIKE_TRAP_LEFT : "spike_Trap_Left",
    SPIKED_BALL:  "spiked_Ball",
    SPIKED_BALL_CHAIN: "spike_Ball_Chain",
    SAW_TRAP : "saw_Trap"
};

export const fruitTypes ={
    ORANGE : "orange",
    BANANA : "banana",
    APPLE : "apple",
    STRAWBERRY : "strawberry"
};

export const objectTypes={
    BOX1 : 'box1',
    SPRING : 'spring_Object'
};

export const boxStates={
    HIT : "hit",
    IDLE : "idle",
    BROKEN : "broken"
};

export const springStates={
    IDLE : "idle",
    ACTIVE : "active"
};