import increaseScore from '../ui/increaseScore'

class Coin {
    constructor(scene) {
        this.scene = scene;
        this.coins = scene.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        const coinSprites = scene.map.createFromObjects('coins');
        
        for (const coin of coinSprites) {
            coin.setTexture('atlas')
                .setScale(1)
                .setOrigin(0)
                .setDepth(-1);
            
            this.coins.add(coin);    
        }
    }
    collideWith(gameObject) {
        for (const coin of this.coins.children.entries) {
            coin.collider = this.scene.physics.add.overlap(coin, gameObject, this.collect, null, this);
        }

        return this;
    }

    update() {
        for (const coin of this.coins.children.entries) {
            coin.play('rotate', true);
        }
    }

    collect(coin) {
        for (const coin of this.coins.children.entries) {
            if (!coin.body.touching.none) {
                coin.body.setEnable(false);
                this.scene.coinM.play();

                this.scene.tweens.add({
                    targets: coin,
                    ease: 'Power1',
                    scaleX: 0,
                    scaleY: 0,
                    duration: 200,
                    onComplete: () => coin.destroy()
                });
            }
        }
        
        increaseScore(200);
    }
}

export default Coin;
