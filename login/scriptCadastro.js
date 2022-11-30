let emailCadastro = document.getElementById('email-cadastro')
let senhaCadastro1 = document.getElementById('senha-cadastro1')
let senhaCadastro2 = document.getElementById('senha-cadastro2')
let btncadastrar = document.getElementById('btncadastrar')
cadastro = ()=>{
	validarSenha()
}
/////////VALIDANDO E-MAILS////////////////
validacaoEmailCadastro = (field)=>{
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
///VALIDANDO SENHAS////////
senhaForca = (forca)=>{
     var forca = 0;
    if((senhaCadastro1.value.length >= 4) && (senhaCadastro1.value.length <= 7)){
		forca += 10;
	}else if(senhaCadastro1.value.length > 7){
		forca += 25;
	}
	if((senhaCadastro1.value.length >= 5) && (senhaCadastro1.value.match(/[a-z]+/))){
		forca += 10;
	}
	if((senhaCadastro1.value.length >= 6) && (senhaCadastro1.value.match(/[A-Z]+/))){
		forca += 20;
	}
	if((senhaCadastro1.value.length >= 7) && (senhaCadastro1.value.match(/[@#$%&;*]/))){
		forca += 25;
	}
    mostrarForca(forca)
}
mostrarForca = (forca)=>{
    if(forca < 30 ){
	let senhafraca = document.getElementById("impForcaSenha").innerHTML = "<span style='color: #ff0000;font-size:20px'>Senha Fraca</span>";
	}else if((forca >= 30) && (forca < 50)){
	let senhamedia = document.getElementById("impForcaSenha").innerHTML = "<span style='color: #FFD700;font-size:20px'>Senha Média</span>";
	}else if((forca >= 50) && (forca < 70)){
		let senhaforte = document.getElementById("impForcaSenha").innerHTML = "<span style='color: #7FFF00;font-size:20px'>Senha Forte</span>";
	}else if((forca >= 70) && (forca < 100)){
		let senhaexcelente = document.getElementById("impForcaSenha").innerHTML = "<span style='color: #008000;font-size:20px'>Senha Excelente</span>";
	}
	this.tot = forca
}
validarSenha = (forca)=>{
console.log(`forcaSenha ${this.tot}`)
	if(this.tot >= 30){
		if(senhaCadastro1.value == senhaCadastro2.value ){
			firebase.auth().createUserWithEmailAndPassword(emailCadastro.value, senhaCadastro1.value)
			  .then((userCredential) => {
				// Signed in
				var user = userCredential.user;
				 window.location.replace('../index.html')
			  })
			  .catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert('Favor verificar se todos os campos estão preenchidos corretamente!')
			  });
		}else{
		alert('Senhas divergente!')
  }
	}else{
		alert('Senha muinto fraca!  Sua senha deve ser no minimo média')
	}
}

