var game = new Phaser.Game(320, 215, Phaser.AUTO);

game.state.add("GWBW.Preload", GWBW.Preload);
game.state.add("GWBW.Introduction", GWBW.Introduction);
game.state.add("GWBW.Game", GWBW.Game);

game.state.start("GWBW.Preload");