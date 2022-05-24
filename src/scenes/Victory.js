import retry from '../assets/replay.png'
class Victory extends Phaser.Scene {
    constructor () {
        super('Victory');
    }

    preload() {
        this.load.image('retry', retry);
        document.getElementById("score").style.visibility = "hidden";
        document.getElementById("lives").style.visibility = "hidden";
    }
    init(data) {
        this.score = data.score;
    }
    create() {
        this.cameras.main.setBackgroundColor('#000');

        this.add.text(240, 200, 'Victory', { fontSize: '32px'});

            
        this.add.text(225,250, 'Final score: '+ this.score, { fontSize: '20px'});

        const button1 = this.add.image(330,350, 'retry')
        button1.setScale(0.4);
        button1.setInteractive();
        button1.on('pointerdown',function () {
            var els=document.getElementsByClassName('score-amount')[0];
            els.innerHTML = "0";
            var livesElement = document.getElementsByClassName('lives-amount')[0];
        
            livesElement.innerHTML = "3";
            this.scene.start("MyGame");
            
    
        }, this);

       // document.getElementsByClassName('game-over')[0].classList.add('visible');
    }
    
}

export default Victory;