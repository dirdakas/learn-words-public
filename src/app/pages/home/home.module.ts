import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoaderModule } from './../../components/loader/loader.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, LoaderModule, NgxChartsModule, MatListModule],
})
export class HomeModule {}
