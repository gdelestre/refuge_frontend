import { Animal } from './animal';
import { Veterinary } from './veterinary';

export class VeterinaryCare {
    id: string;
    examen: string;
    examenDate: Date;
    examenTime: string;
    animal: Animal;
    veterinary: Veterinary;

}
