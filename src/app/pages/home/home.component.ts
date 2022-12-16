import { Component, OnInit } from '@angular/core';
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
    private shazamService: ShazamService
  ) { }

  weather: any;

  songs: any = [];
  category?: string;

  isLoading: boolean = true;
  refuseLocation: boolean = false;

  ngOnInit(): void {
    this.getLocation();
  }

  getWeatherSubscriber = {
    next: (value: any) => {
      this.weather = value;
      this.selectSong(value.main.temp)
    },
    error: (err: Error) => console.error('Observer got an error: ' + err),
  }

  getLocation() {
    const locationString = getItem("location");
    if (!locationString) {
      getLocation()
        .then(res => {
          setItem("location", JSON.stringify(res))
          this.openWeatherService
            .getWeather(res.lat, res.lon)
            .subscribe(this.getWeatherSubscriber)
        })
        .catch(() => {
          this.isLoading = false;
          this.refuseLocation = true;
        })
    } else {
      const location = JSON.parse(locationString)
      this.openWeatherService
        .getWeather(location.lat, location.lon)
        .subscribe(this.getWeatherSubscriber)
    }
  }

  getSongsSubscriber = {
    next: (value: any) => {
      this.songs = value.tracks.hits
      this.isLoading = false;
    },
    error: (err: Error) => console.error('Observer got an error: ' + err),
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

    this.isLoading = false;
    this.songs = this.exmaple.tracks.hits;

    // if (this.category) {
    //   this.shazamService
    //     .getSongs(this.category)
    //     .subscribe(this.getSongsSubscriber)
    // }
  }

  saveList(): void {
    const data = {
      id: this.uniqId(),
      city: this.weather.name,
      temperature: this.weather.main.temp,
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
  }

  goToSong(url: string): void {
    open(url, "_blank");
  }

  uniqId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  exmaple = {
    "tracks": {
      "hits": [
        {
          "track": {
            "layout": "5",
            "type": "MUSIC",
            "key": "338965882",
            "title": "Shape of You",
            "subtitle": "Ed Sheeran",
            "share": {
              "subject": "Shape of You - Ed Sheeran",
              "text": "Usei o Shazam para descobrir Shape of You de Ed Sheeran.",
              "href": "https://www.shazam.com/track/338965882/shape-of-you",
              "image": "https://is3-ssl.mzstatic.com/image/thumb/Music111/v4/2d/1c/4f/2d1c4fd7-018c-0529-693b-c67fea53b698/190295851286.jpg/400x400cc.jpg",
              "twitter": "Usei o @Shazam para descobrir Shape of You de Ed Sheeran.",
              "html": "https://www.shazam.com/snippets/email-share/338965882?lang=pt-BR&country=BR",
              "avatar": "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/5a/60/84/5a60849d-4fcd-13a6-0715-4621186bab23/pr_source.png/800x800cc.jpg",
              "snapchat": "https://www.shazam.com/partner/sc/track/338965882"
            },
            "images": {
              "background": "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/5a/60/84/5a60849d-4fcd-13a6-0715-4621186bab23/pr_source.png/800x800cc.jpg",
              "coverart": "https://is3-ssl.mzstatic.com/image/thumb/Music111/v4/2d/1c/4f/2d1c4fd7-018c-0529-693b-c67fea53b698/190295851286.jpg/400x400cc.jpg",
              "coverarthq": "https://is3-ssl.mzstatic.com/image/thumb/Music111/v4/2d/1c/4f/2d1c4fd7-018c-0529-693b-c67fea53b698/190295851286.jpg/400x400cc.jpg",
              "joecolor": "b:151716p:7ddafas:69d5f1t:68b3ccq:58afc5"
            },
            "hub": {
              "type": "APPLEMUSIC",
              "image": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic_{scalefactor}.png",
              "actions": [
                {
                  "name": "apple",
                  "type": "applemusicplay",
                  "id": "1193700767"
                },
                {
                  "name": "apple",
                  "type": "uri",
                  "uri": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/4e/2e/da/4e2eda9b-7306-a0f3-aebd-48ba8503b0e8/mzaf_14380286742138479599.plus.aac.ep.m4a"
                }
              ],
              "options": [
                {
                  "caption": "ABRIR",
                  "actions": [
                    {
                      "name": "hub:applemusic:deeplink",
                      "type": "applemusicopen",
                      "uri": "https://music.apple.com/br/album/shape-of-you/1193700601?i=1193700767&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
                    },
                    {
                      "name": "hub:applemusic:deeplink",
                      "type": "uri",
                      "uri": "https://music.apple.com/br/album/shape-of-you/1193700601?i=1193700767&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
                    }
                  ],
                  "beacondata": {
                    "type": "open",
                    "providername": "applemusic"
                  },
                  "image": "https://images.shazam.com/static/icons/hub/ios/v5/overflow-open-option_{scalefactor}.png",
                  "type": "open",
                  "listcaption": "Abrir no Apple Music",
                  "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic-overflow_{scalefactor}.png",
                  "colouroverflowimage": false,
                  "providername": "applemusic"
                },
                {
                  "caption": "COMPRAR",
                  "actions": [
                    {
                      "type": "uri",
                      "uri": "https://itunes.apple.com/br/album/shape-of-you/1193700601?i=1193700767&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=itunes&itsct=Shazam_ios"
                    }
                  ],
                  "beacondata": {
                    "type": "buy",
                    "providername": "itunes"
                  },
                  "image": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
                  "type": "buy",
                  "listcaption": "Comprar no iTunes",
                  "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
                  "colouroverflowimage": false,
                  "providername": "itunes"
                }
              ],
              "providers": [
                {
                  "caption": "Abrir no Spotify",
                  "images": {
                    "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/spotify-overflow_{scalefactor}.png",
                    "default": "https://images.shazam.com/static/icons/hub/ios/v5/spotify_{scalefactor}.png"
                  },
                  "actions": [
                    {
                      "name": "hub:spotify:searchdeeplink",
                      "type": "uri",
                      "uri": "spotify:search:Shape%20of%20You%20Ed%20Sheeran"
                    }
                  ],
                  "type": "SPOTIFY"
                },
                {
                  "caption": "Abrir no Deezer",
                  "images": {
                    "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/deezer-overflow_{scalefactor}.png",
                    "default": "https://images.shazam.com/static/icons/hub/ios/v5/deezer_{scalefactor}.png"
                  },
                  "actions": [
                    {
                      "name": "hub:deezer:searchdeeplink",
                      "type": "uri",
                      "uri": "deezer-query://www.deezer.com/play?query=%7Btrack%3A%27Shape+of+You%27%20artist%3A%27Ed+Sheeran%27%7D"
                    }
                  ],
                  "type": "DEEZER"
                }
              ],
              "explicit": false,
              "displayname": "APPLE MUSIC"
            },
            "artists": [
              {
                "id": "42",
                "adamid": "183313439"
              }
            ],
            "url": "https://www.shazam.com/track/338965882/shape-of-you"
          }
        },
        {
          "track": {
            "layout": "5",
            "type": "MUSIC",
            "key": "331952982",
            "title": "Hear Me Now",
            "subtitle": "Alok & Bruno Martini Feat. Zeeba",
            "share": {
              "subject": "Hear Me Now - Alok & Bruno Martini Feat. Zeeba",
              "text": "Usei o Shazam para descobrir Hear Me Now de Alok & Bruno Martini Feat. Zeeba.",
              "href": "https://www.shazam.com/track/331952982/hear-me-now",
              "image": "https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/14/b5/fe/14b5fedf-a650-853a-35d5-209e3437ac2c/8712944526554.jpg/400x400cc.jpg",
              "twitter": "Usei o @Shazam para descobrir Hear Me Now de Alok & Bruno Martini Feat. Zeeba.",
              "html": "https://www.shazam.com/snippets/email-share/331952982?lang=pt-BR&country=BR",
              "avatar": "https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/fd/43/66/fd4366d0-63fc-11ab-43a3-60d58be94c2c/pr_source.png/800x800cc.jpg",
              "snapchat": "https://www.shazam.com/partner/sc/track/331952982"
            },
            "images": {
              "background": "https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/fd/43/66/fd4366d0-63fc-11ab-43a3-60d58be94c2c/pr_source.png/800x800cc.jpg",
              "coverart": "https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/14/b5/fe/14b5fedf-a650-853a-35d5-209e3437ac2c/8712944526554.jpg/400x400cc.jpg",
              "coverarthq": "https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/14/b5/fe/14b5fedf-a650-853a-35d5-209e3437ac2c/8712944526554.jpg/400x400cc.jpg",
              "joecolor": "b:0e1b41p:ffffffs:fdc783t:ced1d8q:cda575"
            },
            "hub": {
              "type": "APPLEMUSIC",
              "image": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic_{scalefactor}.png",
              "actions": [
                {
                  "name": "apple",
                  "type": "applemusicplay",
                  "id": "1337209540"
                },
                {
                  "name": "apple",
                  "type": "uri",
                  "uri": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/79/8a/0b/798a0bdc-e82d-4d5c-4bf5-4ae9baaf2b82/mzaf_3865798019761155962.plus.aac.ep.m4a"
                }
              ],
              "options": [
                {
                  "caption": "ABRIR",
                  "actions": [
                    {
                      "name": "hub:applemusic:deeplink",
                      "type": "applemusicopen",
                      "uri": "https://music.apple.com/br/album/hear-me-now/1337209538?i=1337209540&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
                    },
                    {
                      "name": "hub:applemusic:deeplink",
                      "type": "uri",
                      "uri": "https://music.apple.com/br/album/hear-me-now/1337209538?i=1337209540&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
                    }
                  ],
                  "beacondata": {
                    "type": "open",
                    "providername": "applemusic"
                  },
                  "image": "https://images.shazam.com/static/icons/hub/ios/v5/overflow-open-option_{scalefactor}.png",
                  "type": "open",
                  "listcaption": "Abrir no Apple Music",
                  "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic-overflow_{scalefactor}.png",
                  "colouroverflowimage": false,
                  "providername": "applemusic"
                },
                {
                  "caption": "COMPRAR",
                  "actions": [
                    {
                      "type": "uri",
                      "uri": "https://itunes.apple.com/br/album/hear-me-now/1337209538?i=1337209540&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=itunes&itsct=Shazam_ios"
                    }
                  ],
                  "beacondata": {
                    "type": "buy",
                    "providername": "itunes"
                  },
                  "image": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
                  "type": "buy",
                  "listcaption": "Comprar no iTunes",
                  "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
                  "colouroverflowimage": false,
                  "providername": "itunes"
                }
              ],
              "providers": [
                {
                  "caption": "Abrir no Spotify",
                  "images": {
                    "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/spotify-overflow_{scalefactor}.png",
                    "default": "https://images.shazam.com/static/icons/hub/ios/v5/spotify_{scalefactor}.png"
                  },
                  "actions": [
                    {
                      "name": "hub:spotify:searchdeeplink",
                      "type": "uri",
                      "uri": "spotify:search:Hear%20Me%20Now%20Alok"
                    }
                  ],
                  "type": "SPOTIFY"
                },
                {
                  "caption": "Abrir no Deezer",
                  "images": {
                    "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/deezer-overflow_{scalefactor}.png",
                    "default": "https://images.shazam.com/static/icons/hub/ios/v5/deezer_{scalefactor}.png"
                  },
                  "actions": [
                    {
                      "name": "hub:deezer:searchdeeplink",
                      "type": "uri",
                      "uri": "deezer-query://www.deezer.com/play?query=%7Btrack%3A%27Hear+Me+Now%27%20artist%3A%27Alok++Bruno+Martini%27%7D"
                    }
                  ],
                  "type": "DEEZER"
                }
              ],
              "explicit": false,
              "displayname": "APPLE MUSIC"
            },
            "artists": [
              {
                "id": "42",
                "adamid": "324709167"
              }
            ],
            "url": "https://www.shazam.com/track/331952982/hear-me-now"
          }
        },
        {
          "track": {
            "layout": "5",
            "type": "MUSIC",
            "key": "502038746",
            "title": "Watermelon Sugar",
            "subtitle": "Harry Styles",
            "share": {
              "subject": "Watermelon Sugar - Harry Styles",
              "text": "Usei o Shazam para descobrir Watermelon Sugar de Harry Styles.",
              "href": "https://www.shazam.com/track/502038746/watermelon-sugar",
              "image": "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/2b/c4/c9/2bc4c9d4-3bc6-ab13-3f71-df0b89b173de/886448022213.jpg/400x400cc.jpg",
              "twitter": "Usei o @Shazam para descobrir Watermelon Sugar de Harry Styles.",
              "html": "https://www.shazam.com/snippets/email-share/502038746?lang=pt-BR&country=BR",
              "avatar": "https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/00/8f/26/008f26ce-ec78-ad42-9303-260ac3b9701c/pr_source.png/800x800cc.jpg",
              "snapchat": "https://www.shazam.com/partner/sc/track/502038746"
            },
            "images": {
              "background": "https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/00/8f/26/008f26ce-ec78-ad42-9303-260ac3b9701c/pr_source.png/800x800cc.jpg",
              "coverart": "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/2b/c4/c9/2bc4c9d4-3bc6-ab13-3f71-df0b89b173de/886448022213.jpg/400x400cc.jpg",
              "coverarthq": "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/2b/c4/c9/2bc4c9d4-3bc6-ab13-3f71-df0b89b173de/886448022213.jpg/400x400cc.jpg",
              "joecolor": "b:040203p:90d1eas:e99393t:74a8bcq:bb7676"
            },
            "hub": {
              "type": "APPLEMUSIC",
              "image": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic_{scalefactor}.png",
              "actions": [
                {
                  "name": "apple",
                  "type": "applemusicplay",
                  "id": "1485802967"
                },
                {
                  "name": "apple",
                  "type": "uri",
                  "uri": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/3f/28/71/3f28713b-2aed-9d52-09e2-7f5e0a2298a8/mzaf_16240084194638908976.plus.aac.ep.m4a"
                }
              ],
              "options": [
                {
                  "caption": "ABRIR",
                  "actions": [
                    {
                      "name": "hub:applemusic:deeplink",
                      "type": "applemusicopen",
                      "uri": "https://music.apple.com/br/album/watermelon-sugar/1485802965?i=1485802967&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
                    },
                    {
                      "name": "hub:applemusic:deeplink",
                      "type": "uri",
                      "uri": "https://music.apple.com/br/album/watermelon-sugar/1485802965?i=1485802967&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
                    }
                  ],
                  "beacondata": {
                    "type": "open",
                    "providername": "applemusic"
                  },
                  "image": "https://images.shazam.com/static/icons/hub/ios/v5/overflow-open-option_{scalefactor}.png",
                  "type": "open",
                  "listcaption": "Abrir no Apple Music",
                  "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic-overflow_{scalefactor}.png",
                  "colouroverflowimage": false,
                  "providername": "applemusic"
                },
                {
                  "caption": "COMPRAR",
                  "actions": [
                    {
                      "type": "uri",
                      "uri": "https://itunes.apple.com/br/album/watermelon-sugar/1485802965?i=1485802967&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=itunes&itsct=Shazam_ios"
                    }
                  ],
                  "beacondata": {
                    "type": "buy",
                    "providername": "itunes"
                  },
                  "image": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
                  "type": "buy",
                  "listcaption": "Comprar no iTunes",
                  "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
                  "colouroverflowimage": false,
                  "providername": "itunes"
                }
              ],
              "providers": [
                {
                  "caption": "Abrir no Spotify",
                  "images": {
                    "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/spotify-overflow_{scalefactor}.png",
                    "default": "https://images.shazam.com/static/icons/hub/ios/v5/spotify_{scalefactor}.png"
                  },
                  "actions": [
                    {
                      "name": "hub:spotify:searchdeeplink",
                      "type": "uri",
                      "uri": "spotify:search:Watermelon%20Sugar%20Harry%20Styles"
                    }
                  ],
                  "type": "SPOTIFY"
                },
                {
                  "caption": "Abrir no Deezer",
                  "images": {
                    "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/deezer-overflow_{scalefactor}.png",
                    "default": "https://images.shazam.com/static/icons/hub/ios/v5/deezer_{scalefactor}.png"
                  },
                  "actions": [
                    {
                      "name": "hub:deezer:searchdeeplink",
                      "type": "uri",
                      "uri": "deezer-query://www.deezer.com/play?query=%7Btrack%3A%27Watermelon+Sugar%27%20artist%3A%27Harry+Styles%27%7D"
                    }
                  ],
                  "type": "DEEZER"
                }
              ],
              "explicit": false,
              "displayname": "APPLE MUSIC"
            },
            "artists": [
              {
                "id": "42",
                "adamid": "471260289"
              }
            ],
            "url": "https://www.shazam.com/track/502038746/watermelon-sugar"
          }
        },
        {
          "track": {
            "layout": "5",
            "type": "MUSIC",
            "key": "342040601",
            "title": "Something Just Like This",
            "subtitle": "The Chainsmokers & Coldplay",
            "share": {
              "subject": "Something Just Like This - The Chainsmokers & Coldplay",
              "text": "Usei o Shazam para descobrir Something Just Like This de The Chainsmokers & Coldplay.",
              "href": "https://www.shazam.com/track/342040601/something-just-like-this",
              "image": "https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/9d/56/6f/9d566f55-5253-bed6-5c31-df952dae649d/886446379289.jpg/400x400cc.jpg",
              "twitter": "Usei o @Shazam para descobrir Something Just Like This de The Chainsmokers & Coldplay.",
              "html": "https://www.shazam.com/snippets/email-share/342040601?lang=pt-BR&country=BR",
              "avatar": "https://is1-ssl.mzstatic.com/image/thumb/Features116/v4/30/ad/56/30ad5621-d30b-4504-10df-f9374ffdd9da/mza_16216675209446096356.png/800x800cc.jpg",
              "snapchat": "https://www.shazam.com/partner/sc/track/342040601"
            },
            "images": {
              "background": "https://is1-ssl.mzstatic.com/image/thumb/Features116/v4/30/ad/56/30ad5621-d30b-4504-10df-f9374ffdd9da/mza_16216675209446096356.png/800x800cc.jpg",
              "coverart": "https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/9d/56/6f/9d566f55-5253-bed6-5c31-df952dae649d/886446379289.jpg/400x400cc.jpg",
              "coverarthq": "https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/9d/56/6f/9d566f55-5253-bed6-5c31-df952dae649d/886446379289.jpg/400x400cc.jpg",
              "joecolor": "b:4d3a34p:edb668s:dfaa76t:cd9d5dq:c19469"
            },
            "hub": {
              "type": "APPLEMUSIC",
              "image": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic_{scalefactor}.png",
              "actions": [
                {
                  "name": "apple",
                  "type": "applemusicplay",
                  "id": "1207120448"
                },
                {
                  "name": "apple",
                  "type": "uri",
                  "uri": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/15/ba/ac/15baacbc-42ed-430a-1c4c-c8e0d8402ed3/mzaf_5591441079334743408.plus.aac.ep.m4a"
                }
              ],
              "options": [
                {
                  "caption": "ABRIR",
                  "actions": [
                    {
                      "name": "hub:applemusic:deeplink",
                      "type": "applemusicopen",
                      "uri": "https://music.apple.com/br/album/something-just-like-this/1207120422?i=1207120448&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
                    },
                    {
                      "name": "hub:applemusic:deeplink",
                      "type": "uri",
                      "uri": "https://music.apple.com/br/album/something-just-like-this/1207120422?i=1207120448&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
                    }
                  ],
                  "beacondata": {
                    "type": "open",
                    "providername": "applemusic"
                  },
                  "image": "https://images.shazam.com/static/icons/hub/ios/v5/overflow-open-option_{scalefactor}.png",
                  "type": "open",
                  "listcaption": "Abrir no Apple Music",
                  "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic-overflow_{scalefactor}.png",
                  "colouroverflowimage": false,
                  "providername": "applemusic"
                },
                {
                  "caption": "COMPRAR",
                  "actions": [
                    {
                      "type": "uri",
                      "uri": "https://itunes.apple.com/br/album/something-just-like-this/1207120422?i=1207120448&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=itunes&itsct=Shazam_ios"
                    }
                  ],
                  "beacondata": {
                    "type": "buy",
                    "providername": "itunes"
                  },
                  "image": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
                  "type": "buy",
                  "listcaption": "Comprar no iTunes",
                  "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
                  "colouroverflowimage": false,
                  "providername": "itunes"
                }
              ],
              "providers": [
                {
                  "caption": "Abrir no Spotify",
                  "images": {
                    "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/spotify-overflow_{scalefactor}.png",
                    "default": "https://images.shazam.com/static/icons/hub/ios/v5/spotify_{scalefactor}.png"
                  },
                  "actions": [
                    {
                      "name": "hub:spotify:searchdeeplink",
                      "type": "uri",
                      "uri": "spotify:search:Something%20Just%20Like%20This%20The%20Chainsmokers"
                    }
                  ],
                  "type": "SPOTIFY"
                },
                {
                  "caption": "Abrir no Deezer",
                  "images": {
                    "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/deezer-overflow_{scalefactor}.png",
                    "default": "https://images.shazam.com/static/icons/hub/ios/v5/deezer_{scalefactor}.png"
                  },
                  "actions": [
                    {
                      "name": "hub:deezer:searchdeeplink",
                      "type": "uri",
                      "uri": "deezer-query://www.deezer.com/play?query=%7Btrack%3A%27Something+Just+Like+This%27%20artist%3A%27The+Chainsmokers++Coldplay%27%7D"
                    }
                  ],
                  "type": "DEEZER"
                }
              ],
              "explicit": false,
              "displayname": "APPLE MUSIC"
            },
            "artists": [
              {
                "id": "42",
                "adamid": "580391756"
              }
            ],
            "url": "https://www.shazam.com/track/342040601/something-just-like-this"
          }
        },
        {
          "track": {
            "layout": "5",
            "type": "MUSIC",
            "key": "500174891",
            "title": "Don't Start Now",
            "subtitle": "Dua Lipa",
            "share": {
              "subject": "Don't Start Now - Dua Lipa",
              "text": "Usei o Shazam para descobrir Don't Start Now de Dua Lipa.",
              "href": "https://www.shazam.com/track/500174891/dont-start-now",
              "image": "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/d8/8f/4b/d88f4b28-d500-03e2-adc0-62dba9342ea6/190295092665.jpg/400x400cc.jpg",
              "twitter": "Usei o @Shazam para descobrir Don't Start Now de Dua Lipa.",
              "html": "https://www.shazam.com/snippets/email-share/500174891?lang=pt-BR&country=BR",
              "avatar": "https://is5-ssl.mzstatic.com/image/thumb/Features125/v4/aa/2a/be/aa2abed7-b4ab-d732-6d02-69dcd478e645/pr_source.png/800x800cc.jpg",
              "snapchat": "https://www.shazam.com/partner/sc/track/500174891"
            },
            "images": {
              "background": "https://is5-ssl.mzstatic.com/image/thumb/Features125/v4/aa/2a/be/aa2abed7-b4ab-d732-6d02-69dcd478e645/pr_source.png/800x800cc.jpg",
              "coverart": "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/d8/8f/4b/d88f4b28-d500-03e2-adc0-62dba9342ea6/190295092665.jpg/400x400cc.jpg",
              "coverarthq": "https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/d8/8f/4b/d88f4b28-d500-03e2-adc0-62dba9342ea6/190295092665.jpg/400x400cc.jpg",
              "joecolor": "b:0a0c07p:68bce9s:5ab4dat:5599bcq:4a92af"
            },
            "hub": {
              "type": "APPLEMUSIC",
              "image": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic_{scalefactor}.png",
              "actions": [
                {
                  "name": "apple",
                  "type": "applemusicplay",
                  "id": "1538003635"
                },
                {
                  "name": "apple",
                  "type": "uri",
                  "uri": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/35/3c/08/353c0849-04f5-96cd-cca1-8632f6ed4a45/mzaf_6594399613796674914.plus.aac.ep.m4a"
                }
              ],
              "options": [
                {
                  "caption": "ABRIR",
                  "actions": [
                    {
                      "name": "hub:applemusic:deeplink",
                      "type": "applemusicopen",
                      "uri": "https://music.apple.com/br/album/dont-start-now/1538003494?i=1538003635&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
                    },
                    {
                      "name": "hub:applemusic:deeplink",
                      "type": "uri",
                      "uri": "https://music.apple.com/br/album/dont-start-now/1538003494?i=1538003635&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
                    }
                  ],
                  "beacondata": {
                    "type": "open",
                    "providername": "applemusic"
                  },
                  "image": "https://images.shazam.com/static/icons/hub/ios/v5/overflow-open-option_{scalefactor}.png",
                  "type": "open",
                  "listcaption": "Abrir no Apple Music",
                  "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic-overflow_{scalefactor}.png",
                  "colouroverflowimage": false,
                  "providername": "applemusic"
                },
                {
                  "caption": "COMPRAR",
                  "actions": [
                    {
                      "type": "uri",
                      "uri": "https://itunes.apple.com/br/album/dont-start-now/1538003494?i=1538003635&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=itunes&itsct=Shazam_ios"
                    }
                  ],
                  "beacondata": {
                    "type": "buy",
                    "providername": "itunes"
                  },
                  "image": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
                  "type": "buy",
                  "listcaption": "Comprar no iTunes",
                  "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
                  "colouroverflowimage": false,
                  "providername": "itunes"
                }
              ],
              "providers": [
                {
                  "caption": "Abrir no Spotify",
                  "images": {
                    "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/spotify-overflow_{scalefactor}.png",
                    "default": "https://images.shazam.com/static/icons/hub/ios/v5/spotify_{scalefactor}.png"
                  },
                  "actions": [
                    {
                      "name": "hub:spotify:searchdeeplink",
                      "type": "uri",
                      "uri": "spotify:search:Don%27t%20Start%20Now%20Dua%20Lipa"
                    }
                  ],
                  "type": "SPOTIFY"
                },
                {
                  "caption": "Abrir no Deezer",
                  "images": {
                    "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/deezer-overflow_{scalefactor}.png",
                    "default": "https://images.shazam.com/static/icons/hub/ios/v5/deezer_{scalefactor}.png"
                  },
                  "actions": [
                    {
                      "name": "hub:deezer:searchdeeplink",
                      "type": "uri",
                      "uri": "deezer-query://www.deezer.com/play?query=%7Btrack%3A%27Don%5C%27t+Start+Now%27%20artist%3A%27Dua+Lipa%27%7D"
                    }
                  ],
                  "type": "DEEZER"
                }
              ],
              "explicit": false,
              "displayname": "APPLE MUSIC"
            },
            "artists": [
              {
                "id": "42",
                "adamid": "1031397873"
              }
            ],
            "url": "https://www.shazam.com/track/500174891/dont-start-now"
          }
        }
      ]
    }
  }

  skeletonStyles = {
    header: {
      title: {
        'width': '136px',
        'height': '60px',
        'border-radius': '0.5em',
        'margin': '0'
      },
      subtitle: {
        'width': '520px',
        'height': '24px',
        'border-radius': '0.5em',
        'margin': '0'
      },
    },
    playlistHeader: {
      title: {
        'width': '20em',
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
        'width': '20em',
        'height': '1.5em',
        'border-radius': '0.5em',
        'margin': '0'
      },
      subtitle: {
        'width': '16em',
        'height': '1.2em',
        'border-radius': '0.5em',
        'margin': '0'
      }
    }
  }


}
