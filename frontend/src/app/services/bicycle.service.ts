import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {
  
  endPoint = "http://localhost:8080/api/bicycles";

  constructor(private httpClient: HttpClient) { }
  
  //Get
  getBicycles() {
    return this.httpClient.get(this.endPoint);
  }
  //Add
  createBicycle(bicycle, blob) {
    let formData = new FormData();
    formData.append("brand", bicycle.brand);
    formData.append("model", bicycle.model);
    formData.append("file", blob);

    return this.httpClient.post(this.endPoint, formData);
  }
  //Put
  updateBicycle(bicycleId: string, updatedBicycle: any, blob: Blob | null) {
    console.log("bicycle service update");
    let formData = new FormData();
    formData.append("brand", updatedBicycle.brand);
    formData.append("model", updatedBicycle.model);

    if (blob) {
      formData.append("file", blob);
    }
    return this.httpClient.put(`${this.endPoint}/${bicycleId}`, formData);
  }
  // Delete
  deleteBicycles(bicycleId: number) {
    console.log("bicycle service delete");
    console.log("bicicle to delete id: " + bicycleId);
    return this.httpClient.delete(this.endPoint + "/" + bicycleId);
  }
}
