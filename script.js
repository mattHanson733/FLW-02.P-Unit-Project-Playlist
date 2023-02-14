"use strict";

// Variables for storing user input
const userImgURL = document.querySelector(".image");
const userSongName = document.querySelector(".song-name");
const userArtist = document.querySelector(".artist");
const userSongURL = document.querySelector(".song-link");


let playlistTable = document.querySelector('#playlistTable');

const addSong = document.getElementById("addSong");

const staged_UserPlaylist = [];


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
  new Song(`./assets/KRS-One_albumCover.jpeg`, `MC’s Act Like They Don’t Know`, `KRS-One`, `https://www.youtube.com/watch?v=zTm0YulSONU`),
  new Song(`./assets/theLowEndTheory_albumCover.jpeg`, `A Tribe Called Quest`, `https://youtube.com/watch?v=zlA0GHnERLs&feature=share`),
  new Song(`./assets/aMadmansDream_albumCover.jpeg`, `A Madman’s Dream (Dirty)`, `The Great East Flatbush Project`, `https://youtube.com/watch?v=6wzeG-iLQTg&feature=share`),
  new Song(`./assets/lacabincalifornia_albumCover.jpeg`, `Runnin’`, `The Pharcyde`, `https://youtube.com/watch?v=MKY_8faQAzw&feature=share`),
  new Song(`./assets/bizzareRide_2_thePharcyde_albumCover.jpeg`, `Passin’ Me By`, `The Pharcyde`, `https://youtube.com/watch?v=QPsm-Fy9rA0&feature=share`),
  new Song(`./assets/thePredator_albumCover.jpeg`, `It Was A Good Day`, `Ice Cube`, `https://youtube.com/watch?v=LcF2KUJVdLE&feature=share`),
  new Song(`./assets/theInfamous_albumCover.jpeg`, `Shook Ones, Pt. II`, `Mobb Deep`, `https://youtube.com/watch?v=SLjXz9ghUtk&feature=share`)
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
  static renderDefaultItems() {
    // render the items in 'defaultPlaylistItems' to the playlist table
    defaultPlaylistItems.map((song) => {
      this.renderSong(song);
    });

  }
}


class UserPlaylist {

  static #storageKey = 'userPlaylist';

  static pageLoad_render() {
    let userPlaylist = this.retriveUserPlaylist();

    if (userPlaylist !== null) {
      if (userPlaylist.length > 0) {

        // renders each item in the stored userPlaylist on the page
        userPlaylist.map((songData) => {
          let tempSong = PlaylistTools.createSongFromUserData(songData);
          PlaylistTools.renderSong(tempSong);
        });

        // Renders default playlist items to the page
        PlaylistTools.renderDefaultItems();
      } else if (userPlaylist.length === 0) {

        // Renders default playlist items to the page
        PlaylistTools.renderDefaultItems();
      } else {
        console.log('Error: The stored userPlaylist had a that was not greater than or eqaul to 0');
      }
    } else if (userPlaylist === null) {
      // create an empty userPlaylist array in localStorage
      localStorage.setItem(this.#storageKey, []);

      // Renders default playlist items to the page
      PlaylistTools.renderDefaultItems();
    } else {
      console.log(`Error: The stored userPlaylist is doesn't exist and isn't null`);
    }
  }


  // UserPlaylist Methods
  static deleteStoredUserPlaylistContents() {
    localStorage.setItem(this.#storageKey, JSON.stringify([]));
  }

  static dangerouslyDeleteStoredUserPlaylist() {
    localStorage.removeItem('userPlaylist')
  }


  static retriveUserPlaylist() {

    if (JSON.parse(localStorage.getItem(this.#storageKey)) !== null) {
      // return type is Song[]
      return JSON.parse(localStorage.getItem(this.#storageKey));
    } else {
      console.log('userPlaylist is null (doesn\'t exist in localStorage');
      return null;
    }

  }

  static updateUserPlaylist(stagedUserPlaylist) {
    let currentStoredUserPlaylist = this.retriveUserPlaylist();

    let tempUserPlaylist = [];

    currentStoredUserPlaylist.map((song) => {
      tempUserPlaylist.push(song);
    });

    stagedUserPlaylist.concat(tempUserPlaylist);

    // Clears the current stored userPlaylist and replaces it's contents with the stagedUserPlaylist
    this.deleteStoredUserPlaylistContents();
    localStorage.setItem(this.#storageKey, JSON.stringify(stagedUserPlaylist));

    // returns the updated userPlaylist as a Song[]
    return stagedUserPlaylist;
  }

  get storageKey() {
    return this.#storageKey;
  }

  set storageKey(key) {
    this.#storageKey = key;
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
        staged_UserPlaylist.push(userSong);
        return userSong;
      }()
    );
  }
}

function handleSavePlaylistClick() {
  // Updates the UserPlaylist in localStorage with the staged items in the staged_USerPlaylist array
  UserPlaylist.updateUserPlaylist(staged_UserPlaylist);
  
  // Clears the commited items from the staged_UserPlaylist array
  staged_UserPlaylist.length = 0;
}


const handleDeletePlaylistClick = () => { UserPlaylist.deleteStoredUserPlaylistContents() }

// Render the default playlist items to the page
UserPlaylist.pageLoad_render();