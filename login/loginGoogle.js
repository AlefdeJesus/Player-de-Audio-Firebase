const loginGoogle = document.querySelector('#loginGoogle')
const auth = firebase.auth();
function google(){
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  .then(() => {
     window.location.assign('./player/player.html');
  })
  .catch(error => {
    console.error(error);
  })
}

