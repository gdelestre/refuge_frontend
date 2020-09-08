import { Person } from './person';

export class AdoptiveFamily extends Person {
    adoptionDate: Date;

    constructor(id: string, firstName: string, lastName: string, zipCode: number, 
        city: string, streetName: string, streetNumber: number, phoneNumber: string, adoptionDate: Date){
        super(id,firstName,lastName,zipCode,city,streetName,streetNumber,phoneNumber);
        this.adoptionDate = adoptionDate;
    }
}
