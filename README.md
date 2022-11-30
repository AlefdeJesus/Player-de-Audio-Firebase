# Player-de-Audio-Firebase
 Player de audio usando recursos do firebase
#regras do firestore


rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write:if request.auth != null;
    }
  }
}
