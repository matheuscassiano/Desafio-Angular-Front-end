import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input("list") list?: any[];
  @Input("width") width?: string = "80vw";

  goToSong(url: string): void {
    open(url, "_blank");
  }
}
