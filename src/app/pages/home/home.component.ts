import { Component, OnInit } from '@angular/core';
import { ISong, ISongResponse } from 'src/app/interfaces/songs.interface';
import { IWeather } from 'src/app/interfaces/weather.interface';
import { NotificationService } from 'src/app/services/notifications.service';
import { OpenWeatherService } from 'src/app/services/open-weather.service';
import { ShazamService } from 'src/app/services/shazam.service';
import { getItem, setItem } from 'src/app/utils/localStorage.utils';
import { getLocation } from 'src/app/utils/location.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private openWeatherService: OpenWeatherService,
    private shazamService: ShazamService,
    private notifyService: NotificationService
  ) { }

  weather?: IWeather;

  songs?: ISong[];
  category?: string;

  isLoading: boolean = true;
  refuseLocation: boolean = false;

  skeletonStyles = {
    header: {
      title: {
        'width': '10em',
        'height': '60px',
        'border-radius': '0.5em',
        'margin': '0'
      },
      subtitle: {
        'width': '20em',
        'height': '24px',
        'border-radius': '0.5em',
        'margin': '0'
      },
    },
    playlistHeader: {
      title: {
        'width': '12em',
        'height': '1.5em',
        'border-radius': '0.5em',
        'margin-bottom': '1.5em'
      },
      button: {
        'width': '110px',
        'height': '38px',
        'border-radius': '0.2em',
        'margin-bottom': '2em'
      }
    },
    playlist: {
      number: {
        'width': '.25em',
        'height': '1.5em',
        'margin': '0'
      },
      cover: {
        'width': '3em',
        'height': '3em',
        'border-radius': '0.65em',
        'margin': '0 1em'
      },
      title: {
        'width': '12em',
        'height': '1.5em',
        'border-radius': '0.5em',
        'margin': '0'
      },
      subtitle: {
        'width': '8em',
        'height': '1.2em',
        'border-radius': '0.5em',
        'margin': '0'
      }
    }
  }

  ngOnInit(): void {
    this.getLocation();
  }

  getWeatherSubscriber = {
    next: (value: IWeather) => {
      this.weather = value;
      this.selectSong(value.main.temp);
      this.notifyService.showSuccess("Temperatura encontrada sucesso!");
    },
    error: (err: Error) => this.notifyService.showError("Erro ao buscar a temperatura!"),
  }

  getLocation() {
    const locationString = getItem("location");
    if (!locationString) {
      getLocation()
        .then(res => {
          setItem("location", JSON.stringify(res))
          this.openWeatherService
            .getWeather(res.lat, res.lon)
            .subscribe(this.getWeatherSubscriber);
        })
        .catch(() => {
          this.isLoading = false;
          this.refuseLocation = true;
        })
    } else {
      const location = JSON.parse(locationString)
      this.openWeatherService
        .getWeather(location.lat, location.lon)
        .subscribe(this.getWeatherSubscriber);
    }
  }

  getSongsSubscriber = {
    next: (value: ISongResponse) => {
      this.songs = value.tracks.hits
      this.isLoading = false;
      this.notifyService.showSuccess("Musicas recomendadas com sucesso!");
    },
    error: (err: Error) => this.notifyService.showError("Erro ao buscar recomendações de musicas!"),
  }

  selectSong(temp: number): void {
    if (temp >= 32) {
      this.category = "Rock";
    } else if (temp >= 24 && temp < 32) {
      this.category = "Pop";
    } else if (temp >= 16 && temp < 24) {
      this.category = "Classica";
    } else if (temp < 16) {
      this.category = "Lofi";
    }

    if (this.category) {
      this.shazamService
        .getSongs(this.category)
        .subscribe(this.getSongsSubscriber)
    }
  }

  saveList(): void {
    const data = {
      id: this.uniqId(),
      city: this.weather?.name,
      temperature: this.weather?.main.temp,
      category: this.category,
      songs: this.songs,
      createdAt: new Date()
    }

    const playlistString = getItem("playlists");
    if (!playlistString) {
      setItem("playlists", JSON.stringify([data]))
    } else {
      const playlist = JSON.parse(playlistString)
      playlist.push(data)
      setItem("playlists", JSON.stringify(playlist))
    }

    this.notifyService.showSuccess("Playlist salva com sucesso!");
  }

  goToSong(url: string): void {
    open(url, "_blank");
  }

  uniqId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
