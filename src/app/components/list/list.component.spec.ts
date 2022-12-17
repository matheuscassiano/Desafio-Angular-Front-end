import { TestBed } from "@angular/core/testing";
import { Toast, ToastrModule } from "ngx-toastr";
import { ListComponent } from "./list.component";

describe("ListComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      declarations: [ListComponent],
      providers: [Toast]
    }).compileComponents();
  });

  it('should create the list', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  })
});