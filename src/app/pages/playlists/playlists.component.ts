import { Component, HostListener, OnInit } from '@angular/core';
import { getItem, setItem } from 'src/app/utils/localStorage.utils';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  innerWidth: number = 0;

  playlists: any = [];
  selectedPlaylist: any = null;

  isLoading: boolean = true;
  noPlaylist: boolean = false;


  ngOnInit(): void {
    this.innerWidth = innerWidth;

    const playlistsString = getItem("playlists");
    if (playlistsString) {
      this.playlists = JSON.parse(playlistsString);
      this.selectPlaylist(this.playlists[0])
    } else {
      this.noPlaylist = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = innerWidth;
  }

  selectPlaylist(playlist: any) {
    this.selectedPlaylist = playlist;
  }

  removePlaylist(id: string) {
    const playlistIndex = this.playlists.findIndex((item: any) => item.id === id);
    this.playlists.splice(playlistIndex, 1);
    setItem("playlists", JSON.stringify(this.playlists));
    this.selectPlaylist(this.playlists[0])
  }
}
