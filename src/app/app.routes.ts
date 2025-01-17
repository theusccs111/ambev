import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        component: HomeComponent,

        // data: {
        //     title: 'Dashboard',
        //     pathParent: 'Relatórios',
        //     path: ' / Dashboard',
        //     info: 'Obtenha uma visão consolidada dos principais indicadores no Dashboard, facilitando a tomada de decisões estratégicas.'
        // },

        // canActivate: [AuthGuard]
    },

    {
        path: 'vendas',
        component: HomeComponent,

    }
];
