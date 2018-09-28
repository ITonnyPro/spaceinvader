// variables
var ecranStart = document.querySelector(".start");
var ecranGame = document.querySelector(".game");
var ecranEnd = document.querySelector(".end");
var youWin = document.querySelector(".win");
var youLoose = document.querySelector(".loose");
var btnRetry = document.querySelectorAll("button");
var btnPlay = document.querySelector(".btnplay");
var vaisseau = document.querySelector(".you");
var move = 1;
var ennemie = document.querySelector(".ennemies");
var nbvie = 3;


//events
btnPlay.addEventListener("click", startToGame);
btnRetry[0].addEventListener("click", endToGame);
btnRetry[1].addEventListener("click", endToGame);

//functions
function startToGame() {
    ennemies();
    ecranStart.classList.add("dontshow");
    ecranGame.classList.remove("dontshow");
};

function endToGame() {
    window.location.reload()
};

document.addEventListener("keydown", btnLeft);
document.addEventListener("keydown", btnRight);
document.addEventListener("keyup", btnShot);

function btnLeft() {
    if (event.keyCode == 37) {
        moveLeft();
        console.log("left");
    }
}

function btnRight() {
    if (event.keyCode == 39) {
        moveRight();
        console.log("right");
    }
}

function btnShot() {
    if (event.keyCode == 32) {
            laserShot();
        console.log("FIRE");
    }
}

var largeur=screen.availWidth;
var hauteur=screen.availHeight;
    console.log("largeur:"+largeur, "hauteur:"+hauteur);

function moveLeft() {
    var positionV = window.getComputedStyle(vaisseau, null);
    var positionLeft = parseInt(positionV.left);
    
    if(positionLeft > 0 + largeur/5){
        vaisseau.style.left = positionLeft - 15 + "px";
    } else {
        console.log("stop");
    }
}

function moveRight(){
    var positionV = window.getComputedStyle(vaisseau, null);
    var positionLeft = parseInt(positionV.left);
    
    if(positionLeft < largeur - largeur/5){
        vaisseau.style.left = positionLeft + 15 + "px";
    }
}

function ennemies() {       
    for(i=0; i<2; i++){
        var divalien = document.createElement("div");
        divalien.className="divalien";
        document.querySelector(".ennemies").appendChild(divalien);
        
        var divalien2 = document.createElement("div");
        divalien2.className="divalien2";
        document.querySelector(".ennemies").appendChild(divalien2);
    }
    
    for(i=0; i<6; i++){
        var alien1 = document.createElement("img");
        alien1.src="images/ennemie1.png";
        alien1.className="invaders";
        document.querySelector(".divalien:nth-child(1)").appendChild(alien1);

        var alien2 = document.createElement("img");
        alien2.src="images/ennemie2.png";
        alien2.className="invaders";
        document.querySelector(".divalien2:nth-child(2)").appendChild(alien2);
        
        var alien1 = document.createElement("img");
        alien1.src="images/ennemie1.png";
        alien1.className="invaders";
        document.querySelector(".divalien:nth-child(3)").appendChild(alien1);
        
        var alien2 = document.createElement("img");
        alien2.src="images/ennemie2.png";
        alien2.className="invaders";
        document.querySelector(".divalien2:nth-child(4)").appendChild(alien2);
    }
    
    var positionEnnemies = window.getComputedStyle(ennemie, null);
    var topEnnemies = parseInt(positionEnnemies.top);
    var startpos = 50;
    var time = setInterval(attack, 200);
    function attack() {
        if(parseInt(ennemie.style.top) > hauteur/2 + 10) {
          clearInterval(time);
        } else {
          startpos++;
          ennemie.style.top = startpos + 'px';
        }
    }
    
    var dTime = setInterval(deplace, 10000);
    var randomPos = [largeur/6, (largeur/6)*1.8 + 5];
    var randomStart = randomPos[Math.floor(Math.random()*randomPos.length)];
    var gauche = largeur/6 + "px";
    var droite = (largeur/6)*1.8 + 5 + "px";
    
    function deplace() {
       if((ennemie.style.left == gauche) && (parseInt(ennemie.style.top) < hauteur/2 +10)) {
           ennemie.style.left = droite;
       } else if((ennemie.style.left = droite) && (parseInt(ennemie.style.top) < hauteur/2 +10)){
           ennemie.style.left = gauche;
       } else if(parseInt(ennemie.style.top) > hauteur/2 +10){
           ecranGame.classList.add('dontshow');
            ecranEnd.classList.remove('dontshow');
            document.querySelector(".win").classList.add('dontshow');
            document.querySelector(".loose").classList.remove('dontshow');
           clearInterval(dTime);
       } else {
           ennemie.style.left = randomStart;
       }
    }
}

