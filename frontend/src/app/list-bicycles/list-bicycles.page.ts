import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BicycleService } from '../services/bicycle.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-list-bicycles',
  templateUrl: './list-bicycles.page.html',
  styleUrls: ['./list-bicycles.page.scss'],
})

export class ListBicyclesPage implements OnInit {
  
  @ViewChild('popover') popover;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  
  bicycles: any = [];
  bicycleForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";
  newBrand = document.getElementById("newBrand");
  newModel = document.getElementById("newModel");

  constructor(private bicycleService: BicycleService, 
    public formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.getAllBicycles();
  }
  //Get
  getAllBicycles() {
    this.bicycleService.getBicycles().subscribe(bikes => {
      console.log(bikes);
      this.bicycles = bikes;
    })
  }
  //Add
  addBicycle() {
    this.router.navigateByUrl("/add-bicycle");
  }
  // Delete
  deleteBicycle(bicycleId : number) {
    console.log("list bicycles ts delete");
    console.log("Bicycle ID to delete: " + bicycleId);

    this.bicycleService.deleteBicycles(bicycleId).subscribe(
      () => {
        console.log('Bicycle deleted successfully');
      },
      error => {
        console.error('Error deleting bicycle:', error);
      }
    );
    console.log("salida del suscribe list ts");
  }
 
  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }
 
  discardImage() {
    this.capturedPhoto = null;
  }
  //Put
  async updateBicicle(bicycleId : number) {
    console.log("list bicycle update");
  
    var newBrand = document.getElementById("newBrand");
    var newModel = document.getElementById("newModel");
    var blob;
    var oldBrand = "" ;
    var oldModel = "1" ;


    if (newBrand != null && newModel != null && blob != null) {
      console.log("updating");
      this.bicycleService.updateBicycle(newBrand.toString(), newModel.toString(), blob).subscribe(data => {
        console.log("Update succesfull");
        this.router.navigateByUrl("/list-bicycles");
      })
    }

    //Hacer comprobacion de la imagen
    /*
    this.bicycleService.updateBicycle(newBrand.toString(), newModel.toString(), blob).subscribe(data => {
      console.log("Update succesfull");
      this.router.navigateByUrl("/list-bicycles");
    })
    */
  }
}
