import { levels } from "./constantEnums";
import WebFontFile from "./webFontFile";

export class LevelIntroScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'LevelIntroScene' });
    }

    init()
    {
        this.level=this.game.level;    
        console.log('intro scene');

    }

    preload ()
    {
        const fonts = new WebFontFile(this.load, 'Sedgwick Ave');
		this.load.addFile(fonts);
    }

    create ()
    {
        
    const { width, height } = this.sys.game.canvas;
    const centerX=Math.round(width/2);
    const centerY=Math.round(height/3);
    const levelName=this.level.name;

    

    this.add.text(centerX, centerY, levelName, {
        fontFamily: '"Sedgwick Ave", cursive',
        fontSize: '24px',
        color: '#FFFFFF',
    }).setOrigin(0.5);



    this.time.addEvent({
        delay: 1500,
        callback: this.loadMainScene,
        callbackScope: this,
        loop: false
    });
       
    }

    loadMainScene()
    {
        this.cameras.main.fadeOut(1000, 0, 0, 0).on('camerafadeoutcomplete',()=>{
            this.scene.stop();
            this.scene.start('GameScene'); 
        });

       
    }

}