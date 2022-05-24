import MyGame from "../scenes/MyGame";
import increaseScore from "../ui/increaseScore";

class Enemies {
    constructor(scene) {
        this.scene = scene;
        this.enemies = this.scene.physics.add.group();
        this.collider = this.scene.physics.add.collider(this.scene.player.sprite, this.enemies, this.gameOver, null, this);

        const enemiesObjects = this.scene.map.getObjectLayer('goombas').objects;

        for (const enemy of enemiesObjects) {
            this.enemies.create(enemy.x, enemy.y - enemy.height, 'atlas')
                .setScale(1.5)
                .setOrigin(0)
                .setDepth(-1);
        }

        for (const enemy of this.enemies.children.entries) {
            enemy.direction = 'RIGHT';
            enemy.isDead = false;
        }

        scene.physics.add.collider(this.enemies, this.scene.platform);
        scene.physics.add.collider(this.enemies, this.scene.invisible);
    }

    update() {
        for (const enemy of this.enemies.children.entries) {
            if (enemy.body.blocked.right) {
                enemy.direction = 'LEFT';
            }
    
            if (enemy.body.blocked.left) {
                enemy.direction = 'RIGHT';
            }
    
            if (enemy.direction === 'RIGHT') {
                enemy.setVelocityX(100);
            } else {
                enemy.setVelocityX(-100);
            }
    
            !enemy.isDead && enemy.play('goombaRun', true);
        }
    }

    gameOver() {
        if (this.scene.player.sprite.body.touching.down) {
            this.die();

            return;
        }

        this.scene.player.die();
        this.scene.input.keyboard.shutdown();

        this.scene.physics.world.removeCollider(this.scene.player.collider);
        this.scene.physics.world.removeCollider(this.collider);
        

        const mygame = this.scene.scene.get("MyGame");
        mygame.gameOver();
    
    }

    die() {
        for (const enemy of this.enemies.children.entries) {
            if (enemy.body.touching.up) {
                enemy.isDead = true;
                enemy.play('goombaDie', true);
                enemy.on('animationcomplete', () => enemy.destroy());

                increaseScore(100);


                this.scene.player.sprite.setVelocity(0, -350);
                this.scene.player.sprite.play('jump');
            }
        }
    }

}

export default Enemies;