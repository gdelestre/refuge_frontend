import { Sexe } from './enum/sexe.enum';
import { Species } from './enum/species.enum';
import { AdoptAnimal } from './adopt-animal';
import { HostFamily } from './host-family';

export class Animal {
    id: string;
    race: string;
    name: string;
    sexe: Sexe;
    species: Species;
    birthDate: Date;
    arrivalDate: Date;
    hostFamily: HostFamily;
    adopted: boolean;
    adoption: AdoptAnimal;

}
