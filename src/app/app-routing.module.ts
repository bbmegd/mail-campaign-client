import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'compose-email',
    loadChildren: () => import('./compose-email/compose-email.module').then( m => m.ComposeEmailPageModule)
  },
  {
    path: 'campaign',
    loadChildren: () => import('./campaign/campaign.module').then( m => m.CampaignPageModule)
  },
  {
    path: 'link/:uuid',
    loadChildren: () => import('./link/link.module').then( m => m.LinkPageModule)
  },
  {
    path: 'contact-details',
    loadChildren: () => import('./contact-details/contact-details.module').then( m => m.ContactDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
