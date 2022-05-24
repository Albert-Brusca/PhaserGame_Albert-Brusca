
import Player from '../gameObjects/Player';
import Coin from '../gameObjects/Coin'
import tiles from './../assets/image/tiles.png'
import map from './../assets/mapa.json'
import atlas from './../assets/image/mario-atlas.png'
import atlasmario from './../assets/image/mario-atlas.json'

import generateAnimations from '../config/animations'
import Enemies from '../gameObjects/Enemies';
import decreaseLives from '../ui/decreaseLives'


class MyGame extends Phaser.Scene
{
    
    constructor ()
    {
        super('MyGame');
        
    }

    preload ()
    {
        this.load.image('tiles', tiles);
        this.load.tilemapTiledJSON('map', map)
        this.load.atlas('atlas', atlas, atlasmario);
        this.load.on('complete', () => {
            generateAnimations(this);
        });
        document.getElementById("score").style.visibility = "visible";
        document.getElementById("lives").style.visibility = "visible";
        var scoreElement = document.getElementsByClassName('score-amount')[0];
            
        scoreElement.innerText="0";

        this.load.audio("main", ["assets/music/mygame.mp3"]);
        this.load.audio("1down", ["assets/music/1down.mp3"]);
        this.load.audio("pipe", ["assets/music/pipe.mp3"]);
        this.load.audio("coin", ["assets/music/coin.mp3"]);


    }

      
    create ()
    {

        this.music = this.sound.add("main", {loop: true});

        this.music.play();

        this.d1 = this.sound.add("1down", {loop: false});
        this.pipeM = this.sound.add("pipe", {loop: false});
        this.coinM = this.sound.add("coin", {loop: false});
        
    
        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('tileset', 'tiles');
        this.platform = this.map.createLayer('platform', this.tileset, 0, 0);
        this.invisible = this.map.createLayer('invisible', this.tileset, 0, 0);
        this.pipe = this.map.createLayer('pipe', this.tileset, 0, 0);
        this.down = this.map.createLayer('out', this.tileset, 0, 0);


        this.map.createLayer('background', this.tileset, 0, 0);
        this.platform.setCollisionByExclusion(-1, true);
        this.invisible.setCollisionByExclusion(-1, true);
        this.down.setCollisionByExclusion(-1, true);
        this.invisible.visible = false;
        this.down.visible = false;
        this.pipe.setCollisionByExclusion(-1, true);

        this.player = new Player(this, 25, 400);
        this.coins = new Coin(this).collideWith(this.player.sprite);
        this.enemies = new Enemies(this);

        this.inputs = this.input.keyboard.createCursorKeys();

      
    }

    update (){
        this.player.update(this.inputs);
        this.coins.update();
        this.enemies.update();

    }

    nextLevel () {
        this.music.stop();
        this.pipeM.play();
        var scoreElement = document.getElementsByClassName('score-amount')[0];
        
        var currentScore = scoreElement.innerText;

        var livesElement = document.getElementsByClassName('lives-amount')[0];
        
        var currentLives = livesElement.innerText;
        
        this.scene.start('SecondLevel', { score: currentScore, lives: currentLives});
        
        
    }
    gameOver () {
        this.music.stop();
        decreaseLives(1);
        const livesElement = document.getElementsByClassName('lives-amount')[0];
        const currentLives = Number(livesElement.innerText);


        if (currentLives>0) {
            this.d1.play();
            
            setTimeout(() => {
            
                this.scene.restart("MyGame");
        
            }, 3000);
            
        } else {
            setTimeout(() => {
                var scoreElement = document.getElementsByClassName('score-amount')[0];
            
                var currentScore = scoreElement.innerText;
    
                this.scene.start('GameOver', { score: currentScore});
        
            }, 1500);
        }
        
    }


}

export default MyGame;