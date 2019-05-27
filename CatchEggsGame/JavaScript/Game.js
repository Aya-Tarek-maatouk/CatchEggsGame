var flag = [];// flag determine if chicken reach left most not 
var pos = []; // positions of birds as debend on it we create eggs

var counter = 0; //counter of catched eggs
var EggsPosstart = [];//(Y_Axis of egg) top position of each egg

scrwidth = window.screen.width - 120;
scrheight = window.screen.height - 150;
var TypeofGame;
var maxscore_easy = 15; // the goal score for easy level
var maxscore_normal = 20; // the goal score for Normal level
var Data = {};// object has 2 properties [typeOfGame],[Username]
var Sec = 0  // seconds
var Min = 0 //minutes
var flag_pus = false; // pause flag
var timercounter = 0; // to calculate the time
window.onload = function () {
    init(); // initialize the start position of the Basket 
    /*Read the Data from the url (the User Name and Game Type)  */ 
    var query = location.search.substring(1); 
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        Data[name] = value;// assign name property --> value
    }
    //assign the Type of Game To  TypeofGame var
    TypeofGame = Data["type"];
    //Write the user Name in  the Game Page
    document.getElementById("userName").innerHTML = Data["userofname"].toString();

    //if the user Pressed Pause btn and the game was Paused it will resume 
    // if it was Resumed it will Pause it 
    document.getElementById("btn_pause").onclick = function () {
        if (flag_pus == true) //the game was paused but Now i will continue playing 
        {
            flag_pus = false;
            document.getElementById("btn_pause").value = "Pause";
        }
        else //the game is actually working and Now will be paused 
         {
            flag_pus = true;
            document.getElementById("btn_pause").value = "Resume";

        }
    }

};
// we discare old idea of setInterval for timer as timer was continuing even if game paused
// global var timercounter is increamenting till timing out at 60 sec that equivlant to 60000 milli sec
function timer() {//60 sec
    if (timercounter < 60000 && flag_pus == false) {
        timercounter = timercounter + 1000;// plus 1 sec == 1000 millisec
        if (Sec == 60) {
            Min++;
            Sec = 0;
            document.getElementById("timer").innerHTML = Min + " : " + Sec;

        }
        else {
            Sec++;
            document.getElementById("timer").innerHTML = Min + " : " + Sec;
        }
    }
    else if (flag_pus == false){
        GameFinishedTime();
    }
}// initiate position of basket
function init() { 
    element = document.getElementById("basket");
    element.style.position = 'absolute';
    element.style.left = '0px';
    element.style.top = '500px';
}
//1366
var leftPres = 0;
var RightPres = 0;
// we always access basket(element)by left --> element.style.left 
// so, right_arrow ---> plus old left - leftPress
function left_arrow_pressed() {
    RightPres = 0;
    leftPres += 5;
    if ((element.getBoundingClientRect().x - leftPres) >= 0) {

        element.style.left = parseInt(element.style.left) - leftPres + "px";
    }

}// we always access basket(element)by left --> element.style.left 
// so, right_arrow ---> plus old left + RightPress
function right_arrow_pressed() {
    RightPres += 5;
    leftPres = 0;
    if ((element.getBoundingClientRect().x + RightPres) <= 1300) {
        element.style.left = parseInt(element.style.left) + RightPres + "px";
    }
}
// call Left_arrow_pressed and Right _arrow_pressed
function move_selection(e) {
    var evt = e.which || e.keyCode;
    if (flag_pus == false) {
        switch (evt) {
            case 37:
                left_arrow_pressed();
                break;
            case 39:
                right_arrow_pressed();
                break;
        }
    }
}
/*Creation of the Birds*/
function createBirds(NoOfBirds) {
    r = 10;// to be shifted from right border of screen 
    for (var i = 0; i < NoOfBirds; i++) {
        var im = document.createElement("img");// img of bird 
        im.setAttribute("src", "../Images/bird.gif");
        im.style.position = "absolute";// to access top , right
        im.style.top = "40px";
        im.style.right = r + "px",
        im.style.transform = "rotateY(180deg)";
        document.getElementById("maincontainer").appendChild(im);// maincontainer is main div 
        im.className = "MyChickens";// give hust created img a classname to be able to access all birds
        flag[i] = true;// determine if chicken reach left most not 
        im.style.width = "100px";
        im.style.height = "100px";
        r += 150;// distance between each bird
    }

}
/*Creation of the Eggs */
var EggsCounter = 0;
function createEggs(NoOfEggs,typeOfEggs) { //take the number of eggs which also represent the birds count
    var ceg = 25;
    if (flag_pus == false) {// flag of gae paused Game not Paused it's working right now
        for (var i = 0; i < NoOfEggs; i++) { // create img for each egg and make its left as the left of the bird
            var im = document.createElement("img");// img of egg
            if (typeOfEggs == "White")
                im.setAttribute("src", "../Images/WhiteEggs.png");
            else if (typeOfEggs == "Gold")
                im.setAttribute("src", "../Images/GoldEggs.png");
            else
                im.setAttribute("src", "../Images/BlackEggs.png");

            im.style.position = "absolute";
            im.style.width = "30px";
            im.style.height = "35px";
            document.getElementById("maincontainer").appendChild(im);
            // find checken position to create egg from this pos
            // parseInt( , 10 ) param 10 -> used in parsing to int
            // chickens[i].style.left ---> because we move checken to left
            temp = parseInt(chickens[i].style.left, 10); //put the egg at the end of the bird img
            // temp is X-axis
            im.style.left = temp + 25 + "px";// temp is pos of bird 
            //EggsPosstart is Y_axis
            EggsPosstart.push(50);     //contain the top values of each egg 
            im.style.top = EggsPosstart[EggsPosstart.length - 1] + "px";
            im.classList.add(typeOfEggs);//ClassList of eggsType  (White ,Gold or Black)  used to calc. score
            im.classList.add("MyEggs"); // Name it to be able to select it later
            // Math.random() * 100 --> To move the egg with Random Time .
            //EggMovment Takes the Egg Image which will be moved and the Image index To be able to access its current position from the EggsPosstart array
            setInterval(EggsMovement, Math.random() * 100, im, EggsCounter);
            EggsCounter++;
            //EggsCounter is as index by it I'll access EggsPosstart array
        }
    }
}
/*button (StartThe Game) clicked */
/* Define the type of eggs Depending on the Game Type*/
function StartGame() {
    setInterval(timer, 1000); // call function timer each 1 sec == 1000 milli sec
    document.getElementById("button").style.visibility = "hidden";// hide button of Start Game
 
    if (TypeofGame == "easy") {
        createBirds(3);
        setInterval(BirdMovement, 10);
        // createEggs function's parameters are number of eggs=>3 and color of egg => white
        // 3000 is the interval of calling function
        setInterval(createEggs, 3000, 3, "White");// in function Create Eggs we call Move egss function

    }
    else {
        createBirds(5);
        setInterval(BirdMovement, 10);
        setInterval(createEggs, 5000, 5, "White");
        setInterval(createEggs, 8000, 2, "Gold");
        setInterval(createEggs, 11000, 2, "Black");   

    }
    setInterval(CheckCatch, 1);// check number of catched eggs in basket every 1 msec 
    chickens = document.getElementsByClassName("MyChickens");// get all of chickens
    basket = document.getElementById("basket");
    /* Define the Chicken Direction (flag) And initial Position of the checkens (pos)  */
    for (var i = 0; i < chickens.length; i++) {
        flag[i] = true;// determine if chicken reach left most not 
        pos[i] = chickens[i].offsetLeft;// save current pos of bird
    }
}

