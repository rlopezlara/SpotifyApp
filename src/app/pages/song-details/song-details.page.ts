import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song-details',
  standalone: false,
  templateUrl: './song-details.page.html',
  styleUrls: ['./song-details.page.scss'],
})
export class SongDetailsPage implements OnInit {
  album: any = null; // Holds album details retrieved from localStorage

  // Injects ActivatedRoute to get URL parameters

  constructor(private route: ActivatedRoute) {}
  /**
   * Lifecycle hook that runs when the component initializes.
   * Retrieves the album details from localStorage based on the ID in the URL.
   */
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const albumId = params['id'];
      if (albumId) {
        // Retrieves stored albums from localStorage
        const storedAlbums = JSON.parse(localStorage.getItem('albums') || '[]');
        // Searches for the album matching the provided ID
        this.album = storedAlbums.find((a: any) => a.id === albumId) || null;
      }
    });
  }
  /**
   * Opens the album in Spotify when the button is clicked.
   * Uses window.open() to open the link in a new tab.
   */
  openSpotify() {
    if (this.album?.spotify_url) {
      window.open(this.album.spotify_url, '_blank');
    }
  }
}
