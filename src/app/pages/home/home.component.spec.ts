import { TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe("HomePage", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [HomeComponent],
      providers: [HttpClient]
    }).compileComponents();
  });

  // component.ts
  it('should create the home page', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be laoding', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app.isLoading).toBeTruthy();
  });

  it('should not be refused', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app.refuseLocation).toBeFalse();
  });

  it('should generate a string id', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;

    const id = app.uniqId();
    expect(typeof id).toBe("string");
  });

  // component.html
  it('should render title', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;

    app.isLoading = false;
    app.weather = {
      name: "Maceio",
      main: { temp: 30 }
    }

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("main header h2")?.textContent).toContain("30°C");
  });

  it('should render subtitle', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    
    app.isLoading = false;
    app.category = "Pop";
    app.weather = {
      name: "Maceio",
      main: { temp: 30 }
    }

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("main header p")?.textContent)
      .toContain("Esta fazendo 30°C em Maceio, que tal ouvir um pouco de Pop");
  });

  it('should render subtitle if has no location', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    
    app.refuseLocation = true;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(".refused p")?.textContent)
      .toContain("Precisamos da sua localizacao para recomendar novas musicas para voce");
  });
});