function BirdMovement() {
    //select all the chickens
    chickens = document.getElementsByClassName("MyChickens");
    if (flag_pus == false) { //if the Game is running now  && Not Paused
        for (var i = 0; i < chickens.length; i++) { //Loop on the chickes to be able to Move it
            if (flag[i]) {// flag array to determine for each bird a direction
                chickens[i].style.left = (pos[i]--) + "px";
                if (pos[i] == 0) {// reach left most 
                    chickens[i].style.transform = "rotateY(360deg)";
                    flag[i] = false;// to change current direction
                }
            }
            if (!flag[i]) {
                chickens[i].style.left = (pos[i]++) + "px";
                if (pos[i] == scrwidth) {
                    chickens[i].style.transform = "rotateY(180deg)";
                    flag[i] = true;
                }
            }
        }
    }
}
function EggsMovement(Newegg, i) {// i is the index of current egg in EggsPosstart array
    var egg = Newegg;
    if (flag_pus == false) {
        
        var randNo = (Math.random() * 6);
        // EggsPosstart[i] current pos in Y_axis plus random value to move down but fisrt check if reach bottom or not 
       //(scrheight - 50) ---> reach bootom
        if (EggsPosstart[i] + randNo < (scrheight - 50)) {
            //if the egg position less than the height of the window increase the position
            EggsPosstart[i] += randNo;
            egg.style.top = (EggsPosstart[i]) + "px";// new top
        }
        else {// reach bottom
            egg.remove();
        }
    }
}
function CheckCatch() {
    basket = document.getElementById("basket");
    // select all current eggs ignoring deleted ones
    Eggs = document.getElementsByClassName("MyEggs");//get all eggs again in case some images are deleted
    document.getElementById("Score").innerHTML = counter.toString();
    
    if (flag_pus == false) {

        for (var i = 0; i < Eggs.length; i++) {
            var eggleft = Number.parseInt(Eggs[i].style.left);
            var eggwidth = Number.parseInt(Eggs[i].style.width);
            var eggtop = Number.parseInt(Eggs[i].style.top);
            var eggheight = Number.parseInt(Eggs[i].style.height);

            var basketleft = Number.parseInt(basket.style.left);
            var basketwidth = Number.parseInt(basket.style.width);
            var baskettop = Number.parseInt(basket.style.top);
            // var basketheight = Number.parseInt(basket.style.height);
            if ((eggleft >= basketleft) && (eggleft + eggwidth) <= (basketleft + basketwidth) && (eggtop >= baskettop) && (eggtop < scrheight - 100)) {
                type = Eggs[i].classList[0];// classList[0] -->check egg color
                if (type == "White") {
                    counter++;
                }
                else if (type == "Gold") {
                    counter += 3;
                }
                else {
                    counter -= 10;
                }
                document.getElementById("Score").innerHTML = counter.toString();

                Eggs[i].remove();

            }


        }
        // if reach score befor time out  --> end game
        if (TypeofGame == "easy") {
            if (counter == maxscore_easy) { GameFinishedTime();}
        }
        else {
            if (counter == maxscore_normal) { GameFinishedTime(); } }
    }

}

