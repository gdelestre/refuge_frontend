import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalComponent } from './components/animal/animal.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { VeterinaryComponent } from './components/veterinary/veterinary.component';
import { HostFamilyComponent } from './components/host-family/host-family.component';
import { AdoptiveFamilyComponent } from './components/adoptive-family/adoptive-family.component';


const routes: Routes = [
{path: 'animals/details/:id', component: AnimalDetailsComponent },
{path: 'animals/:species', component: AnimalComponent },
{path: 'adoptives', component: AdoptiveFamilyComponent },
{path: 'hosts', component: HostFamilyComponent },
{path: 'veterinaries', component: VeterinaryComponent },
{path: 'animals', component: AnimalComponent },
{path: '', redirectTo: '/animals', pathMatch: 'full'},
{path: '**', redirectTo: '/animals', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
