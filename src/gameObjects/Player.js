import GameOver from "../scenes/GameOver";

class Player {
    constructor(scene, x,y) {

        const useDeadZone = false;

        this.scene = scene;

        this.sprite = this.scene.physics.add.sprite(x, y, 'atlas')
            .setScale(2);
        
        this.sprite.setCollideWorldBounds(true);
        this.sprite.isDead = false;

        scene.cameras.main
            .setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels)
            .startFollow(this.sprite);

        
        this.collider = this.scene.physics.add.collider(this.sprite, scene.platform);
        this.scene.physics.add.collider(this.sprite, scene.pipe, this.endLevel, null, this);
        this.collider1 = this.scene.physics.add.collider(this.sprite, scene.down, this.collitionDown, null, this);
          
        
        if (useDeadZone) {
            scene.cameras.main.setDeadzone(scene.game.config.width / 4, scene.game.config.height)
        }

   
    }


    reFollowPlayer() {
        this.scene.physics.world.bounds.setPosition(this.scene.cameras.main.worldView.x, 0);
        
        if (this.sprite.body.position.x + this.sprite.body.width / 2 > this.scene.cameras.main.midPoint.x &&
            !this.scene.cameras.main._follow) {
            this.scene.cameras.main.startFollow(this.sprite);
        }
    }

    update(input) {

        this.sprite.body.onFloor() && !this.sprite.isDead && this.sprite.play('run', true);
        this.sprite.body.onFloor() && !this.sprite.isDead && this.sprite.play('idle', true);
        // Moviment a l'esquerra
        if (input.left.isDown) {
            this.sprite.setVelocityX(-200).setFlipX(true);
            this.sprite.body.onFloor() && 
            !this.sprite.isDead && this.sprite.play('run', true);
            this.scene.cameras.main.stopFollow(this.sprite);
        
        // Moviment a la dreta
        } else if (input.right.isDown) {
            this.sprite.setVelocityX(200).setFlipX(false);
            this.sprite.body.onFloor() && this.sprite.play('run', true);
                    
            this.reFollowPlayer();
            
        } else {
        
         // Quan el player es queda quiet
            this.sprite.setVelocityX(0);
            this.sprite.body.onFloor() &&
            !this.sprite.isDead && this.sprite.play('idle', true);
        }
            
        // Quan el player salta
        if ((input.space.isDown && this.sprite.body.onFloor())) {
            this.sprite.setVelocityY(-350);
            this.sprite.play('jump', true);
        }

        
    }

    collitionDown() {
        this.die();
        this.scene.input.keyboard.shutdown();

        this.scene.physics.world.removeCollider(this.scene.player.collider);
        this.scene.physics.world.removeCollider(this.collider);
        this.scene.physics.world.removeCollider(this.collider1);

        const mygame = this.scene.scene.get("MyGame");
        mygame.gameOver();
    }

    die() {
        this.sprite.isDead = true;
        this.sprite.setVelocity(0, -350);
        this.sprite.play('die', true);
        this.sprite.setCollideWorldBounds(false);
    }
    endLevel() {
        const mygame = this.scene.scene.get("MyGame");
        mygame.nextLevel();
    }
        
}

export default Player;
