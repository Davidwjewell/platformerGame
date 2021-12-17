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
    DEATH : "Death"     //Death
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
    SNAIL_ENEMY_SHELL:"snail_Enemy_Shell"
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
        mapData : 'src/assets/level_2.json'
    }
}


export const mapObjectTypes={
    ENEMY: 'enemy',
    FLAG : 'flag',
    FRUIT : 'fruits',
    TRAPS : 'traps'
}

export const gameStates= {
    RUN: 'run',
    STOP : 'stop'
};

export const trapTypes = {
    SPIKE_TRAP : "spike_Trap"
};
