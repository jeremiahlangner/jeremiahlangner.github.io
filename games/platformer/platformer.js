/* A nifty little platformer made with phaser.js. The first in a large number of
arcade games. */

var mainState = {
    preload: function() {
        game.load.image('player', './assets/player.png');
        game.load.image('wall', './assets/wall.png');
        game.load.image('coin', './assets/coin.png');
        game.load.image('enemy', './assets/enemy.png');
        
    },
    
    create: function() {
        game.stage.backgroundColor = '#3598db';

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 600;
        
        this.cursors = game.input.keyboard.createCursorKeys();
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.player = game.add.sprite(70,100, 'player');
        
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();
        
        game.physics.enable(this.player, Phaser.Physics.ARCADE);

        var level = [
            'xxxxxxxxxxxxxxxxxxxxxx',
            '!         !          x',
            '!                 o  x',
            '!         o          x',
            '!                    x',
            '!     o   !    x     x',
            'xxxxxxxxxxxxxxxx!!!!!x',
        ];
        
        for(var i = 0; i<level.length; i++) {
            for(var j = 0; j<level[i].length; j++) {
                
                if(level[i][j] == 'x') {
                    var wall = game.add.sprite(32+24*j, 32+24*i, 'wall');
                    this.walls.add(wall);
                }
                else if(level[i][j] == 'o') {
                    var coin = game.add.sprite(32+24*j, 32+24*i, 'coin');
                    this.coins.add(coin);
                }
                else if(level[i][j] == '!') {
                    var enemy = game.add.sprite(32+24*j, 32+24*i, 'enemy');
                    this.enemies.add(enemy);
                }
            }
        }
    },
    
    takeCoin: function(player, coin) {
        coin.kill();
    },
    
    restart: function() {
        game.state.start('main');
    },
    
    update: function() {

        this.player.body.velocity.x = 0;
        
        if(this.cursors.left.isDown) {
            this.player.body.velocity.x = -200;
        }
        else if(this.cursors.right.isDown) {
            this.player.body.velocity.x = 200;
        }

        if(this.player.body.blocked.down) {
            if(this.jumpButton.isDown) {
                this.player.body.velocity.y = -250;
            }
        }
        
        // Handle Collisions
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
    }   
};

var game = new Phaser.Game(window.innerWidth, window.innerHeight);
game.state.add('main', mainState);
game.state.start('main');


