// task 5: read through the JavaScript starter code to determine where each given function is declared and where each given function is called.
function Song(imgURL, songName, artist, songURL) {
  return {
    imgURL: imgURL,
    songName: songName,
    artist: artist,
    songURL: songURL
  }
}

// input variables
let image = document.querySelector(".image");
let songName = document.querySelector(".song-name");
let artist = document.querySelector(".artist");
let songLink = document.querySelector(".song-link");

// button variable
let add = document.querySelector(".add");

// task 6: declare variables for your display divs: the image url, song name, artist, and song link. Go back to the HTML to check that you are using the correct class names.
let display = document.querySelector('.display');
let displayImage = document.querySelector(".display-image");
let displaySong = document.querySelector(".display-song");
let displayArtist = document.querySelector(".display-artist");
let displayLink = document.querySelector(".display-link");



// task 7: create and populate an array to store your image urls. Create three more arrays. One to store your song names, one for the artists, and a last one for the song links.



let defaultPlaylistItems = [
  new Song(`https://i.ibb.co/CtP2kmn/KRS-One-album-Cover.jpg`, `MC’s Act Like They Don’t Know`, `KRS-One`, `https://www.youtube.com/watch?v=zTm0YulSONU`),
  new Song(`https://i.ibb.co/jHSSyY1/the-Low-End-Theory-album-Cover.jpg`, `Jazz(We’ve Got)`, `A Tribe Called Quest`, `https://youtube.com/watch?v=zlA0GHnERLs&feature=share`),
  new Song(`https://i.ibb.co/9psN6J9/a-Madmans-Dream-album-Cover.jpg`, `A Madman’s Dream (Dirty)`, `The Great East Flatbush Project`, `https://youtube.com/watch?v=6wzeG-iLQTg&feature=share`),
  new Song(`https://i.ibb.co/0tMpQJL/lacabincalifornia-album-Cover.jpg`, `Runnin’`, `The Pharcyde`, `https://youtube.com/watch?v=MKY_8faQAzw&feature=share`),
  new Song(`https://i.ibb.co/BsCCRCz/bizzare-Ride-2-the-Pharcyde-album-Cover.jpg`, `Passin’ Me By`, `The Pharcyde`, `https://youtube.com/watch?v=QPsm-Fy9rA0&feature=share`),
  new Song(`https://i.ibb.co/ng6RmG1/the-Predator-album-Cover.jpg`, `It Was A Good Day`, `Ice Cube`, `https://youtube.com/watch?v=LcF2KUJVdLE&feature=share`),
  new Song(`https://i.ibb.co/9tPC5mY/the-Infamous-album-Cover.jpg`, `Shook Ones, Pt. II`, `Mobb Deep`, `https://youtube.com/watch?v=SLjXz9ghUtk&feature=share`)
];





//REFACTOR ARRAYS DAY 
// task 11: comment out the arrays data.
// task 12: create an object for each of your songs.
// task 13: inside each object, add key/value pairs to store the image url, song name, artist, and song link.
// task 14: create an array that stores all of the objects.



//REFACTOR LOOPS DAY 
// task 15: update your `addSongInfo` function so the input values are saved in as values in a new object.
// task 16: update your `.push()` so the input object is added to your array of objects.
// task 17: update your loops based on your new array of objects.





function addSongInfo() {
  let userImgURL
  let userSongName
  let userArtist
  let userSongURL = 
  // task 9: declare a variable to save the user input of the image url. Declare three more variables that save user input: One for the song names, one for the artists, and a last one for the song links.


  // task 10: use `.push()` to add each input value to the correct array.

}




/******** this function empties the display divs each time the button is clicked so that your playlist does not repeatedly add the data too many times. Where should this function be placed???********/
function emptyDisplay() {
  displayImage.innerHTML = "";
  displaySong.innerHTML = "";
  displayArtist.innerHTML = "";
  displayLink.innerHTML = "";
}




function displaySongInfo() {

  // task 8: loop through your images array and display the images to your songs in the correct div. Create three more loops. One for the song names, one for the artists, and a last one for the song links.



}





// click event to add and display songs
add.onclick = function() {
  addSongInfo();
  displaySongInfo();
};

// function call to display stored songs
displaySongInfo();
