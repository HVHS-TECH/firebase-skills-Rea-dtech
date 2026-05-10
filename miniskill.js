var GLOBAL_user;



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

function hello() {
    if (GLOBAL_user) {
        console.log(GLOBAL_user.displayName);
        
       
    } else {
        console.log("log in first");
    }
}
 

function favfood() {
    if (!GLOBAL_user) {
        console.log("Please log in first");
        return;
    }

    let username = GLOBAL_user.displayName;
        let favFood = prompt(
            "Hello " + username + ". What is your fav food?"
        ); 
        console.log(username + "'s favorite food is " + favFood);
        firebase.database.ref('/').set(
            favfood
        )
    }