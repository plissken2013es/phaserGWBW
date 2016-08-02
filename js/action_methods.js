GWBW.action_methods = {
    moonAction: function() {
        var daysLeft = 40 - this.day;
        var resultText = "Por la posición de las lunas, calculo que ";
        if (daysLeft > 30) {
            resultText += "falta muchísimo\nhasta que llegue el Convoy.";
        } else if (daysLeft > 20) {
            resultText += "estamos cercanos\nal Ecuador de nuestra desgraciada aventura.";
        } else if (daysLeft > 10) {
            resultText += "hemos entrado\nen la recta final.";
        } else if (daysLeft > 5) {
            resultText += "se nos está\nacabando el tiempo. Faltan pocos días.";
        } else {
            resultText += "casi puedo\ntocarlo con los dedos...";
        }
        this.dialogbox.text = resultText;
        this.dialogbox.name = 'Sgt Burden';
        this.tweenDialog({ y: 0 }, 1, this.memberTalks);
    },
    medicineAction: function() {
        var resultTxt = "No quedan medicinas.";
        if (this.medicines > 1) {
             resultTxt = 'Quedan ' + this.medicines + ' medicinas.';
        } else if (this.medicines == 1) {
            resultTxt = 'Queda 1 medicina.';
        }
        this.dialogbox.text = resultTxt;
        this.dialogbox.name = 'Sgt Burden';
        this.tweenDialog({ y: 0 }, 1);
    },
    foodAction: function() {
        var resultTxt = "No quedan alimentos.";
        if (this.foodAmount > 1) {
             resultTxt = 'Tenemos ' + this.foodAmount + ' raciones de alimentos.';
        } else if (this.foodAmount == 1) {
            resultTxt = 'Queda una sola ración de food.';
        }
        this.dialogbox.text = resultTxt;
        this.dialogbox.name = 'Sgt Burden';
        this.tweenDialog({ y: 0 }, 1);
    },
    ammoAction: function() {
        var resultTxt = "No queda munición.";
        if (this.foodAmount > 1) {
             resultTxt = 'Nos quedan ' + this.ammo + ' balas láser.';
        } else if (this.foodAmount == 1) {
            resultTxt = 'Queda una última bala.';
        }
        this.dialogbox.text = resultTxt;
        this.dialogbox.name = 'Sgt Burden';
        this.tweenDialog({ y: 0 }, 1);
    },
    radioAction: function() {
        if (this.radioStatus >= this.radioMax) {
            this.dialogbox.text = '¡Por fin! La radio funciona. Espero que puedan\noír nuestro aviso de socorro.';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        } else {
            this.dialogbox.text = 'Es nuestra única salida, deberíamos arreglarla\nantes del día 40.';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    campfireAction1: function() {
        this.dialogbox.text = this.dialogues[this.BURDEN_ID][this.dialoguesIndex[this.BURDEN_ID]];
        this.dialoguesIndex[this.BURDEN_ID]++;
        if (this.dialoguesIndex[this.BURDEN_ID] == this.dialogues[this.BURDEN_ID].length) this.dialoguesIndex[this.BURDEN_ID] = 0;
        this.dialogbox.name = 'Sgt Burden';
        this.tweenDialog({ y: 0 }, 1);
    },
    campfireAction2: function() {
        if (this.fireAmount < 3) { 
            this.dialogbox.text = '¡El Sargento Burden ha conseguido algo de madera para la hoguera!';
            this.dialogbox.name = '¡Fuego reavivado!';
            this.tweenDialog({ y: 0 }, 1, function() {
                this.fireAmount = 3;
                this.numActions --;
                this.campfireSnd.play();
            });
        } else {
            this.dialogbox.text = 'La hoguera ya está en su máximo esplendor. No hace falta más madera.';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    doctorAction1: function() {
        this.dialogbox.text = this.dialogues[this.DOCTOR_ID][this.dialoguesIndex[this.DOCTOR_ID]];
        this.dialoguesIndex[this.DOCTOR_ID]++;
        if (this.dialoguesIndex[this.DOCTOR_ID] == this.dialogues[this.DOCTOR_ID].length) this.dialoguesIndex[this.DOCTOR_ID] = 0;
        this.dialogbox.name = 'Doctor';
        this.tweenDialog({ y: 0 }, 1, function() {
            this.sanity[this.DOCTOR_ID] += 1;
            this.spokenTo[this.DOCTOR_ID] = true;
            this.numActions--;
        });
    },
    doctorAction2: function() {
        var vaccines = this.math.between(0, 2);
        var txt = 'Conozco algunas hierbas de este planeta que podrán sernos útiles.\n';
        if (vaccines) {
            txt += '[¡El Doctor ha preparado ' + vaccines + ' vacuna/s!]';
        } else {
            txt += "[El Doctor no ha logrado resultados.]";
        }
        this.dialogbox.text = txt;
        this.dialogbox.name = 'Doctor';
        this.tweenDialog({ y: 0 }, 1, function() {
            this.medicines += vaccines;
            this.numActions --;
        });
    },
    doctorAction3: function() {
        if (this.radioStatus >= this.radioMax) {
            this.dialogbox.text = 'Creo que la radio ya está arreglada.';
            this.dialogbox.name = 'Doctor';
            this.tweenDialog({ y: 0 }, 1);
        } else {
            this.dialogbox.text = 'Vale, veré qué puedo hacer...\n[El doctor ha reparado un 2% de la radio.]';
            this.dialogbox.name = 'Doctor';
            this.tweenDialog({ y: 0 }, 1, function() {
                this.radioStatus += 1;
                this.numActions --;
            });
        }
    },
    doctorAction4: function() {
        if (this.ammo > 0) {
            this.shootCrew(this.DOCTOR_ID);
            this.ammo--;
        } else {
            this.dialogbox.text = 'No nos queda munición. Y no me veo capaz de \nmatarlo con una roca o algo así...';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    doctorAction5: function() {
        this.dialogbox.text = "¿Doctor? ¿Está usted bien? ...\nCreo que puede estar infectado por el virus Medusea.";
        this.dialogbox.name = "Sgt Burden";
        this.tweenDialog({ y: 0 }, 1);
    },
    doctorAction6: function() {
        if (this.medicines > 0) {
            this.dialogbox.text = '¿Qu-qué ha pasado? Oh, ya veo... debo de haberme infectado con el\nvirus Medusea, gracias por salvarme.';
            this.dialogbox.name = 'Doctor';
            this.tweenDialog({ y: 0 }, 1, function() {
                this.medicines--;
                this.numActions --;
                this.numSurvivors++;
                this.rationsNeeded++;
                this.infected[this.DOCTOR_ID] = false;
                this.doctorAction.infected = false;
            });
        } else {
            this.dialogbox.text = 'Mierda... no nos quedan medicinas. Lo siento, Doctor.';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    doctorAction7: function() {
        if (this.ammo > 0) {
            this.shootCrew(this.DOCTOR_ID);
            this.ammo--;
            this.numSurvivors++;
            this.rationsNeeded++;

        } else {
            this.dialogbox.text = 'No nos queda munición. Y no me veo capaz de \nmatarlo con una roca o algo así...';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    scientistAction1: function() {
        this.dialogbox.text = this.dialogues[this.SCIENTIST_ID][this.dialoguesIndex[this.SCIENTIST_ID]];
        this.dialoguesIndex[this.SCIENTIST_ID]++;
        if (this.dialoguesIndex[this.SCIENTIST_ID] == this.dialogues[this.SCIENTIST_ID].length) this.dialoguesIndex[this.SCIENTIST_ID] = 0;
        this.dialogbox.name = 'Ingeniero';
        this.tweenDialog({ y: 0 }, 1, function() {
            this.sanity[this.SCIENTIST_ID] += 1;
            this.spokenTo[this.SCIENTIST_ID] = true;
            this.numActions --;
        });
    },
    scientistAction2: function() {
        if (this.radioStatus >= this.radioMax) {
            this.dialogbox.text = 'El trabajo está hecho, jefe. Sólo mantengámonos con vida\nhasta que llegue el Convoy Orbital.';
            this.dialogbox.name = 'Ingeniero';
            this.dialogbox.tween({
                pos: {
                    y: 0
                }
            }, 1, {
                easing: ig.Tween.Easing.Quadratic.EaseOut
            }).start();
        } else {
            this.dialogbox.text = 'Vamos a reparar esta chatarra.\n[El ingeniero ha reparado un 6% de la radio.]';
            this.dialogbox.name = 'Ingeniero';
            this.tweenDialog({ y: 0 }, 1, function() {
                this.radioStatus += 3;
                this.numActions --;
            });
        }
    },
    scientistAction3: function() {
        if (this.ammo > 0) {
            this.shootCrew(this.SCIENTIST_ID);
            this.ammo--;
        } else {
            this.dialogbox.text = 'No me cae bien, pero matarlo sin armas seria demasiado sadismo.';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    scientistAction4: function() {
        this.dialogbox.text = 'Ey, colega, ¿estás meditando o ...?\n¡Oh, mierda...! Se ha infectado.';
        this.dialogbox.name = 'Sgt Burden';
        this.tweenDialog({ y: 0 }, 1);
    },
    scientistAction5: function() {
        if (this.medicines > 0) {
            this.dialogbox.text = 'He tenido un sueño: estaba cenando en casa de mi madre...\nGracias por salvarme, por cierto.';
            this.dialogbox.name = 'Ingeniero';
            this.tweenDialog({ y: 0 }, 1,  function() {
                this.medicines--;
                this.numActions --;
                this.numSurvivors++;
                this.rationsNeeded++;
                this.infected[this.SCIENTIST_ID] = false;
                this.scientistAction.infected = false;
            });
        } else {
            this.dialogbox.text = 'Necesitaremos algunas medicinas para despertarlo.';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    scientistAction6: function() {
        if (this.ammo > 0) {
            this.numSurvivors++;
            this.rationsNeeded++;
            this.shootCrew(this.SCIENTIST_ID);
            this.ammo--;
        } else {
            this.dialogbox.text = 'No me cae bien, pero matarlo sin armas seria demasiado sadismo.';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    soldierAction1: function() {
        this.dialogbox.text = this.dialogues[this.SOLDIER_ID][this.dialoguesIndex[this.SOLDIER_ID]];
        this.dialoguesIndex[this.SOLDIER_ID]++;
        if (this.dialoguesIndex[this.SOLDIER_ID] == this.dialogues[this.SOLDIER_ID].length) this.dialoguesIndex[this.SOLDIER_ID] = 0;
        this.dialogbox.name = 'Soldado';
        this.tweenDialog({ y: 0 }, 1, function() {
            this.sanity[this.SOLDIER_ID] += 1;
            this.spokenTo[this.SOLDIER_ID] = true;
            this.numActions --;
        });
    },
    soldierAction2: function() {
        if (this.ammo > 2) {
            this.laserSnd.play();
            var numShots = this.math.between(1, 3);
            this.ammo -= numShots;
            if (Math.random() > .1) {
                var food = this.math.between(5, 8);
                this.foodAmount += food;
                var resultText = 'El soldado ha gastado ' + numShots + ' bala(s) y ha obtenido\n' + food + ' raciones de alimentos.';
                if (food == 1) resultText = 'El soldado ha gastado ' + numShots + ' bala(s) y ha obtenido\nuna ración de comida.';
                this.dialogbox.text = resultText;
                this.dialogbox.name = 'Resultados de la caza';
                this.tweenDialog({ y: 0 }, 1, function() {
                    this.numActions --;
                });
            } else {
                this.dialogbox.text = 'El soldado ha gastado ' + numShots + ' balas pero no ha tenido exito...';
                this.dialogbox.name = 'Resultado de la caza';
                this.tweenDialog({ y: 0 }, 1, function() {
                    this.numActions --;
                });
            }
        } else {
            this.dialogbox.text = 'Nos hemos quedado sin munición, lo siento. Si queda alguna bala,\nutilícela para destruir al robot. Podríamos usar sus baterías.';
            this.dialogbox.name = 'Soldado';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    soldierAction3: function() {
        if (this.ammo > 0) {
            this.shootCrew(this.SOLDIER_ID);
            this.ammo--;
        } else {
            this.dialogbox.text = 'Me he quedado sin balas... y no voy a poder matarlo\ncon las manos desnudas.';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    soldierAction4: function() {
        this.dialogbox.text = '¿Has visto algo? Mantene alerta.\n¿Hola? ¿Estás ahí? Oh... el virus Medusea...';
        this.dialogbox.name = 'Sgt Burden';
        this.tweenDialog({ y: 0 }, 1);
    },
    soldierAction5: function() {
        if (this.medicines > 0) {
            this.dialogbox.text = '¡Sargento! ¡Gracias por desperdiciar recursos valiosos en\neste débil soldado!';
            this.dialogbox.name = 'Soldado';
            this.tweenDialog({ y: 0 }, 1, function() {
                this.medicines--;
                this.numActions --;
                this.numSurvivors++;
                this.rationsNeeded++;
                this.infected[this.SOLDIER_ID] = false;
                this.soldierAction.infected = false;
            });
        } else {
            this.dialogbox.text = 'Era un gran camarada. Me gustaria salvarle.\nNecesitamos medicinas.';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    soldierAction6: function() {
        if (this.ammo > 0) {
            this.numSurvivors++;
            this.rationsNeeded++;
            this.shootCrew(this.SOLDIER_ID);
            this.ammo--;
        } else {
            this.dialogbox.text = 'No me queda munición... y no sería...\nhonorable matar a palos a un soldado congelado.';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    girlAction1: function() {
        this.dialogbox.text = this.dialogues[this.GIRL_ID][this.dialoguesIndex[this.GIRL_ID]];
        this.dialoguesIndex[this.GIRL_ID]++;
        if (this.dialoguesIndex[this.GIRL_ID] == this.dialogues[this.GIRL_ID].length) this.dialoguesIndex[this.GIRL_ID] = 0;
        this.dialogbox.name = 'Psiquiatra';
        this.tweenDialog({ y: 0 }, 1, function() {
            this.sanity[this.GIRL_ID] += 1;
            this.spokenTo[this.GIRL_ID] = true;
            this.numActions --;
        });
    },
    girlAction2: function() {
        if (this.numActions >= this.numSurvivors) {
            this.dialogbox.text = 'Este es el reto mas grande que un equipo de Eversdusk haya\nafrontado nunca. ¡Prevaleceremos y contaremos nuestra historia!';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1, function() {
                for (var i = 0; i < this.sanity.length; i++) {
                    if (this.sanity[i] >= 0 && !this.infected[i]) {
                        this.sanity[i] += this.math.between(1, 3);
                    }
                    if (this.sanity[i] >= 0) this.spokenTo[i] = true;
                }
                this.numActions -= this.numSurvivors;
            });
        } else {
            this.dialogbox.text = 'Lo siento, Sargento: no nos queda tiempo para eso hoy.\n[Necesitas TODAS las acciones]';
            this.dialogbox.name = 'Psiquiatra';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    girlAction3: function() {
        if (this.ammo > 0) {
            this.shootCrew(this.GIRL_ID);
            this.ammo--;
        } else {
            this.dialogbox.text = 'No me queda munición\ny no me veo matando a una chica a golpes.';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    girlAction4: function() {
        this.dialogbox.text = 'Escucha... a veces tengo fantasías con mi nave y...\n¡Eh! ¿Me estás escuchando? Mierda, el virus Medusea.';
        this.dialogbox.name = 'Sgt Burden';
        this.tweenDialog({ y: 0 }, 1);
    },
    girlAction5: function() {
        if (this.medicines > 0) {
            this.dialogbox.text = '¿Dónde, cómo, cuándo...?\nOh, ya veo... Gracias por salvarme, Sargento.';
            this.dialogbox.name = 'Psiquiatra';
            this.tweenDialog({ y: 0 }, 1, function() {
                this.medicines--;
                this.numActions --;
                this.numSurvivors++;
                this.rationsNeeded++;
                this.infected[this.GIRL_ID] = false;
                this.girlAction.infected = false;
            });
        } else {
            this.dialogbox.text = 'Pobre chica... No nos quedan medicinas...';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    girlAction6: function() {
        if (this.ammo > 0) {
            this.numSurvivors++;
            this.rationsNeeded++;
            this.shootCrew(this.GIRL_ID);
            this.ammo--;
        } else {
            this.dialogbox.text = 'No me queda munición\ny no me veo matando a una chica a golpes.';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    dogAction1: function() {
        this.dialogbox.text = '¡Guau!';
        this.dialogbox.name = 'Marvin';
        this.tweenDialog({ y: 0 }, 1);
    },
    dogAction2: function() {
        if (Math.random() > .34) {
            var food = this.math.between(4, 7);
            this.foodAmount += food;
            var resultText = '¡Marvin ha conseguido ' + food + ' raciones de comida!';
            if (food == 1) resultText = '¡Marvin ha conseguido una ración de comida!';
            this.dialogbox.text = resultText;
            this.dialogbox.name = 'Resultados de la caza';
            this.tweenDialog({ y: 0 }, 1, function() {
                this.numActions --;
            });
        } else {
            this.dialogbox.text = 'Marvin no ha podido atrapar ningun animal.';
            this.dialogbox.name = 'Resultados de la caza';
            this.tweenDialog({ y: 0 }, 1, function() {
                this.numActions --;
            });
        }
    },
    dogAction3: function() {
        if (this.ammo > 0) {
            this.shootCrew(this.DOG_ID);
            this.ammo--;
        } else {
            this.dialogbox.text = 'No me queda munición... Y Marvin es tan mono...';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    },
    robotAction1: function() {
        var soldier = this.sanity[this.SOLDIER_ID] > 0 ? this.sanity[this.SOLDIER_ID] : "-";
        var doctor = this.sanity[this.DOCTOR_ID] > 0 ? this.sanity[this.DOCTOR_ID] : "-";
        var scientist = this.sanity[this.SCIENTIST_ID] > 0 ? this.sanity[this.SCIENTIST_ID] : "-";
        var girl = this.sanity[this.GIRL_ID] > 0 ? this.sanity[this.GIRL_ID] : "-";

        this.dialogbox.text = 'Psicoanálisis: ' + soldier + ', ' + doctor + ', ' + scientist + ', ' + girl;
        this.dialogbox.text += '\nReparación de la Radio: ' + parseInt(this.radioStatus) + ' / ' + this.radioMax;
        this.dialogbox.name = 'BR4ND-0N';
        this.tweenDialog({ y: 0 }, 1);
    },
    robotAction2: function() {
        if (this.radioStatus >= this.radioMax) {
            this.dialogbox.text = 'La radio ya está operacional, Sargento.';
            this.dialogbox.name = 'BR4ND-0N';
            this.tweenDialog({ y: 0 }, 1);
        } else {
            this.dialogbox.text = 'El ingeniero debería ser más eficaz, pero haré lo que pueda.\n[BR4ND-0N ha reparado un 4% de la radio.]';
            this.dialogbox.name = 'BR4ND-0N';
            this.tweenDialog({ y: 0 }, 1, function() {
                this.radioStatus += 2;
                this.numActions --;
            });
        }
    },
    robotAction3: function() {
        if (this.ammo > 0) {
            this.shootCrew(this.ROBOT_ID);
            this.ammo--;
        } else {
            this.dialogbox.text = 'No me queda munición, y no se romperá fácilmente.';
            this.dialogbox.name = 'Sgt Burden';
            this.tweenDialog({ y: 0 }, 1);
        }
    }
};