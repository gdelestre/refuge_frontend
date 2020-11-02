import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalComponent } from './components/animal/animal.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { VeterinaryComponent } from './components/veterinary/veterinary.component';
import { HostFamilyComponent } from './components/host-family/host-family.component';
import { AdoptiveFamilyComponent } from './components/adoptive-family/adoptive-family.component';
import { AddVeterinaryComponent } from './components/add-veterinary/add-veterinary.component';
import { AddAdoptiveFamilyComponent } from './components/add-adoptive-family/add-adoptive-family.component';
import { AddHostFamilyComponent } from './components/add-host-family/add-host-family.component';
import { UpdateFamilyComponent } from './components/update-family/update-family.component';
import { AddOrUpdateAnimalComponent } from './components/add-or-update-animal/add-or-update-animal.component';
import { AddOrUpdateCareComponent } from './components/add-or-update-care/add-or-update-care.component';


const routes: Routes = [
{path: 'cares/:idCare/update/:idAnimal', component: AddOrUpdateCareComponent},
{path: 'veterinaries/:idVeterinary/update', component: UpdateFamilyComponent},
{path: 'adoptives/:idAdoptive/update', component: UpdateFamilyComponent},
{path: 'hosts/:idHost/update', component: UpdateFamilyComponent},
{path: 'animals/:idAnimal/update', component: AddOrUpdateAnimalComponent },
{path: 'update/:idAnimal/host', component: AddHostFamilyComponent },
{path: 'host/:idAnimal', component: AddHostFamilyComponent },
{path: 'adopt/:idAnimal', component: AddAdoptiveFamilyComponent },
{path: 'care/:idAnimal/add', component: AddOrUpdateCareComponent },
{path: 'veterinaries/add', component: AddVeterinaryComponent },
{path: 'animals/add', component: AddOrUpdateAnimalComponent },
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
