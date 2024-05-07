var unlocked = 0;

function func(){

    var unlk = parseInt(document.getElementById("unlocked").innerHTML)
    var uid = parseInt(document.getElementById("id").innerHTML)
    unlocked = unlk; 
    var temp = "";
    var t=1;
    var g=1;
    

    for (let i=0; i<unlk; i++){
        if((i+1)%3==0){
            temp += "<img id='game"+i+"' class='btng' src='../static/island.png' onclick='sendData(2, "+g+", "+uid+")' onmouseover='showinfog("+g+")' onmouseout='hideinfo()'>"
            g++;
        }
        else{
            temp += "<img id='game"+i+"' class='btnt' src='../static/island.png' onclick='sendData(1, "+t+", "+uid+")'  onmouseover='showinfot("+t+")' onmouseout='hideinfo()'>"
            t++;
        }
    }
    for(let i=unlk; i<9; i++){
        if((i+1)%3==0){
            temp += "<img id='game"+i+"' class='lkd' src='../static/island.png' onmouseover='showinfog("+g+")' onmouseout='hideinfo()'>"
            g++;
        }
        else{
            temp += "<img id='game"+i+"' class='lkd' src='../static/island.png'  onmouseover='showinfot("+t+")' onmouseout='hideinfo()'>"
            t++;
        }
    }

    var div = document.getElementById("buttons")
    div.innerHTML = temp

}

function sendData(thing, num, uid){

    if(thing == 1){
        window.location = "/tutorial/"+num.toString()+"/"+uid.toString()
    }
    else{
        window.location = "/game/"+num.toString()+"/"+uid.toString()
    }

}

function showtip(){

    var tiplist = ["Practice regularly, even if it's just for a few minutes each day, to reinforce your skills!",
    "Immerse yourself in ASL by watching videos, attending events, and engaging with the Deaf community!",
    "Find a partner who is fluent in ASL to practice with regularly!",
    "Learn about Deaf culture to deepen your understanding and appreciation of ASL!",
    "Pay attention to non-manual markers like facial expressions and body language, which are integral to ASL!",
    "Seek feedback from fluent signers or instructors to improve your skills!",
    "Have fun with your learning journey, exploring games, storytelling, and practicing with friends!"]

    var x = Math.floor(Math.random() * 7);
    var tip = tiplist[x];

    document.getElementById("tip").style.display = "block";
    document.getElementById("tipbody").innerHTML = tip;

}

function closeit(){
    
    document.getElementById("tip").style.display = "none";
    
}

function showinfot(num){

    var temp = "";
    num = (num-1);
    var t = 0;

    if(num == 0){
        var temp = "Tutorial " + (num+1) + ":<br><br>Learn the alphabet in ASL!";
        var top = getComputedStyle(game0).top;
        var left = getComputedStyle(game0).left;
    }
    if(num == 1){
        var temp = "Tutorial " + (num+1) + ":<br><br>Learn basic salutations in ASL(American Sign Language)!";
        var top = getComputedStyle(game1).top;
        var left = getComputedStyle(game1).left;
        t=1;
    }
    if(num == 2){
        var temp = "Tutorial " + (num+1) + ":<br><br>Words: Fruits, vegetables, animals!";
        var top = getComputedStyle(game3).top;
        var left = getComputedStyle(game3).left;
        t=3;
    }
    if(num == 3){
        var temp = "Tutorial " + (num+1) + ":<br><br>Learn to hold casual conversations!";
        var top = getComputedStyle(game4).top;
        var left = getComputedStyle(game4).left;
        t=4;
    }
    if(num == 4){
        var temp = "Tutorial " + (num+1) + ":<br><br>Learn to converse in different settings: Talk about school!";
        var top = getComputedStyle(game6).top;
        var left = getComputedStyle(game6).left;
        t=6;
    }
    if(num == 5){
        var temp = "Tutorial " + (num+1) + ":<br><br>Learn to converse in different settings: Shops and stores!";
        var top = getComputedStyle(game7).top;
        var left = getComputedStyle(game7).left;
        t=7;
    }

    var el = document.getElementById("info");
    el.innerHTML = temp;
    el.style.visibility = "visible"
    el.style.top = (parseFloat(top)+45)+"px";
    el.style.left = (parseFloat(left)+55)+"px";
    el.style.fontSize = "large"
    el.style.borderRadius = "1% 10% 10% 10%"; 
    el.style.height = "18%";

    if(t>=unlocked){
        el.style.backgroundColor = "rgb(40, 40, 40, 0.5)"
        el.style.color = "white"
    }
    else{
        el.style.backgroundColor = "rgb(255, 255, 255, 0.5)"
        el.style.color = "black"
    }

}

function showinfog(num){

    var temp = "";
    var t = 1;

    if(num == 1){
        var temp = "Game " + t + ":<br><br>Flip! Flip! Flip!";
        var top = getComputedStyle(game2).top;
        var left = getComputedStyle(game2).left;
    }
    if(num == 2){
        t=2;
        var temp = "Game " + t + ":<br><br>Eat! Eat! Eat!";
        var top = getComputedStyle(game5).top;
        var left = getComputedStyle(game5).left;
    }
    if(num == 3){
        t=3;
        var temp = "Game " + t + ":<br><br>Hang! Hang! Hang!";
        var top = getComputedStyle(game8).top;
        var left = getComputedStyle(game8).left;
    }

    if(t==3){
        var el = document.getElementById("info");
        el.innerHTML = temp;
        el.style.visibility = "visible"
        el.style.top = (parseFloat(top)+45)+"px";
        el.style.left = (parseFloat(left)-150)+"px";
        el.style.fontSize = "large"
        el.style.borderRadius = "10% 1% 10% 10%"; 
        el.style.height = "10%";
    }
    else{
        var el = document.getElementById("info");
        el.innerHTML = temp;
        el.style.visibility = "visible"
        el.style.top = (parseFloat(top)+45)+"px";
        el.style.left = (parseFloat(left)+55)+"px";
        el.style.borderRadius = "1% 10% 10% 10%"; 
        el.style.fontSize = "large"
        el.style.height = "10%";
    }

    if(((num*3)-1)>=unlocked){
        el.style.backgroundColor = "rgb(40, 40, 40, 0.5)"
        el.style.color = "white"
    }
    else{
        el.style.backgroundColor = "rgb(255, 255, 255, 0.5)"
        el.style.color = "black"
    }

}

function showinfof(){
    var temp = "";
    var temp = "The Final Test of SignWorld!";

    var top = getComputedStyle(fin).top;
    var left = getComputedStyle(fin).left;

    var el = document.getElementById("info");
    el.innerHTML = temp;
    el.style.visibility = "visible"
    el.style.top = (parseFloat(top)+55)+"px";
    el.style.left = (parseFloat(left)+65)+"px";
    el.style.fontSize = "large"
    el.style.borderRadius = "1% 10% 10% 10%"; 
    el.style.height = "5%";

    if(unlocked == 9){
        el.style.backgroundColor = "rgb(255, 255, 255, 0.5)"
    }
    else{
        el.style.backgroundColor = "rgb(40, 40, 40, 0.5)"
        el.style.color = "white"
    }
}

function hideinfo(){

    var el = document.getElementById("info");
    el.style.visibility = "hidden";
    el.innerHTML = "";

}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  } 
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

