import WebFontFile from "./webFontFile";

export class LevelEndScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'LevelEndScene' });
    }

    init()
    {
         
        console.log('game end');

    }

    preload ()
    {
        const fonts = new WebFontFile(this.load, 'Sedgwick Ave');
		this.load.addFile(fonts);
    }

    create ()
    {
        
    let { width, height } = this.sys.game.canvas;
    let centerX=Math.round(width/2);
    let centerY=Math.round(height/3);
    let thankYouText="Thanks for playing!" 

    this.text=this.add.text(centerX, centerY, thankYouText, {
        fontFamily: '"Sedgwick Ave", cursive',
        fontSize: '24px',
        color: '#FFFFFF',
        align: 'center'
    }).setOrigin(0.5);

    

    this.time.addEvent({
        delay: 3000,
        callback: this.loadNextScreen,
        callbackScope: this,
        loop: false
    });
       
    }

    loadNextScreen()
    {
        
        this.text.setVisible(false);
        const { width, height } = this.sys.game.canvas;
        const centerX=Math.round(width/2);
        const centerY=Math.round(height/3);
        const playTestersText="\n Play Testers\n CreamLord \n Aksionnz \n Howzit";

        this.add.text(centerX, centerY, playTestersText, {
            //fontFamily: '"Sedgwick Ave", cursive',
            //fontSize: '24px',
            font: '16px Courier',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);


    }



}