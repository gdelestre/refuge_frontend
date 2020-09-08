import { Person } from './person';

export class HostFamily extends Person {
    free: boolean;
    
    constructor(id: string, firstName: string, lastName: string, zipCode: number, 
        city: string, streetName: string, streetNumber: number, phoneNumber: string, free: boolean){
        super(id,firstName,lastName,zipCode,city,streetName,streetNumber,phoneNumber);
        this.free = free;
    }
}    