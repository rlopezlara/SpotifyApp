import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'songs',
    loadChildren: () =>
      import('./pages/songs/songs.module').then((m) => m.SongsPageModule),
  },
  {
    path: 'song-details/:id',
    loadChildren: () =>
      import('./pages/song-details/song-details.module').then(
        (m) => m.SongDetailsPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
