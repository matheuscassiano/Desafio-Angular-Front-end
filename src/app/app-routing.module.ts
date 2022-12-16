import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'playlists', component: PlaylistsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
