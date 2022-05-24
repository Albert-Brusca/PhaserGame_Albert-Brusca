
import Player from '../gameObjects/Player2';
import Coin from '../gameObjects/Coin'
import tiles from './../assets/image/tiles.png'
import atlas from './../assets/image/mario-atlas.png'
import atlasmario from './../assets/image/mario-atlas.json'

import generateAnimations from '../config/animations'
import Enemies from '../gameObjects/Enemies2';
import map from './../assets/mapa2.json'
import Flag from '../gameObjects/Flag';

class SecondLevel extends Phaser.Scene
{
    
    constructor ()
    {
        super('SecondLevel');
        
    }

    preload ()
    {

        this.load.image('tiles', tiles);
        this.load.tilemapTiledJSON('map2', map)
        
        this.load.atlas('atlas', atlas, atlasmario);
        this.load.on('complete', () => {
            generateAnimations(this);
        });
        document.getElementById("score").style.visibility = "visible";
        

    }
    init(data) {
        this.score = data.score;
    }

    create ()
    {
        this.map = this.make.tilemap({ key: 'map2' });
        this.tileset = this.map.addTilesetImage('tileset', 'tiles');
        this.platform = this.map.createLayer('platform', this.tileset, 0, 0);
        this.invisible = this.map.createLayer('invisible', this.tileset, 0, 0);
        this.down = this.map.createLayer('out', this.tileset, 0, 0);

        this.map.createLayer('background', this.tileset, 0, 0);
        this.platform.setCollisionByExclusion([-1, 450], true);
        this.invisible.setCollisionByExclusion(-1, true);
        this.invisible.visible = false;
        this.down.setCollisionByExclusion(-1, true);

        this.player = new Player(this, 50, 400);
        this.coins = new Coin(this).collideWith(this.player.sprite);
        this.enemies = new Enemies(this);
        this.flag= new Flag(this);

        this.inputs = this.input.keyboard.createCursorKeys();

    }

    update (){
        this.player.update(this.inputs);
        this.coins.update();
        this.enemies.update();
    }


    gameOver () {
        setTimeout(() => {
            var scoreElement = document.getElementsByClassName('score-amount')[0];
        
            var currentScore = scoreElement.innerText;
            this.scene.start('GameOver', { score: currentScore});
    
        }, 1500);
    }

    victory () {
        setTimeout(() => {
            var scoreElement = document.getElementsByClassName('score-amount')[0];
        
            var currentScore = scoreElement.innerText;
            this.scene.start('Victory', { score: currentScore});
    
        }, 1500);
    }
}

export default SecondLevel;