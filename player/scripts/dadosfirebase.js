  // Import the functions you need from the SDKs you need
  //import { arquivo } from "./upload.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
  import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-storage.js";
  import { getFirestore,collection, addDoc,getDocs,  doc, onSnapshot, query, where} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
  import { getAuth, onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
  import { sencondsToMinutes } from "./convSegundos.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "adiciona seus dados aqui",
    authDomain: "adiciona seus dados aqui",
    projectId: "adiciona seus dados aqui",
    storageBucket: "adiciona seus dados aqui",
    messagingSenderId: "adiciona seus dados aqui",
    appId: "adiciona seus dados aqui",
    measurementId: "adiciona seus dados aqui",
    storageBucket: 'adiciona seus dados aqui'
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const db = getFirestore(app);
  var auth = getAuth(app);

  const userupload = document.querySelector('#userupload'); 
  const display_progress = document.querySelector('.progress');
  const progresso = document.querySelector('#progresso');

 

/////////////////////PLAYER/////////////////////////////////


const title_music = document.querySelector('#title_music')
   const q = query(collection(db, "dadosmusicas"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
        title_music.innerHTML = ''
        
         var cities = []; 
        
       querySnapshot.forEach((doc) => {
          
         cities.push({track:doc.data().link, name:doc.data().name, user:doc.data().user});
         //A FUNÇÃO ABAIXO NÃO DEIXA O OBJETO ATUALIZAR EM TEMPO REAL, SE ATUALIZAR EM TEMPO REAL 
         //DA BUG NO PLAY_PAUSE POR CONTA DOS VALORES NO ARRAY
         unsubscribe()
        
        });
    
       var id = cities.length;
        var curr_track = document.createElement('audio');
        var trackIndex = 0;
        let updateTimer;
        let isPlaying = false; 
        
        console.log(cities.length)


        clearInterval(updateTimer);
        curr_track.src = cities[trackIndex].track;
        title_music.innerHTML = cities[trackIndex].name;
        userupload.innerHTML = `Upload relizado por:<label class="usuario"> ${cities[trackIndex].user.toUpperCase()}</label> `;
        
   

        curr_track.load();
        console.log("Current", cities);
        
     let current_time = document.querySelector('.current_time')
     let total_duration = document.querySelector('.total-duration')
     let seek_slider = document.querySelector('.seek_slider')
    
     ///funcao para alterar o value do seer_slider
     seek_slider.oninput = ()=> setSeek(seek_slider.value)
     seek_slider.onchange = ()=> setSeek(seek_slider.value)
     function setSeek(value){
      curr_track.currentTime = value;
     }
    
     
     ////quando ler os dados executa essa função
     curr_track.onloadeddata = () =>{
      total_duration.innerText = sencondsToMinutes( curr_track.duration);
      seek_slider.max = curr_track.duration
     }
     ////essa função verifica o estado do audio
     curr_track.ontimeupdate = () =>{

        
        current_time.innerText = sencondsToMinutes(curr_track.currentTime)
        seek_slider.value = curr_track.currentTime;
        //quando o audio terminar pula para o proximo.
        curr_track.onended = () => next.click()

     }
     
  
         
        //////PLAY///////////////////////////////
     function play(){
      curr_track.play()
      isPlaying = true
      play_pause.innerText='pause_circle_outline'
      trackIndex
     }
     function pause(){
      
      curr_track.pause()
      isPlaying = false;
      play_pause.innerText='play_circle_outline'
      trackIndex
     }
        
      let play_pause = document.querySelector("#play_pause")
      play_pause.addEventListener('click',function(){
      
      console.log(isPlaying)
      if(isPlaying==false){
        
      play()
       
      }else if(isPlaying == true){
       
      pause()
       
      }

      

     });
     ///NEXT///////////////////////////////////////
  let next = document.querySelector('#next')
  next.addEventListener('click', function(){
    isPlaying = false;
    if (trackIndex < cities.length - 1)
    trackIndex += 1;
  else trackIndex = 0;

  clearInterval(updateTimer)
  curr_track.src = cities[trackIndex].track
  title_music.innerHTML = cities[trackIndex].name
  userupload.innerHTML = `Upload relizado por:<label class="usuario"> ${cities[trackIndex].user.toUpperCase()}</label> `;

  curr_track.load()
  pause()
  play()

  });

/////BACK////////////////////////////////////
isPlaying = false;
let back = document.querySelector('#back');
back.addEventListener('click',function(){
  if (trackIndex > 0)
  trackIndex -= 1;
else trackIndex = cities.length - 1;

clearInterval(updateTimer)
curr_track.src = cities[trackIndex].track
title_music.innerHTML = cities[trackIndex].name
userupload.innerHTML = `Upload relizado por:<label class="usuario"> ${cities[trackIndex].user.toUpperCase()}</label> `;

curr_track.load()
pause()
play()
});

 });

let fotoperfil = document.querySelector('#fotoperfil')
 /////////////////////////////******UPLOAD*****/////////////////////////////////////////////////////
 onAuthStateChanged(auth, (user) => {
  if (user) {

    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    console.log(user.photoURL)
 console.log(user)
var arquivo = document.getElementById('arquivo')
arquivo.addEventListener('change' ,function(e) {
  let file = e.target.files[0];
   let nome = file.name
  const storage = getStorage();

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'musicas/mp3'
  };
  
  
  const storageRef = ref(storage, 'musicas/' + nome);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      display_progress.style.display='block';
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 1;
      progresso.value = progress;
      

      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
       alert(`
       Erro no upload !
       Para relizar o upload de um audio
       o mesmo deve atender as
       especificações abaixo.
       * Deve ter menos de 13 MB. 
       * A extenção deve ser MP3.
       * Deve ter menos de 60 caracteres.`)
       location.reload()
    },
  
   () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        console.log('File available at', downloadURL);
//////parte do codigo que salva nome e link no banco de dados///////

     if (user.displayName == null){
      const docRef = await addDoc(collection(db, "dadosmusicas"), {
        name: nome,
        link: downloadURL,
        user: "Anônimo '_'"
     
        });
     } else {
      const docRef = await addDoc(collection(db, "dadosmusicas"), {
        name: nome,
        link: downloadURL,
        user: user.displayName 
        });
     }
          location.reload()
          console.log("Document written with ID: ", docRef.id);
        
        
            }
        
////////////////////////////////////////////////////////// ////////
       );
       alert("Musica gravada com sucesso!")
     
       
      
  });

})
  
   
  } else {
    // User is signed out
    // ...
  }
})

const sair = document.querySelector("#sair")
sair.addEventListener('click',function(){
  
  signOut(auth).then(()=>{
   const confSair = confirm("Realmente deseja sair ?")
      if(confSair == true){
        window.location.replace('../index.html')
      }
  
  })
})
 


 



 

 
  