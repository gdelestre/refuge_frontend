import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalComponent } from './components/animal/animal.component';
import { HttpClientModule } from '@angular/common/http';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { VeterinaryComponent } from './components/veterinary/veterinary.component';
import { HostFamilyComponent } from './components/host-family/host-family.component';
import { AdoptiveFamilyComponent } from './components/adoptive-family/adoptive-family.component';
import { AddVeterinaryComponent } from './components/add-veterinary/add-veterinary.component';
import { AddAdoptiveFamilyComponent } from './components/add-adoptive-family/add-adoptive-family.component';
import { AddHostFamilyComponent } from './components/add-host-family/add-host-family.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { UpdateFamilyComponent } from './components/update-family/update-family.component';
import { AddOrUpdateAnimalComponent } from './components/add-or-update-animal/add-or-update-animal.component';
import { AddOrUpdateCareComponent } from './components/add-or-update-care/add-or-update-care.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    AnimalComponent,
    AnimalDetailsComponent,
    VeterinaryComponent,
    HostFamilyComponent,
    AdoptiveFamilyComponent,
    AddVeterinaryComponent,
    AddAdoptiveFamilyComponent,
    AddHostFamilyComponent,
    UpdateFamilyComponent,
    AddOrUpdateAnimalComponent,
    AddOrUpdateCareComponent,
    ConfirmModalComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    UiSwitchModule,
    ModalModule.forRoot(),
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
