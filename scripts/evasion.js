let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let bg;
let ship;
let bullet;
let cursors;
let fire;
let stats;
let lastFired = 0;
let isDown = false;
let mouseX = 0;
let mouseY = 0;
let score = 0;
let scoreText;
let lives = 1;
let livesText;
let asteroids;
let x;
let y;


function preload() {
    this.load.image('ship1', 'assets/thrust_ship.png');
    this.load.image('ship2', 'assets/thrust_ship2.png');
    this.load.image('background', 'assets/space.jpg');
    this.load.image('bullet', 'assets/bullet1.png')
    this.load.image('asteroid1', 'assets/asteroid1.png')
    this.load.image('asteroid2', 'assets/asteroid2.png')
    this.load.image('asteroid3', 'assets/asteroid3.png')
    this.load.image('gameOver', 'assets/gameOver.png')
    this.load.image('youWin', 'assets/youWin.png')
}

function create() {
    bg = this.add.image(400, 300, 'background');
    bg.setScale(2);


    ship = this.physics.add.sprite(100, 450, 'ship1');
    ship.setSize(20, 20)
    ship.setScale(2);
    ship.setDrag(100);
    ship.setAngularDrag(200);
    ship.setMaxVelocity(300);
    ship.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    asteroids = this.physics.add.group();
    this.physics.add.collider(asteroids, ship, hitShip, null, this);
    this.physics.add.collider(asteroids);

    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    scoreText = this.add.text(16, 16, 'Score: ' + score, { fontsize: '40px', fill: '#FFFFFF' });

    livesText = this.add.text(16, 32, 'Lives: ' + lives, { fontsize: '40px', fill: '#FFFFFF' });
}

function update(time, delta) {
    if (keyA.isDown) {
        ship.setAngularVelocity(-150);
    }
    else if (keyD.isDown) {
        ship.setAngularVelocity(150);
    }
    else {
        ship.setAngularVelocity(0);
    }

    if (keyW.isDown) {
        this.physics.velocityFromRotation(ship.rotation, 600, ship.body.acceleration);
    }

    else {
        ship.setAcceleration(0);
    }

    if (lives > 0) {
        score = score + 5;
        scoreText.setText('Score: ' + score);
    }

    if (score % 10000 == 0) {
        x = (ship.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        y = (ship.y < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        if (score >= 30000) {
            newAsteroid2();
        }
        else if (score >= 50000) {
            newAsteroid1();
            newAsteroid2();
        }
        else if (score == 100000) {
            lives = 0;

            gameOver = true;

            bg = this.add.image(400, 300, 'youWin');

            this.physics.pause();
        }
        else {
            newAsteroid1();
        }

    }
}

function hitShip(ship, asteroid1) {
    ship.setTint(0xff0000);

    lives = lives - 1;
    livesText.setText('Lives: ' + lives);

    bg = this.add.image(400, 300, 'gameOver');
    bg.setScale(.25)

    gameOver = true;

    this.physics.pause();

}

function newAsteroid1(ship, score) {
    var asteroid1 = asteroids.create(x, y, 'asteroid1');
    asteroid1.setBounce(1);
    asteroid1.setCollideWorldBounds(true);
    asteroid1.setVelocity(Phaser.Math.Between(-200, 200), 100);
    asteroid1.setScale(2);
    asteroid1.setSize(20, 20);
    asteroid1.setOffset(5, 5);
}

function newAsteroid2(ship, score) {
    var asteroid2 = asteroids.create(x, y, 'asteroid2');
    asteroid2.setBounce(1);
    asteroid2.setCollideWorldBounds(true);
    asteroid2.setVelocity(Phaser.Math.Between(-300, 300), 100);
    asteroid2.setScale(2);
    asteroid2.setCircle(13);
    asteroid2.setOffset(3, 3)
}

