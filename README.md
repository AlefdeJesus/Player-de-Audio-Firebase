# Player-de-Audio-Firebase
# https://playmusic-1e601.web.app
# Player de audio usando recursos do firebase
# *Crie um projeto no firebase.
# *preencha os campos com os dados de seu projeto firebase nos arquivos (firebase.js e dadosfirebase.js)
# *ative a autenticação pelo Google e coloque seu domínio de uso
 
# regras do firestore:


rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write:if request.auth != null;
    }
  }
}


# regras do storage:

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
  match /musicas{
  	
    match /{allPaths=**} {
    	allow  read:if request.auth != null;
     
    }
    match /{musicas} {
     allow write:if request.auth != null && request.resource.size < 13 * 1024 * 1024
     && musicas.matches(".*\\.mp3")
     && musicas.size() < 120;
    }
   }
  }
}
