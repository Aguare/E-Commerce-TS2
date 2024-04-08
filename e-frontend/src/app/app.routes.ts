import { Routes } from '@angular/router';
import { NavHomeComponent } from './components/Navbars/nav-home/nav-home.component';
import { NotFoundComponent } from './components/Views/not-found/not-found.component';
import { MarketComponent } from './components/Views/market/market.component';
import { NavCommonComponent } from './components/Navbars/nav-common/nav-common.component';
import { CreatePublicationComponent } from './components/Publication/create-publication/create-publication.component';

export const routes: Routes = [
    {
        path: '404',
        component: NotFoundComponent,
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: NavHomeComponent
    },
    {
        path: 'market',
        component: NavCommonComponent,
        children: [
            {
                path: 'publications',
                component: MarketComponent
            }
        ]
    },
    {
        path: 'publication',
        component: NavCommonComponent,
        children: [
            {
                path: 'create',
                component: CreatePublicationComponent
            }
        ]

    },
    {
        path: '**',
        redirectTo: '404'
    },
];
