var chckUsrName = false;
var nameofUser;
window.onload = function () {
    var username = document.getElementsByName("UserName")[0];
    username.focus;
        username.onblur = function () { //validation on the user name to force him to write its name
        if (username.value != "") {
            chckUsrName = true;
            username.className = "";
            nameofUser = username.value;

        }
        else {
            username.focus();
            username.className = "Error";
            username.select();
            chckUsrName = false;
        }

    }
}

function EasyLevel() {  //in this case the user Pressed the Easy btn
    if (chckUsrName == false) {  //if the user didnot write any name fire alert 
        alert("Please Enter Your Name First to start the game :( ");
    }
    else { //Send the user to the Game Page with its name and the Game Level He Choose(Easy Level)
        window.open("Game.html?type=easy&userofname=" + nameofUser);
    }

}

function NormalLevel() { //in this case the user Pressed the Normal btn
    if (chckUsrName == false) { //if the user didnot write any name fire alert
        alert("Please Enter Your Name First to start the game :( ");
    }
    else {//Send the user to the Game Page with its name and the Game Level He Choose(Normal Level)
        window.open("Game.html?type=normal&userofname=" + nameofUser);
    }

}
