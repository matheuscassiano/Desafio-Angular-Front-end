import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists.component';
import { ListModule } from 'src/app/components/list/list.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PlaylistsComponent],
  imports: [
    CommonModule,
    ListModule,
    RouterModule,
  ]
})
export class PlaylistsModule { }
