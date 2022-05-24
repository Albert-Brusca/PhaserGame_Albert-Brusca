import back from '../assets/back-pixel.png'
import left from '../assets/keys/left.png'
import right from '../assets/keys/right.png'
import space from '../assets/keys/spacebar.png'
class Controls extends Phaser.Scene {
    constructor () {
        super('Controls');
    }

    preload() {
        this.load.image('back', back);
        this.load.image('left', left);
        this.load.image('right', right);
        this.load.image('space', space);
    }
    create() {
        this.cameras.main.setBackgroundColor('#000');

        this.add.text(240, 100, 'Controls', { fontSize: '32px'});
        
        this.add.text(100, 200, 'Left', {fontSize: '26px'});

        const leftKey = this.add.image(130,280, 'left')
        leftKey.setScale(0.1);

        this.add.text(450, 200, 'Right', {fontSize: '26px'});

        const rightKey = this.add.image(490,280, 'right')
        rightKey.setScale(0.1);
        
        this.add.text(280,300, 'Jump', {fontSize: '26px'});

        const spacebar = this.add.image(310,380, 'space')
        spacebar.setScale(0.1);

        const button1 = this.add.image(50,450, 'back')
        button1.setScale(0.3);
        button1.setInteractive();
        button1.on('pointerdown',function () {
            
            this.scene.start('TitleScene');
    
        }, this);

       // document.getElementsByClassName('game-over')[0].classList.add('visible');
    }
    
}

export default Controls;