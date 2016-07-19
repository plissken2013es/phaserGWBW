
GWBW.Game = function() {};
GWBW.Game.prototype = {
    init: function(wind) {
        this.wind = wind;
    },
    create: function() {
        this.add.image(0, 0, "fondo");
        
        this.wind.fadeOut(4000);
        this.music = this.add.audio("bso", 0, true);
        this.music.onDecoded.add(this.startMusic, this);
    },
    startMusic: function() {
        this.music.play();
        this.music.fadeTo(6000, 0.25);
    }
};