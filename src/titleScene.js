import { NONE } from 'phaser';
import logoImg from './assets/logo.png'
import playButton from './assets/start-pixel.png'
import controlsButton from './assets/controls-pixel.png'
import github from './assets/github.png'

class TitleScene extends Phaser.Scene {

	constructor ()
    {
        super('TitleScene');
    }

    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('playbutton', playButton);
        this.load.image('controls', controlsButton);
        this.load.image('controls', controlsButton);
        this.load.image('github', github);
        

    }
      
    create ()
    {

        this.cameras.main.setBackgroundColor('#87F5FB');        
        
        const logo = this.add.image(320, 130, 'logo');
        logo.setScale(0.11);

        this.add.text(450, 230, "by Albert Brusca", {color: "black", mode: Phaser.Scale.ScaleModes.FIT});
        

        const button1 = this.add.image(320,350, 'playbutton')
        button1.setScale(0.2);
        button1.setInteractive();
        button1.on('pointerdown',function () {
            
            this.scene.start('MyGame');
    
        }, this);

        const button2 = this.add.image(330,450, 'controls')
        button2.setScale(0.45);
        button2.setInteractive();
        button2.on('pointerdown',function () {
            
            this.scene.start('Controls');
    
        }, this);

        const button3 = this.add.image(530,430, 'github')
        button3.setScale(0.17);
        button3.setInteractive();
        button3.on('pointerdown',function () {
            
            window.open('https://github.com/Albert-Brusca/PhaserGame_Albert-Brusca');
    
        }, this);

    }


}
export default TitleScene;
