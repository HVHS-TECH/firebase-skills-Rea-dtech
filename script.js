/*

/**************************************************************
 **************************************************************
 **                                                          **
 ** script.js is where you will write most of your code.     **
 **                                                          **
 **************************************************************
 **************************************************************/

 let user = "toby";
let score = 0;
let points = 4;
var GLOBAL_user;

const HTML_OUTPUT = document.getElementById("databaseOutput");

/**************************************************************/
// helloWorld()
// Demonstrate a minimal write to firebase
// This function replaces the entire database with the message "Hello World"
// 
// This uses the set() operation to write the key:value pair "message":"Hello World"
// The ref('/') part tells the operation to write to the base level of the database "/"
// This means it replaces the whole database with message:Hello World
/**************************************************************/

function helloWorld() {
  console.log("Running helloWorld()")
  firebase.database().ref('/').set(
    {
      message: 'Kia ora'
    }
  )
}
function goodBye() {
  console.log("Running goodBye")
  firebase.database().ref('/').set(
    {
      message: 'Ka kite ano'

    }
  )
}
//simple read (reads the database)
function simpleRead() {
  console.log("Reading message");
  firebase.database().ref('/').child('message').once('value', displayRead);
  console.log("Leaving simpleRead")

}

function displayRead(snapshot) {
  console.log("Running displayRead(), the message is: " + snapshot.val())
  HTML_OUTPUT.innerHTML = snapshot.val();
}
//if there is no data dbData will be null
function display(snapshot) {
  var dbData = snapshot.val();
  if (dbData == null) {
    console.log('there was no record when trying to read the message');
  }
  else {
    console.log("the message is: " + dbData)
  }
  HTML_OUTPUT.innerHTML = snapshot.val();
}

//dumps the error message to the console
function fb_readError(error) {
  console.log("there was an error reading this message")
  console.error(error);
}


//got up too the have a go on basic read

function safeRead() {
  console.log("running safeRead");
  firebase.database()
    .ref('/')
    .child('message')
    .once('value', display, fb_readError,);

  console.log("safeRead complete")


}
//realtime listener
function fb_readListener() {
  console.log("Read Listener")
  firebase.database()
    .ref('/message')
    .on('value', display, fb_logDatabaseRead)
}

function fb_logDatabaseRead() {
  console.log("listener reading database")
  firebase.database()
    .ref('/message')
    .on('value', display, fb_readError);

}

function highScoreTable() {
  highscoreTable = {
    highScores: {
      game1: {
        users: {
          Dhruv: 99,
          jack: 111,
          micheal: 3.232,
          yug: 1288123913,
          rea: 4,
        }
      },
      game2: {
        users: {
          Dhruv: 12121,
          jack: 14,
          mikaela: 1,
          sasha: 2,
          yug: 23,
        }
      }
    }
  }

  firebase.database()
    .ref('/')
    .set(highscoreTable)

  firebase.database()
    .ref('/highScores/game1/users/jenna/')
    .set(232)

  firebase.database()
    .ref('/highScores/game1/users/' + user)
    .set(score)
}
function fb_readHighScores() {
  console.log("Reading High scores");
  firebase.database().ref('/highScores/game1/users').orderByValue().limitToLast(3).once('value', fb_displayHighScores, fb_readError)
}

function fb_displayHighScores(snapshot) {
  let highScores = snapshot.val()
  console.log("Rea got" + highScores["Rea"] + "points")
  let names = Object.keys(highScores);
  console.log(names);
  for(i = 0; i < names.length;i++){
    let key = names[i];
    console.log("Score "+i+" is for "+ key +". "+ highScores[key] + " points.")
  }

}

function reasHighScores() {
  firebase.database()
    .ref('/highScores/game1/users/rea')
    .once('value', function (snapshot) {
      let score = snapshot.val();
      console.log('reas high score is ' + score)
    }, fb_readError);
}

function fb_displayHighScores(snapshot) {
  snapshot.forEach(fb_showOneScore)
}

function fb_showOneScore(child) {
  console.log(child.key + " got " + child.val() + " points ");


}

function sortByName() {
  console.log('sorting by name')
  firebase.database()
    .ref("/highScores/game1/users")
    .orderByKey() 
    .once('value', fb_displayHighScores, fb_readError);

}

function fb_handleLogin(_user) {
  if (_user) {
    console.log("User is logged in")
    GLOBAL_user = _user;// saving user details
  
  } else {
    console.log("User is not logged in - starting the pop up")
    fb_popupLogin();
  }
}



//listener for login state
function fb_login() {
  authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
}

//run when login state of user changes
function fb_handleLogin(_user) {
  if (_user) {
    console.log("User is logged in")
    GlOBAL_user = _user; //save the object to a global varible
  } else {
    console.log("User is not logged in - starting the popup process")
    fb_popupLogin();
  }
}

// run the google login prompt
function fb_popupLogin () {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user;
    console.log("User has logged in")
  });
  }


// runs the fb_readListener function
fb_readListener();

