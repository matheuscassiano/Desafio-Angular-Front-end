import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ListModule } from 'src/app/components/list/list.module';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ListModule,
    RouterModule,
    NgxSkeletonLoaderModule
  ]
})
export class HomeModule { }
