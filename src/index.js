import Phaser from 'phaser';

import TitleScene from './titleScene.js'
import Controls from './scenes/Controls.js'
import MyGame from './scenes/MyGame.js'
import SecondLevel from './scenes/SecondLevel.js'
import GameOver from './scenes/GameOver.js'
import Victory from './scenes/Victory.js'

const config = {
    type: Phaser.AUTO,
    parent: 'mario',
    width: 640,
    height: 480,
    backgroundColor: '#FFFFAC',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 }
        }
    },
    scene: [TitleScene, Controls, MyGame, SecondLevel, Victory, GameOver,]
};

new Phaser.Game(config);

