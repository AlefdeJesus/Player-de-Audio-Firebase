
//////////////////////////////////////////////
  let email = document.getElementById('email')
  let senha = document.getElementById('senha')
  let btnEntrar = document.getElementById('btnEntrar')
  btnEntrar.addEventListener('click',function(){
    firebase.auth().signInWithEmailAndPassword(email.value, senha.value)
    .then((resultado) => {
      // Signed in
      var user = resultado.user;
      window.location.replace('./player/player.html')
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Usuário ou senha invalida!')
    });
  })
  /////////VALIDANDO E-MAILS////////////////
validacaoEmailLogin = (field)=>{
usuario = field.value.substring(0, field.value.indexOf("@"));
dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);
if ((usuario.length >=1) &&
    (dominio.length >=3) &&
    (usuario.search("@")==-1) &&
    (dominio.search("@")==-1) &&
    (usuario.search(" ")==-1) &&
    (dominio.search(" ")==-1) &&
    (dominio.search(".")!=-1) &&
    (dominio.indexOf(".") >=1)&&
    (dominio.lastIndexOf(".") < dominio.length - 1)) {
}
else{
alert(" Este E-mail é invalido!");
}
}
////SE o usuário já estiver autenticado leve o mesmo para a tela de home////
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    
    var uid = user.uid;
    // ...
    window.location.replace('./player/player.html')
   // window.location.href = "./player/player.html"
  } else {

    // User is signed out
    // ...
  }
});