function GameFinishedTime() {
    // confirm div --> ask for playing again or not 
    document.getElementsByClassName("FinalGame")[0].style.display = "block";// div of transparent white cover behined div
    document.getElementsByClassName("FinalGame")[1].style.display = "block";// front div in it ask user if want to play again
    user_score = document.getElementById("UserFinalScore");// get span to write in it final score of user 
    user_score.innerHTML = document.getElementById("Score").innerHTML;
    best_score = document.getElementById("BestScoreOfGame");

    if (TypeofGame == "easy") {
        best_score.innerHTML = maxscore_easy;// display to front div actual max score that compared with
        // div id of BestScoreOfGame 
        if (parseInt(user_score.innerHTML) >= maxscore_easy) {
            document.getElementById("WordForUser").innerHTML = "WINNER";
        }
        else {
            document.getElementById("WordForUser").innerHTML = "GAME OVER";
        }
    }
    else {
        best_score.innerHTML = maxscore_normal;
        if (parseInt(user_score.innerHTML) >= maxscore_normal) {
            document.getElementById("WordForUser").innerHTML = "WINNER";
        }
        else {
            document.getElementById("WordForUser").innerHTML = "GAME OVER";
        }
    }
    // if user want to play again --> must send data  of username and typeOfGame in URL 
    document.getElementById("PlayAgain").onclick = function () { 
        location.assign("Game.html?type=" + TypeofGame + "&userofname=" + Data["userofname"].toString());       
    }//if user chose to exit (No play again) navigate him to Home page again
    document.getElementById("NoPlayAgain").onclick = function () {
        location.assign("HomePage.html");      
    }

}
