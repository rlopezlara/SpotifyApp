import { Component } from '@angular/core';
import { SongService } from '../../services/song.service';
import { firstValueFrom } from 'rxjs'; // Import for async/await usage with Observables

@Component({
  selector: 'app-songs', // Identifies this component in Angular
  standalone: false,
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage {
  searchTerm: string = ''; // Holds the user's input for the search query
  searchType: string = 'albums'; // Default search type is 'albums'
  songs: any[] = []; // Stores the search results from Spotify API
  loading: boolean = false; // Flag to indicate when data is being fetched
  errorMessage: string = ''; // Stores error messages for UI feedback

  constructor(private songService: SongService) {} // Injects the SongService to make API calls

  /**
   * Searches for albums or playlists based on user input.
   * Uses async/await to fetch data and update the songs list.
   */
  async searchSongs() {
    // Prevents search if input is empty
    if (this.searchTerm.trim().length === 0) {
      this.errorMessage = 'Please enter an artist or playlist name.'; // User feedback
      return;
    }

    this.loading = true; // Shows loading state
    this.errorMessage = ''; // Clears previous error messages

    try {
      // Fetches data from the Spotify API using firstValueFrom() for better async handling
      const data = await firstValueFrom(
        this.songService.getSpotifyData(this.searchTerm, this.searchType)
      );

      // Processes results if searching for albums
      if (this.searchType === 'albums' && data.albums?.items) {
        this.songs = data.albums.items.map((album: any) => ({
          id: album.data?.uri.split(':')[2], // Extracts album ID from URI
          title: album.data?.name || 'Unknown', // Gets album name or default to 'Unknown'
          image:
            album.data?.coverArt?.sources?.[0]?.url || 'assets/no-image.jpg', // Album cover image or default
          release_date: album.data?.date?.year || 'Unknown', // Album release year or 'Unknown'
          spotify_url: `https://open.spotify.com/album/${
            album.data?.uri.split(':')[2]
          }`, // Constructs Spotify link for the album
        }));
      }
      // Processes results if searching for playlists
      else if (this.searchType === 'playlists' && data.playlists?.items) {
        this.songs = data.playlists.items.map((playlist: any) => ({
          id: playlist.data?.uri.split(':')[2], // Extracts playlist ID from URI
          title: playlist.data?.name || 'Unknown', // Gets playlist name or default to 'Unknown'
          image:
            playlist.data?.images?.items?.[0]?.sources?.[0]?.url ||
            'assets/no-image.jpg', // Playlist image or default
          description: playlist.data?.description || 'No description available', // Playlist description or default
          owner: playlist.data?.owner?.name || 'Unknown',
          spotify_url: `https://open.spotify.com/playlist/${
            playlist.data?.uri.split(':')[2]
          }`, // Constructs Spotify link for the playlist
        }));
      }
      // Handles case when no data is found
      else {
        this.songs = [];
      }

      // Stores results in localStorage for persistence
      if (this.songs.length > 0) {
        localStorage.setItem('albums', JSON.stringify(this.songs));
      }
    } catch (error) {
      // Displays an error message if API call fails
      this.errorMessage = 'Failed to fetch data. Please try again later.';
      console.error('Error fetching Spotify data:', error);
    } finally {
      this.loading = false; // Hides loading state after API call is complete
    }
  }
}
