import { TestBed } from "@angular/core/testing";
import { ListComponent } from "./list.component";

describe("ListComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
    }).compileComponents();
  });

  it('should create the list', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  })
});