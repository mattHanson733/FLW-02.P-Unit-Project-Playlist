"use strict";

// Variables for storing user input
const userImgURL = document.querySelector(".songURL-input");
const userSongName = document.querySelector(".songName-input");
const userArtist = document.querySelector(".artist-input");
const userSongURL = document.querySelector(".songURL-input");
const songCount = document.querySelector(".song-count");


let playlistTable = document.querySelector('#playlistTable');

const addSong = document.getElementById("addSong");

const staged_UserPlaylist = [];

const deletePlaylistMessage = 'Are you sure you want to delete your stored playlist? This action cannot be undone.';

/** 
* The data structure for storing songs and their data
* @class
*/
class Song {
  #songNumber = 0;

  static numSongs = 0;

  /** 
  * Creates a new instance of the Song class.
  * @constructor
  * @param {string} imgURL - A link to the cover image of the song
  * @param {string} songName - The name of the song
  * @param {string} atrist - The name of the artist of the song
  * @param {string} songURL - A link to the video of the song
  */
  constructor(imgURL, songName, artist, songURL) {
    this.imgURL = imgURL;
    this.songName = songName;
    this.artist = artist;
    this.songURL = songURL;

    Song.numSongs++;
    this.#songNumber = Song.numSongs;
  }

  get songNumber() {
    return this.#songNumber;
  }
}

/** 
* The default playlist items to render on page load
*/
const defaultPlaylistItems = [
  new Song(`./assets/KRS-One_albumCover.jpeg`, `MC’s Act Like They Don’t Know`, `KRS-One`, `https://www.youtube.com/watch?v=zTm0YulSONU`),
  new Song(`./assets/theLowEndTheory_albumCover.jpeg`, `Jazz (We've Got)`, `A Tribe Called Quest`, `https://youtube.com/watch?v=zlA0GHnERLs&feature=share`),
  new Song(`./assets/aMadmansDream_albumCover.jpeg`, `A Madman’s Dream (Dirty)`, `The Great East Flatbush Project`, `https://youtube.com/watch?v=6wzeG-iLQTg&feature=share`),
  new Song(`./assets/lacabincalifornia_albumCover.jpeg`, `Runnin’`, `The Pharcyde`, `https://youtube.com/watch?v=MKY_8faQAzw&feature=share`),
  new Song(`./assets/bizzareRide_2_thePharcyde_albumCover.jpeg`, `Passin’ Me By`, `The Pharcyde`, `https://youtube.com/watch?v=QPsm-Fy9rA0&feature=share`),
  new Song(`./assets/thePredator_albumCover.jpeg`, `It Was A Good Day`, `Ice Cube`, `https://youtube.com/watch?v=LcF2KUJVdLE&feature=share`),
  new Song(`./assets/theInfamous_albumCover.jpeg`, `Shook Ones, Pt. II`, `Mobb Deep`, `https://youtube.com/watch?v=SLjXz9ghUtk&feature=share`)
];

/** 
*Tools for manipulating the display playlist table element
* @class
*/
class TableTools {

  static createTD(numTD) {
    let tdElements = [];

    for (let i = 0; i < numTD; i++) {
      let td = document.createElement("td");
      tdElements.push(td);
    }

    return tdElements;
  }

  /** 
  * Creates a playlist entry document fragment containing the data from the Song object passed as an argument
  * @static
  * @param {Object} Song - A Song object
  * @returns {Object} SongFragment
  */
  static createSongFragment(song) {

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
    tr.setAttribute("class", 'userSong');
    
    songFragment.append(tr);

    tdElements.map((tdElement) => {
      songFragment.appendChild(tdElement);
    });

    return songFragment;
  }

  /** 
  * Appends a SongFragment to the playlist display table
  * @static
  * @param {Object} SongFragment - A document fragment created by the createSongFragment method
  * @param {Object} playlistTableElement - The global variable storing the playlist display table element
  */
  static appendSongFragmentToTable(songFragment, playlistTableElement) {
    playlistTableElement.append(songFragment);
  }

  static emptyPlaylistTable() {
    
    if (playlistTable === null) {
      throw new Error("No table element found");
    } else {
      playlistTable.textContent = "";
    }
  }
}


/** 
* Tools for rendering song data to the display playlist table
* @class
*/
class PlaylistTools extends TableTools {

  /*
    Creates a Song from the user's inputs (passed in through in a userSongData object) 
    and renders it to the playlist table
    */
  static renderSong(userSong) {
    let songFragment = this.createSongFragment(userSong);

    this.appendSongFragmentToTable(songFragment, playlistTable);
  }

  /** 
  * Renders all of the items from the defaultPlaylistItems array to the playlist table on the page using the renderSong method
  * --CALLED ON PAGE LOAD--
  * @static
  */
  static renderDefaultItems() {
    // render the items in 'defaultPlaylistItems' to the playlist table
    defaultPlaylistItems.map((song) => {
      this.renderSong(song);
    });

  }
}

/** 
* Tools for managing and manipulating the userPlaylist stored in local storage and the pageLoad_render function called on page load
@class
@static
*/
class UserPlaylist {
  /** 
  * local storage key for the user playlist array
  * @static
  */
  static #storageKey = 'userPlaylist';


