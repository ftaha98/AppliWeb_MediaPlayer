/* Here we define the main functions used to make the Media Player
working correctly */


function playPause(){
    var buttonImg_PlayPause = document.getElementById("playPause_img");
    var audioPlayer = document.getElementById("audioplayer");
    if (buttonImg_PlayPause.getAttribute("src")==="icon-pause.svg"){
        buttonImg_PlayPause.src = "icon-jouer.svg";
        audioPlayer.pause()
    }
    else{
        buttonImg_PlayPause.src = "icon-pause.svg";
        audioPlayer.play();
    }
}

function nextSong(){
    console.log("Musique suivante");
    var buttonImg_PlayPause = document.getElementById("playPause_img");
    var audioplayer = document.getElementById("audioplayer");
    var currentImg = buttonImg_PlayPause.src.split('/').slice();
    console.log(currentImg[currentImg.length-1]);

    var newTracks = document.createElement("source");
    newTracks.src = "zipette.mp3";
    audioplayer.appendChild(newTracks);

    if (currentImg[currentImg.length-1] === "icon-pause.svg"){
        audioplayer.play();
    }
}

function selectSong(file){
    var audioPlayer = document.getElementById("audioplayer");
    audioPlayer.src = file;
}

function onload_setup(){
    load_music_lib();
    eventListenerSetter();

}

function load_music_lib(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        data = JSON.parse(this.responseText);
        console.log(data);
        generateMusicNav(data);
    }
    xhr.open('GET', '/music_lib', true);
    xhr.send();
}

function generateMusicNav(data) {
    var navigation = document.getElementById("navigation");
    var n_artists = data['artists'].length;
    for (let i=0; i<n_artists; i++){
        var frag = document.createDocumentFragment();
        var div_artist = document.createElement('div');
        var div_artist_clickable = document.createElement('div');

        div_artist.id = data["artists"][i]['name'] + '_' + i + '_global';
        div_artist.className = "divArtistNav";

        div_artist_clickable.id =  data["artists"][i]['name'] + '_' + i;
        div_artist_clickable.onclick = generateMusicAlbum;
        div_artist_clickable.textContent = data["artists"][i]['name'];
        div_artist_clickable.style.height = "100%";

        div_artist.appendChild(div_artist_clickable);
        frag.appendChild(div_artist);
        navigation.appendChild(frag);
    }
}

function makeDivVisible(div){
    var div_artist = document.getElementById(div.srcElement.id+"_global");
    var divChildren = div_artist.children;
    
    for (let i=1; i<divChildren.length; i++){
        console.log(divChildren[i]);
        divChildren[i].style.visibility = (divChildren[i].style.visibility==="hidden" ? "visible"||"unset" : "hidden");
        div_artist.style.height = (divChildren[i].style.visibility === "hidden" ? "50px" : "auto");
    }
}

function generateMusicAlbum(artist){
    var div_artist = document.getElementById(artist.srcElement.id+"_global");
    document.getElementById(artist.srcElement.id).onclick = makeDivVisible;
    div_artist.style.height = "auto";
    var index = div_artist.id.split('_')[1];

    dataArtist = data["artists"][index]["albums"];

    for (let i=0; i<dataArtist.length; i++){
        var div_album = document.createElement('div');
        var album = dataArtist[i];

        div_album.id = album["name"] + "_" + i;
        div_album.className = "divAlbum";
        div_album.onclick = generateMusicTracks;

        var spanAlbumName = document.createElement('span');
        spanAlbumName.className = "spanAlbumName";
        spanAlbumName.textContent = album["name"];
        spanAlbumName.onclick = intermediateGenerator;

        var spanAlbumDate = document.createElement('span');
        spanAlbumDate.className = "spanAlbumDate";
        spanAlbumDate.textContent = album["date"];
        spanAlbumDate.onclick = intermediateGenerator;

        var imageAlbum = document.createElement('img');
        imageAlbum.className = "imgAlbum";
        imageAlbum.src = album["album_img"];
        imageAlbum.onclick = intermediateGenerator;

        div_album.appendChild(spanAlbumName);
        div_album.appendChild(spanAlbumDate);
        div_album.appendChild(imageAlbum);
        
        div_artist.appendChild(div_album);
    }

}

function intermediateGenerator(element){
    var element = element.srcElement;
    var div_album = element.parentElement;
    console.log(div_album);
    generateMusicTracks(div_album);
}

function generateMusicTracks(album){
    if (album.srcElement != undefined){ 
        var id = album.srcElement.id;
        console.log(id);
    }
    else{console.log(album.id);}
}

function eventListenerSetter(){
    var audioPlayer = document.getElementById("audioplayer");
    console.log(audioPlayer);
    audioPlayer.addEventListener("timeupdate", updateTime);
    audioPlayer.addEventListener("loadeddata", initSlider);

    var slider = document.getElementById("slider");
    slider.addEventListener("mousedown", isChanging);
    slider.addEventListener("change", setTimeSong);
}

function updateTime(){
    var audioPlayer = document.getElementById("audioplayer");
    console.log("Updating");
    var slider = document.getElementById("slider");
    slider.value = audioPlayer.currentTime.toString();
}

function isChanging(){
    var audioPlayer = document.getElementById("audioplayer");
    audioPlayer.pause();
}

function setTimeSong(e){
    var slider = document.getElementById("slider");
    var audioPlayer = document.getElementById("audioplayer");
    var buttonImg_PlayPause = document.getElementById("playPause_img");

    slider.value = e.target.value;
    audioPlayer.currentTime = e.target.valueAsNumber;

    if (buttonImg_PlayPause.getAttribute("src")==="icon-pause.svg"){
        audioPlayer.play();
    }
}

function initSlider(e){
    console.log(e);
    var slider = document.getElementById("slider");
    var audioplayer = document.getElementById("audioplayer");
    slider.max =  audioplayer.duration.toString();
    slider.value = "0";
}
