import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalComponent } from './components/animal/animal.component';
import { HttpClientModule } from '@angular/common/http';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { VeterinaryComponent } from './components/veterinary/veterinary.component';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AnimalComponent,
    AnimalDetailsComponent,
    VeterinaryComponent,
    OrderByDatePipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
