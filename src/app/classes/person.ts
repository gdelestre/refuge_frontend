export abstract class Person {
    id: string;
    firstName: string;
    lastName: string;
    zipCode: number;
    city: string;
    streetName: string;
    streetNumber: number;
    phoneNumber: string;

    constructor(id: string, firstName: string, lastName: string, zipCode: number, 
        city: string, streetName: string, streetNumber: number, phoneNumber: string){
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.zipCode = zipCode;
            this.city = city;
            this.streetName = streetName;
            this.streetNumber = streetNumber;
            this.phoneNumber = phoneNumber;
        }
}
