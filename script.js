"use strict";

// Variables for storing user input
const userImgURL = document.querySelector(".image");
const userSongName = document.querySelector(".song-name");
const userArtist = document.querySelector(".artist");
const userSongURL = document.querySelector(".song-link");


let playlistTable = document.querySelector('#playlistTable');

const addSong = document.getElementById("addSong");

const userPlaylist = [];


class userSongData {
  constructor(userImageURL, userSongName, userArtist, userSongURL) {
    console.log('got to userSongData constructor');
    this.userImageURL = userImageURL,
      this.userSongName = userSongName,
      this.userArtist = userArtist,
      this.userSongURL = userSongURL
  }
}

class Song {
  #songNumber = 0;

  static numSongs = 0;

  constructor(imgURL, songName, artist, songURL) {
    this.songName = songName;
    this.artist = artist;
    this.imgURL = imgURL;
    this.songURL = songURL;

    Song.numSongs++;
    this.#songNumber = Song.numSongs;
    console.log(this.#songNumber);
  }

  get songNumber() {
    return this.#songNumber;
  }
}

const defaultPlaylistItems = [
  new Song(`https://i.ibb.co/CtP2kmn/KRS-One-album-Cover.jpg`, `MC’s Act Like They Don’t Know`, `KRS-One`, `https://www.youtube.com/watch?v=zTm0YulSONU`),
  new Song(`https://i.ibb.co/jHSSyY1/the-Low-End-Theory-album-Cover.jpg`, `Jazz(We’ve Got)`, `A Tribe Called Quest`, `https://youtube.com/watch?v=zlA0GHnERLs&feature=share`),
  new Song(`https://i.ibb.co/9psN6J9/a-Madmans-Dream-album-Cover.jpg`, `A Madman’s Dream (Dirty)`, `The Great East Flatbush Project`, `https://youtube.com/watch?v=6wzeG-iLQTg&feature=share`),
  new Song(`https://i.ibb.co/0tMpQJL/lacabincalifornia-album-Cover.jpg`, `Runnin’`, `The Pharcyde`, `https://youtube.com/watch?v=MKY_8faQAzw&feature=share`),
  new Song(`https://i.ibb.co/BsCCRCz/bizzare-Ride-2-the-Pharcyde-album-Cover.jpg`, `Passin’ Me By`, `The Pharcyde`, `https://youtube.com/watch?v=QPsm-Fy9rA0&feature=share`),
  new Song(`https://i.ibb.co/ng6RmG1/the-Predator-album-Cover.jpg`, `It Was A Good Day`, `Ice Cube`, `https://youtube.com/watch?v=LcF2KUJVdLE&feature=share`),
  new Song(`https://i.ibb.co/9tPC5mY/the-Infamous-album-Cover.jpg`, `Shook Ones, Pt. II`, `Mobb Deep`, `https://youtube.com/watch?v=SLjXz9ghUtk&feature=share`)
];

class TableTools {

  static createTD(numTD) {
    let tdElements = [];

    for (let i = 0; i < numTD; i++) {
      let td = document.createElement("td");
      tdElements.push(td);
    }

    return tdElements;
  }

  static createSongFragment(song) {

    //console.log(`line 71: The songNumber of the current song is: ${song.getSongNumber()}`);
    let tdElements = this.createTD(4);

    let image = document.createElement("img");
    image.setAttribute("src", song.imgURL);

    let songLink = document.createElement("a");
    songLink.setAttribute("href", song.songURL);
    songLink.appendChild(document.createTextNode(song.songURL));

    tdElements[0].appendChild(image);
    tdElements[1].appendChild(document.createTextNode(song.songName));
    tdElements[2].appendChild(document.createTextNode(song.artist));
    tdElements[3].appendChild(songLink);

    let songFragment = new DocumentFragment();

    let tr = document.createElement("tr");


    tr.setAttribute("id", `songNumber_${(song.songNumber).toString()}`);
    songFragment.append(tr);

    tdElements.map((tdElement) => {
      songFragment.appendChild(tdElement);
    });

    return songFragment;
  }

  static appendSongFragmentToTable(songFragment, playlistTableElement) {
    //console.log(`the type of displayTable is: ${typeof displayTable}`);
    playlistTableElement.append(songFragment);
  }

  static emptyPlaylistTable() {
    let table = document.querySelector(".playlistTable");

    if (table === null) {
      console.log("Error: No table element found");
    } else {
      table.textContent = "";
    }
  }
}

class PlaylistTools extends TableTools {
  /*
  Takes in the user's inputted song data as the userSongData type, 
  instantiates a new Song object, and returns that Song object
  */
  static createSongFromUserData(userSongData) {
    const { userImageURL, userSongName, userArtist, userSongURL } = userSongData;

    let userSong = new Song(userImageURL, userSongName, userArtist, userSongURL);

    //console.log(`This song's number is: ${userSong.songNumber}`)
    return userSong;
  }

  /*
    Creates a Song from the user's inputs (passed in through in a userSongData object) 
    and renders it to the playlist table
    */
  static renderSong(userSong) {
    let songFragment = this.createSongFragment(userSong);

    this.appendSongFragmentToTable(songFragment, playlistTable);
  }

  /*
  Renders all of the items from the defaultPlaylistItems array to the playlist table on the page
  
  *Called on page load*
  */
  static initialPlaylistRender() {

    defaultPlaylistItems.map((song) => {
      this.renderSong(song);
    });

    if (localStorage.length !== 0) {
      let userPlaylist = JSON.parse(localStorage.getItem('userPlaylist'));

      userPlaylist.map((userSongData) => {
        let song = this.createSongFromUserData(userSongData);
        this.renderSong(song);
      });
    }
  }

  //Include storeUserPlaylist function implementation here
  static storeUserPlaylist(userPlaylist) {
    if (userPlaylist.constructor === Array && userPlaylist.length > 0) {
      localStorage.setItem('userPlaylist', JSON.stringify(userPlaylist));
    } else {
      console.log('Error (ln 159): storeUserPlaylist was not passed an array');
    }
  }

  static deleteStoredUserPlaylist() {
    localStorage.removeItem('userPlaylist');
  }
}

class InputValidators {
  static checkForInvalidInputs(object) {
    let invalidInput = false;

    Object.values(object).map((value) => {
      if (value === undefined || value === null || value === '') {
        invalidInput = true;
      }
    });

    return invalidInput;
  }
}


function handleAddSongClick() {
  let userInputs = [
    userImgURL.value,
    userSongName.value,
    userArtist.value,
    userSongURL.value
  ]

  let userSongInfo = new userSongData(...userInputs);

  let invalidInputs = InputValidators.checkForInvalidInputs(userSongInfo);
  //console.log(userSongInfo);

  //console.log(new Song (...userSongInfo));
  if (invalidInputs !== true) {
    PlaylistTools.renderSong(
      // Creates a new Song object from a userSongData object, pushes it to the user playlist, and returns the song object as the argument to its parent renderSong function
      function() {
        let userSong = PlaylistTools.createSongFromUserData(userSongInfo)
        userPlaylist.push(userSong);
        return userSong;
      }()
    );
  }
}

function handleSavePlaylistClick() {
  PlaylistTools.deleteStoredUserPlaylist();

  PlaylistTools.storeUserPlaylist(userPlaylist);
}


const handleDeletePlaylistClick = () => { PlaylistTools.deleteStoredUserPlaylist(); }
  
// Render the default playlist items to the page
PlaylistTools.initialPlaylistRender();