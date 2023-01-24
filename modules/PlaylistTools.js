import Song from "./Song";
import TableTools from "./TableTools";
import defaultPlaylistItems from "../assets/defaultPlaylistItems";

export type userSongData = {
  userImageURL: string;
  userSongName: string;
  userArtist: string;
  userSongURL: string;
};

export default class PlaylistTools extends TableTools {
  /*
  Takes in the user's inputted song data as the userSongData type, 
  instantiates a new Song object, and returns that Song object
  */
  static createSongFromUserData(userSongData: userSongData): Song {
    let userSong = new Song(
      userSongData.userImageURL,
      userSongData.userSongName,
      userSongData.userArtist,
      userSongData.userSongURL
    );

    return userSong;
  }

  /*
  Renders all of the items from the defaultPlaylistItems array to the playlist table on the page
  
  *Called on page load*
  */
  static intitialPlaylistRender() {
    let playlistTable = document.getElementById("playlistTable");

    let songFragmentList: JSX.Element[] = [];
      defaultPlaylistItems.map((defaultSong: Song) => {
        songFragmentList.push(
          <>
          <tr id={defaultSong.songNumber.toString()}>
            <td><img src={defaultSong.imgURL}></img></td>
            <td>{defaultSong.songName}</td>
            <td>{defaultSong.artist}</td>
            <td><a href={defaultSong.songURL}>{defaultSong.songURL}</a></td>
          </tr>
          </>
        )
        //this.appendSongFragmentToTable(userSongFragment, "playlistTable");

        console.log(
          `rendered ${defaultSong.songName} with id: ${defaultSong.songNumber}`
        );

    
        
    });

    return songFragmentList;
  }

  /*
    Creates a Song from the user's inputs (passed in through in a userSongData object) 
    and renders it to the playlist table
    */
  static renderSong(userSong: Song): void {
    this.appendSongFragmentToTable(
      this.createSongFragment(userSong),
      "playlistTable"
    );
  }

  //Include storeUserSongs_COOKIE function implementation here
}
