import { Routes } from '@angular/router';
import { EmployListComponent } from './component/employ-list/employ-list.component';
import { EmployeeFromComponent } from './component/employee-from/employee-from.component';

export const routes: Routes = [
    {
        path: "" ,
        component: EmployListComponent
    },
    {
       path: "employ-list" ,
       component: EmployListComponent  
    },
    {
        path: "create-employee" ,
        component: EmployeeFromComponent
     },
     {
        path: "employee/:id" ,
        component: EmployeeFromComponent
     }
];