  /** 
  * This is the main page load function that initializes and renders all of the content to the page
  * --CALLED ON PAGE LOAD--
  * @returns {undefined}
  */
  static pageLoad_render() {
    let userPlaylist = this.retriveUserPlaylist();

    if (userPlaylist !== null) {
      if (userPlaylist.length > 0) {
        
        userPlaylist.map((songData) => {
          let tempSong = new Song (songData.imgURL, songData.songName, songData.artist, songData.songURL);
          PlaylistTools.renderSong(tempSong);
        });
        
        PlaylistTools.renderDefaultItems();
      } else if (userPlaylist.length === 0) {

        PlaylistTools.renderDefaultItems();
        
      } else {
        
        throw new Error('Error: The stored userPlaylist had a that was not greater than or eqaul to 0');
        
      }
    } else if (userPlaylist === null) {
      
      localStorage.setItem(this.#storageKey, []);

      PlaylistTools.renderDefaultItems();
      
    } else {
      
      throw new Error(`Error: The stored userPlaylist is doesn't exist and isn't null`);
      
    }

    songCount.textContent = `The current number of songs is: ${Song.numSongs}`;
  }


  /** 
  * Deletes the contents of the userPlaylist array in local storage by setting its key to an empty array
  * @static
  * @returns {undefined}
  */
  static deleteStoredUserPlaylistContents() {
    localStorage.setItem(this.#storageKey, JSON.stringify([]));
  }

  /** 
  * Deletes the reference to userPlaylist array in local storage
  * @static
  * @returns {undefined}
  */
  static dangerouslyDeleteStoredUserPlaylist() {
    localStorage.removeItem('userPlaylist');
  }

  /** 
  * Gets the userPlaylist item from local storage and parses it into an Array
  * @static
  * @returns {Array} storedUserPlaylist
  */
  static retriveUserPlaylist() {

    if (JSON.parse(localStorage.getItem(this.#storageKey)) !== null) {
      // return type is Song[]
      return JSON.parse(localStorage.getItem(this.#storageKey));
    } else {
      throw new Error('userPlaylist is null (doesn\'t exist in localStorage');
    }

  }

  /** 
  * Deletes the reference to userPlaylist array in local storage
  * @static
  * param {Array} stagedUserPlaylist - An array of Song objects that the user has added but have not been saved to local storage
  * @returns {Array} stagedUserPlaylist - The now updated Song object array that is stored in local storage
  */
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

/** 
  * Checks if the values of keys in the argument object are either undefined, null, or ''
  * @param {Object} object - The object to be checked for invalid inputs
  * @returns {boolean} invalidInput - True if one or more values is invalid, False is none of the values are invalid
*/
  function checkForInvalidInputs(object) {
    let invalidInput = false;

    Object.values(object).map((value) => {
      if (value === undefined || value === null || value === '') {
        invalidInput = true;
      }
    });

    return invalidInput;
  }

/** 
  * Handles the click of the "Add Song" button 
  * Actions:
  * 1) Capturing the user inputs
  * 2) Validating user inputs
  * 3) Converting them into Song objects
  * 4) Rendering the Song objects to the page
  * 5) Adding the Song objects to the staged_UserPlaylist array
  * @returns {undefined}
  */
function handleAddSongClick() {
  let invalidInputs = checkForInvalidInputs({
    1: userImgURL.value, 
    2: userSongName.value, 
    3: userArtist.value, 
    4: userSongURL.value
  });
  
  if (invalidInputs !== true) {
    PlaylistTools.renderSong(
      // Creates a new Song object from a userSongData object, pushes it to the user playlist, and returns the song object as the argument to its parent renderSong function
      function() {
       let userSong = new Song(userImgURL.value, userSongName.value, userArtist.value, userSongURL.value)
        console.log(userSong);
        staged_UserPlaylist.push(userSong);
        return userSong;
      }()
    );
  }
}

/** 
* Handles the "Save Playlist" button click.
* Actions:
* 1) Updates the userPlaylist in local storage with the items in the staged_userPlaylist array
* 2) Emptying the staged_userPlaylist array
* @returns {undefined}
*/
function handleSavePlaylistClick() {
  
  // Updates the UserPlaylist in localStorage with the staged items in the staged_USerPlaylist array
  UserPlaylist.updateUserPlaylist(staged_UserPlaylist);
  
  // Clears the commited items from the staged_UserPlaylist array
  staged_UserPlaylist.length = 0;
}

/** 
* Handles the "Delete SaveD Playlist" button click.
* Actions:
* 1) Asks the user to confirm the deletion of the userPlaylist in local storage
* 2) Empties the contents of the userPlaylist array in local storage with the deleteSotredPlaylistContents function
* @returns {undefined}
*/
function handleDeletePlaylistClick() { 
  let confirmDelete = confirm(deletePlaylistMessage);

  if (confirmDelete) {
  UserPlaylist.deleteStoredUserPlaylistContents() ;
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}



// Render the default playlist items to the page
UserPlaylist.pageLoad_render();