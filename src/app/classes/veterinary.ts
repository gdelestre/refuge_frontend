import { Person } from './person';
import { VeterinaryCare } from './veterinary-care';

export class Veterinary extends Person {
    veterinaryCares: VeterinaryCare[];
}
