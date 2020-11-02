import { Component, OnInit } from '@angular/core';
import { Veterinary } from 'src/app/classes/veterinary';
import { VeterinaryCare } from 'src/app/classes/veterinary-care';
import { VeterinaryCareService } from 'src/app/services/veterinary-care.service';
import { VeterinaryService } from 'src/app/services/veterinary.service';

@Component({
  selector: 'app-veterinary',
  templateUrl: './veterinary.component.html',
  styleUrls: ['./veterinary.component.css']
})
export class VeterinaryComponent implements OnInit {

  myVeterinaries: Veterinary[] = [];
  myVeterinaryCares: VeterinaryCare[] = [];
  


  constructor(private veterinaryService: VeterinaryService, private careService: VeterinaryCareService) { }

  ngOnInit(): void {
    this.getAllVeterinaries();
    this.getAllVeterinaryCaresToDo();
  }

  getAllVeterinaries() {
    this.veterinaryService.getAllVeterinaries().subscribe(
      data => this.myVeterinaries = data
    );
  }

  getAllVeterinaryCaresToDo(){
    this.careService.getVeterinaryCaresToDo()
      .subscribe( data => this.myVeterinaryCares = data );
  }

  


}
