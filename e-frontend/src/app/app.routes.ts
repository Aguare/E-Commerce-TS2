import { Routes } from '@angular/router';
import { NavHomeComponent } from './components/Navbars/nav-home/nav-home.component';
import { NotFoundComponent } from './components/Views/not-found/not-found.component';
import { MarketComponent } from './components/Views/market/market.component';
import { NavCommonComponent } from './components/Navbars/nav-common/nav-common.component';
import { CreatePublicationComponent } from './components/Publication/create-publication/create-publication.component';
import { ListPublicationsComponent } from './components/Publication/list-publications/list-publications.component';
import { ViewPublicationComponent } from './components/Publication/view-publication/view-publication.component';
import { ListBuysComponent } from './components/Acquired/list-buys/list-buys.component';
import { ListVolunteeringComponent } from './components/Acquired/list-volunteering/list-volunteering.component';
import { NavAdminComponent } from './components/Navbars/nav-admin/nav-admin.component';
import { ListPublicationAdminComponent } from './components/Admin/list-publication-admin/list-publication-admin.component';
import { AddFoundsComponent } from './components/Common/add-founds/add-founds.component';
import { ChatComponent } from './components/Common/chat/chat.component';
import { PerfilComponent } from './components/Common/perfil/perfil.component';

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
            },
            {
                path: 'add-founds',
                component: AddFoundsComponent
            },
            {
                path: 'chat',
                component: ChatComponent
            },
            {
                path: 'perfil',
                component: PerfilComponent
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
            },
            {
                path: 'my-publications',
                component: ListPublicationsComponent
            },
            {
                path: 'view/:id',
                component: ViewPublicationComponent
            }
        ]

    },
    {
        path: 'buys',
        component: NavCommonComponent,
        children: [
            {
                path: 'my-buys',
                component: ListBuysComponent
            },
            {
                path: 'my-volunteering',
                component: ListVolunteeringComponent
            }
        ]
    },
    {
        path: 'admin',
        component: NavAdminComponent,
        children: [
            {
                path: 'publications',
                component: ListPublicationAdminComponent
            },
            {
                path: 'view/:id',
                component: ViewPublicationComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '404'
    },
];
