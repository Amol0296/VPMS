import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component'
import {AppService} from './app.service'
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
{
  path:'vehicle',
  component:AdminComponent
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true}),
    HttpClientModule
  ],
  exports: [RouterModule],
  providers:[AppService]
})
export class AppRoutingModule { }
