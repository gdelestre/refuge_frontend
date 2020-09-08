import { Component, OnInit } from '@angular/core';
import { Veterinary } from 'src/app/classes/veterinary';
import { ActivatedRoute } from '@angular/router';
import { VeterinaryCareService } from 'src/app/services/veterinary-care.service';

@Component({
  selector: 'app-veterinary',
  templateUrl: './veterinary.component.html',
  styleUrls: ['./veterinary.component.css']
})
export class VeterinaryComponent implements OnInit {

  myVeterinaries: Veterinary[] = [];
  now = new Date();


  constructor(private route:ActivatedRoute, private veterinaryCareService: VeterinaryCareService) { }

  ngOnInit(): void {
    this.getAllVeterinaries();
  }

  getAllVeterinaries() {
    this.veterinaryCareService.getAllVeterinaries().subscribe(
      data => this.myVeterinaries = data
    );
  }

  


}
