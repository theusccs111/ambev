import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SaleComponent } from './pages/sale/sale/sale.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'sale',
        component: SaleComponent,

        data: {
            title: 'Sales',
            pathParent: 'Begin',
            path: ' / Sales',
            info: 'Make sales here'
        },

        // canActivate: [AuthGuard]
    }
];
