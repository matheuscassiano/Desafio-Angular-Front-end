import { TestBed } from "@angular/core/testing";
import { IPlaylist } from "src/app/interfaces/playlist.interface";
import { PlaylistsComponent } from "./playlists.component";

describe("PlaylistsPage", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistsComponent],
    }).compileComponents();
  });

  // component.ts
  it('should create the plalists page', () => {
    const fixture = TestBed.createComponent(PlaylistsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be laoding', () => {
    const fixture = TestBed.createComponent(PlaylistsComponent);
    const app = fixture.componentInstance;
    expect(app.isLoading).toBeTruthy();
  });

  it('should have some playlists', () => {
    const fixture = TestBed.createComponent(PlaylistsComponent);
    const app = fixture.componentInstance;
    expect(app.noPlaylist).toBeFalse();
  });

  it('should select a playlist', () => {
    const fixture = TestBed.createComponent(PlaylistsComponent);
    const app = fixture.componentInstance;
    const playlist: IPlaylist = {
      id: "aaaaaaaaa",
      category: "Pop",
      city: "Maceio",
      songs: [],
      temperature: 30,
      createdAt: new Date(),
    };
    app.selectPlaylist(playlist);
    expect(app.selectedPlaylist).toEqual(playlist);
  });

  it('should remove a playlist', () => {
    const fixture = TestBed.createComponent(PlaylistsComponent);
    const app = fixture.componentInstance;
    app.playlists = [
      {
        id: "aaaaaaaaa",
        category: "Pop",
        city: "Maceio",
        songs: [],
        temperature: 30,
        createdAt: new Date(),
      },
      {
        id: "bbbbbbbbb",
        category: "Pop",
        city: "Maceio",
        songs: [],
        temperature: 28,
        createdAt: new Date(),
      }
    ];

    const willBeRemoved = app.playlists[0];
    app.removePlaylist(willBeRemoved.id);

    expect(app.playlists[0]).not.toEqual(willBeRemoved);
    expect(app.playlists[0].id).toEqual("bbbbbbbbb");
    expect(app.playlists.length).toEqual(1);
  });

  // component.html
  it('should render title', () => {
    const fixture = TestBed.createComponent(PlaylistsComponent);
    const app = fixture.componentInstance;

    app.noPlaylist = true;
    app.playlists = [
      {
        id: "aaaaaaaaa",
        category: "Pop",
        city: "Maceio",
        songs: [],
        temperature: 30,
        createdAt: new Date(),
      },
      {
        id: "bbbbbbbbb",
        category: "Pop",
        city: "Maceio",
        songs: [],
        temperature: 28,
        createdAt: new Date(),
      }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("h2 span:nth-child(1)")?.textContent).toContain("←");
    expect(compiled.querySelector("h2 span:nth-child(2)")?.textContent).toContain("Playlists salvas");
  });

  it('should render subtitle if has no playlist', () => {
    const fixture = TestBed.createComponent(PlaylistsComponent);
    const app = fixture.componentInstance;

    app.noPlaylist = true;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(".empty-container p")?.textContent)
      .toContain("Voce nao salvou nenhuma playlist, volte para a pagina inical e adicione algumas musicas");
  });
});