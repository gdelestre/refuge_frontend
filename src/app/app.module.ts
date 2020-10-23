import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalComponent } from './components/animal/animal.component';
import { HttpClientModule } from '@angular/common/http';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { VeterinaryComponent } from './components/veterinary/veterinary.component';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { HostFamilyComponent } from './components/host-family/host-family.component';
import { AdoptiveFamilyComponent } from './components/adoptive-family/adoptive-family.component';
import { AddAnimalComponent } from './components/add-animal/add-animal.component';
import { AddVeterinaryComponent } from './components/add-veterinary/add-veterinary.component';
import { AddCareComponent } from './components/add-care/add-care.component';
import { AddAdoptiveFamilyComponent } from './components/add-adoptive-family/add-adoptive-family.component';
import { AddHostFamilyComponent } from './components/add-host-family/add-host-family.component';


@NgModule({
  declarations: [
    AppComponent,
    AnimalComponent,
    AnimalDetailsComponent,
    VeterinaryComponent,
    OrderByDatePipe,
    HostFamilyComponent,
    AdoptiveFamilyComponent,
    AddAnimalComponent,
    AddVeterinaryComponent,
    AddCareComponent,
    AddAdoptiveFamilyComponent,
    AddHostFamilyComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