function laserShot(){
    var positionV = window.getComputedStyle(vaisseau, null);
    var positionLeft = parseInt(positionV.left);
    var missile = document.createElement("img");
    missile.src="images/fire.png";
    missile.style.position="absolute";
    missile.style.left = positionLeft - 6 + "px";
    missile.style.bottom = 150 + "px";
    missile.className = "shot";
    document.body.appendChild(missile);
    
    var pos = 150;
    var id = setInterval(frame, 5);
    var missileTop = missile.offsetTop;
    function frame() {
        if (pos == hauteur){
            clearInterval(id);
            document.querySelector("body").removeChild(missile);
        } else {
            pos++; 
            missile.style.bottom = pos + 'px';
            killInvader();
        }
    }
}

function killInvader(){
    var invaders = document.querySelectorAll("img.invaders");
    var shuts = document.querySelectorAll(".shot");
    var score = document.querySelector(".bgscore");
    var stylescore = window.getComputedStyle(score, null);
    var body = document.querySelector("body");

    for(j=0; j<shuts.length; j++){
        for(i=0; i<invaders.length; i++){
            if(parseInt(shuts[j].getBoundingClientRect().left) >= parseInt(invaders[i].getBoundingClientRect().left)  && parseInt(shuts[j].getBoundingClientRect().right) <= parseInt(invaders[i].getBoundingClientRect().right)){
                if(parseInt(shuts[j].getBoundingClientRect().top) >= parseInt(invaders[i].getBoundingClientRect().top) && parseInt(shuts[j].getBoundingClientRect().bottom) <= parseInt(invaders[i].getBoundingClientRect().bottom) && (!invaders[i].classList.contains('hidden'))){
                    invaders[i].classList.add('hidden');

                    shuts[j].classList.add('tir-hidden');
                    score.style.height = parseInt(stylescore.height) + 36 + "px";
                }   
            }
                if(invaders[0].classList.contains('hidden') && invaders[1].classList.contains('hidden') && invaders[2].classList.contains('hidden') && invaders[3].classList.contains('hidden') && invaders[4].classList.contains('hidden') && invaders[5].classList.contains('hidden') && invaders[6].classList.contains('hidden') && invaders[7].classList.contains('hidden') && invaders[8].classList.contains('hidden') && invaders[9].classList.contains('hidden') && invaders[10].classList.contains('hidden') && invaders[11].classList.contains('hidden') && invaders[12].classList.contains('hidden') && invaders[13].classList.contains('hidden') && invaders[14].classList.contains('hidden') && invaders[15].classList.contains('hidden') && invaders[16].classList.contains('hidden') && invaders[17].classList.contains('hidden') && invaders[18].classList.contains('hidden') && invaders[19].classList.contains('hidden') && invaders[20].classList.contains('hidden') && invaders[21].classList.contains('hidden') && invaders[22].classList.contains('hidden') && invaders[23].classList.contains('hidden')){
                    ecranGame.classList.add('dontshow');
                    ecranEnd.classList.remove('dontshow');
                    document.querySelector(".loose").classList.add('dontshow');
                }
        }
    }
}




function alienShot(){
    if(!document.querySelector('img.invaders').classList.contains('hidden')){
        var invaders2 = document.querySelectorAll("img.invaders");
        var body = document.querySelector("body");
        var randomalien = parseInt(Math.random()*(invaders2.length));
            var lasers = document.createElement("div");
                lasers.style.width="2px";
                lasers.style.height="8px";
                lasers.style.backgroundColor="white";
                lasers.style.position="absolute";
                lasers.style.left = invaders2[randomalien].offsetLeft + ennemie.offsetLeft + (invaders2[randomalien].offsetHeight/2.5) + "px";
                lasers.style.top = invaders2[randomalien].offsetTop + ennemie.offsetTop;
                lasers.className = "lasers";
            document.body.appendChild(lasers);

            var posLaser = invaders2[randomalien].offsetTop + ennemie.offsetTop;
            var it = setInterval(lasersHit, 3);
            var LaserTop = invaders2[randomalien].offsetTop;
            function lasersHit() {
                if (posLaser == hauteur){
                    clearInterval(it);
                    document.querySelector("body").removeChild(lasers);
                } else if(parseInt(lasers.getBoundingClientRect().top) >= parseInt(vaisseau.getBoundingClientRect().top) && parseInt(lasers.getBoundingClientRect().bottom) <= parseInt(vaisseau.getBoundingClientRect().bottom) && parseInt(lasers.getBoundingClientRect().left) >= parseInt(vaisseau.getBoundingClientRect().left)  && parseInt(lasers.getBoundingClientRect().right) <= parseInt(vaisseau.getBoundingClientRect().right)) {
                    document.querySelector(".life").src="images/"+"life"+(nbvie-1)+".png";
                    lasers.classList.add('tir-hidden');
                    nbvie = nbvie-1;
                } else if(nbvie == 0) {
                    ecranGame.classList.add('dontshow');
                    ecranEnd.classList.remove('dontshow');
                    document.querySelector(".win").classList.add('dontshow');
                    document.querySelector(".loose").classList.remove('dontshow');
                } else {
                    posLaser++; 
                    lasers.style.top = posLaser + 'px';
                }
            }
    }
    setTimeout("alienShot()", 3000);
}
    setTimeout("alienShot()", 3000);
killInvader();