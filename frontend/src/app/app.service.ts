import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  uri = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  getVehicles(){
    return this.http.get(`${this.uri}/vehicle`);
  }

  getVehiclebyId(id:any){
    return this.http.get(`${this.uri}/vehicle/${id}`);
  }

  addVehicle(data:any){
    return this.http.post(`${this.uri}/vehicle`,data);
  }

  updateVehicle(data:any){
    return this.http.patch(`${this.uri}/vehicle`,data)
  }

  searchVehicle(id:any){
    return this.http.get(`${this.uri}/vehicle/search/${id}`);
  }

  getVehicleCategory(){
    return this.http.get(`${this.uri}/vehicle/category`);
  }
  addVehicleCategory(data:any){
    return this.http.post(`${this.uri}/vehicle/category`,data);
  }

  downloadReport(data:any){
    return this.http.post(`${this.uri}/vehicle/download`,data)
  }
  getuser(){
    return this.http.get(`${this.uri}/user`);
  }
  
  addUser(data:any){
    return this.http.post(`${this.uri}/user`,data);
  }
  updateUserData(data:any){
    return this.http.patch(`${this.uri}/user`,data);
  }
}
