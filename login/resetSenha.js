
let emailReseteSenha = document.getElementById('emailResete')
let enviarResete = document.getElementById('enviarResete')
 /////////VALIDANDO E-MAILS////////////////
validacaoEmailResete = (field)=>{
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
enviarResete.addEventListener('click', ()=>{
	firebase.auth().sendPasswordResetEmail(emailReseteSenha.value)
	.then(()=>{
		alert('Enviamos um link de restauração de senha para o e-mail digitado!');
		   window.location.replace('../index.html')
	})
	.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert('Verifique se o e-mail esta correto!')
			  });
})

