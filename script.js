/**************************************************************
 **************************************************************
 **                                                          **
 ** script.js is where you will write most of your code.     **
 **                                                          **
 **************************************************************
 **************************************************************/

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
function helloWorld(){
  console.log("Running helloWorld()")
  firebase.database().ref('/').set(
    {
      message: 'Kia ora'
    }
  )
}
function goodBye(){
  console.log("Running goodBye")
  firebase.database().ref('/').set(
    {
      message: 'Ka kite ano'

    }
  )
}
//simple read (reads the database)
function simpleRead(){
 console.log("Reading message");
 firebase.database().ref('/').child('message').once('value', displayRead);
 console.log("Leaving simpleRead")

}

function displayRead(snapshot) {
  console.log("Running displayRead(), the message is: " + snapshot.val())
    HTML_OUTPUT.innerHTML = snapshot.val();
}
//if there is no data dbData will be null
function display(snapshot){
  var dbData = snapshot.val();
  if (dbData ==null) {
    console.log ('there was no record when trying to read the message');
  }
  else {
    console.log("the message is: " +dbData)
  }
  HTML_OUTPUT.innerHTML = snapshot.val();
}

//dumps the error message to the console
function fb_readError(error) {
  console.log("there was an error reading this message")
  console.error(error);
}


//got up too the have a go on basic read

function safeRead(){
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

function fb_logDatabaseRead(){
  console.log("listener reading database")
  firebase.database()
  .ref('/message')
  .on('value', display, fb_readError);

}

fb_readListener();