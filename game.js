const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#f3f3f3',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player, cursors, socket;

function preload() {
    this.load.image('background', 'background.jpg'); // Background image
    this.load.spritesheet('characters', 'characters.png', {
        frameWidth: 64,
        frameHeight: 64
    }); // Characters spritesheet
}

function create() {
    this.add.image(400, 300, 'background');
    
    player = this.physics.add.sprite(400, 300, 'characters', 0);
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    this.add.text(10, 10, 'Touch controls to move', { font: '16px Arial', fill: '#000' });

    socket = io('http://localhost:3000');
    socket.emit('newPlayer');

    socket.on('updatePlayers', (players) => {
        console.log(players);
    });
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-200);
    } else if (cursors.down.isDown) {
        player.setVelocityY(200);
    } else {
        player.setVelocityY(0);
    }
}
