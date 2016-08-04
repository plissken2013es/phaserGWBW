GWBW.Introduction = function() {};
GWBW.Introduction.txtArray = [
    '2257 dC\n',
    'El Sargento Burden lidera un equipo de investigación para la EC-UD \n',
    '(Everdusk Company for Universe Discovery). \n',
    'Su equipo estaba recopilando información sobre el virus Medusea, \n',
    'una plaga originaria del planeta Sineicos, \n',
    'cuando fue atacados por un grupo de bioterroristas \n',
    'autodenominados "comando XENOLIFER". \n \n',
    'Los datos de su investigacion fueron robados. \n',
    'En las manos equivocadas esto podria suponer el fin de \n',
    'la II Ciberguerra y el inicio de la era del terror espacial. \n \n',
    'Para evitar que esto suceda, su equipo deberá sobrevivir \n',
    'en los inhospitos yermos de Sineicos; \n',
    'luchar contra el hambre, el frío y la locura; \n',
    'combatir -además- los posibles brotes del virus Medusea, \n',
    'conocido por paralizar el cuerpo de sus víctimas; \n',
    'y reparar su Estacion de Radio para enviar un mensaje \n',
    'al Convoy Orbital que cruzará el cielo de Sineicos en 40 días: \n',
    'se trata de su ÚNICA vía de escape. \n',
    '\n \n',
    'Usted es el Sargento Burden. \n \n',
    'Recuerde... \n',
    '\n'
];

GWBW.Introduction.prototype = {
    create: function() {
        var txt = "";
        for (var q=0, l=GWBW.Introduction.txtArray.length; q<l; q++) {
            txt += GWBW.Introduction.txtArray[q];
        }
        
        this.introTxt = this.add.bitmapText(this.world.centerX, 4, "minecraft", txt, 7.5);
        this.introTxt.anchor.x = 0.5;
        this.introTxt.smoothed = false;
        this.introTxt.tint = 0xffffff;
        this.introTxt.align = "center";
        
        this.music = this.add.audio("wind", 0, true);
        this.music.onDecoded.add(this.startMusic, this);
        
        this.input.onDown.addOnce(this.showTitle, this);
    },
    showTitle: function() {
        this.introTxt.kill();
        this.introTxt = this.add.bitmapText(this.world.centerX, 150, "minecraft", "(Los dioses estarán vigilando)", 10);
        this.introTxt.anchor.x = 0.5;
        this.introTxt.smoothed = false;
        this.introTxt.tint = 0xffffff;
        this.introTxt.align = "center";
        
        var title = this.add.image(this.world.centerX, this.world.centerY - 20, "titulo");
        title.anchor.set(0.5);
        
        this.startTxt = this.add.bitmapText(this.world.centerX, 190, "fipps", "Click para jugar", 8);
        this.startTxt.anchor.x = 0.5;
        this.startTxt.smoothed = false;
        this.startTxt.tint = 0xffff00;
        this.startTxt.visible = false;
        
        var timerTxt = this.time.create();
        timerTxt.loop(750, this.toggleStartTxt, this);
        timerTxt.start();
        
         this.input.onDown.addOnce(this.startGame, this);
    },
    startGame: function() {
        this.state.start("GWBW.Game", true, false, this.music);
    },
    startMusic: function() {
        this.music.play();
        this.music.fadeTo(4000, 0.25);
    },
    toggleStartTxt: function() {
        this.startTxt.visible = this.startTxt.visible ? false : true;
    }
};