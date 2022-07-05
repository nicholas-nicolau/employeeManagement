import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFileds } from './core/UserInputFields/UserInputFields.component';
import { UserTable } from './core/userTable/UserTable.component';

const routes: Routes = [
  {
    path:'', redirectTo: 'users', pathMatch: 'full'
  },
  {
    path:'users', pathMatch: 'full',
    component: UserTable
  },
  {
    path:'edit/:id', pathMatch: 'full',
    component: UserFileds
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
