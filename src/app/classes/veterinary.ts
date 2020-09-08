import { Person } from './person';
import { VeterinaryCare } from './veterinary-care';

export class Veterinary extends Person {

    veterinaryCares: VeterinaryCare[];
    constructor(id: string, firstName: string, lastName: string, zipCode: number, 
        city: string, streetName: string, streetNumber: number, phoneNumber: string, adoptionDate: Date){
        super(id,firstName,lastName,zipCode,city,streetName,streetNumber,phoneNumber);
    }
}
