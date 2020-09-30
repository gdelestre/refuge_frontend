import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalComponent } from './components/animal/animal.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { VeterinaryComponent } from './components/veterinary/veterinary.component';
import { HostFamilyComponent } from './components/host-family/host-family.component';
import { AdoptiveFamilyComponent } from './components/adoptive-family/adoptive-family.component';
import { AddAnimalComponent } from './components/add-animal/add-animal.component';
import { AddVeterinaryComponent } from './components/add-veterinary/add-veterinary.component';
import { AddCareComponent } from './components/add-care/add-care.component';


const routes: Routes = [
{path: 'care/:idAnimal', component: AddCareComponent },
{path: 'veterinaries/add', component: AddVeterinaryComponent },
{path: 'animals/add', component: AddAnimalComponent },
{path: 'animals/details/:id', component: AnimalDetailsComponent },
{path: 'animals/:species', component: AnimalComponent },
{path: 'adoptives', component: AdoptiveFamilyComponent },
{path: 'hosts', component: HostFamilyComponent },
{path: 'cares', component: VeterinaryComponent },
{path: 'animals', component: AnimalComponent },
{path: '', redirectTo: '/animals', pathMatch: 'full'},
{path: '**', redirectTo: '/animals', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
