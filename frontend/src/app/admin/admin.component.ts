import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private appService:AppService,
              private formBuilder:FormBuilder) { }
  vehicleData:any;
  addVehicle = false;
  usersData:any;
  vehicleCategory:any;
  selectedVehicleCategory='';
  adminRemark='';
  isEdit = false;
  newCharges:any;
  vehicleEntry:any;
  addUser = false;
  updateUser = false;
  addVehicleForm = new FormGroup({
    vehicle_number:new FormControl(),
    parking_lot_number:new FormControl(),
    type:new FormControl(),
    status:new FormControl(),
    charges:new FormControl()
  });
  addUserForm = new FormGroup({
    username:new FormControl(),
    email:new FormControl(),
    password: new FormControl(),
    user_id:new FormControl()
  });
  vehicleCategoryForm = new FormGroup({
    vehicle_category_type: new FormControl(),
  })
  vehicleSearchForm = new FormGroup({
    parking_lot_number:new FormControl(),
  });
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  ngOnInit(): void {
    this.getAllVehicles();
    this.getAllUsers();
    this.getVehicleCategory();
  }

  showVehicleForm(){
    this.addVehicle = true;
  }

  onSubmit():void{
    console.log(this.addVehicleForm.value);
    const vehicleData = this.addVehicleForm.value;
    vehicleData.status = "In";
    vehicleData.type = this.selectedVehicleCategory;
    this.appService.addVehicle(vehicleData).subscribe((result)=>{
    })
    
  }

  onCategorySubmit():void{
    const vehicleCategoryData = this.vehicleCategoryForm.value;
    this.appService.addVehicleCategory(vehicleCategoryData).subscribe((result)=>{
      this.getAllVehicles();
      this.addVehicle = false;
      console.log(result);
      
    })
  }

  cancel(){
    this.addVehicle = false;
   
  }
  cancelEdit(element:any){
    this.vehicleData.forEach((ele:any)=>{
      if(ele.vehicle_id===element.vehicle_id){
        ele.isUpdated = false
      }
    })
    this.isEdit = false;
  }

  getAllVehicles(){
    this.appService.getVehicles().subscribe((result)=>{
      this.vehicleData = result
      this.vehicleData.forEach((element:any) => {
        element['isUpdated'] = false
        element['out_time_display'] = new Date(element.out_time).toTimeString().split('+')[0];
      });

      console.log( this.vehicleData);
      
      
    })
  }
  getAllUsers(){
    this.appService.getuser().subscribe((result)=>{
      console.log(result);
      this.usersData = result
      
    })
  }

  getVehicleCategory(){
    this.appService.getVehicleCategory().subscribe((result)=>{
      this.vehicleCategory = result
    })
  }

  openDialog(element:any){
    this.vehicleData.forEach((ele:any)=>{
      if(ele.vehicle_id===element.vehicle_id){
        ele.isUpdated = true
      }
    })
    this.isEdit = true;
  }
  updateRecord(element:any){

    element['charges'] = this.newCharges;
    element['remark'] = this.adminRemark;
    element['status'] = 'Out';
    
    this.appService.updateVehicle(element).subscribe((result)=>{
      console.log(result);
      this.getAllVehicles();
      
    })
  }
  onSearchSubmit(){
    const parking = this.vehicleSearchForm.value;
    this.appService.searchVehicle(parking.parking_lot_number).subscribe((result)=>{
      this.isEdit = false;
        this.vehicleEntry = result;
        this.vehicleEntry.isUpdated = false;
        console.log(this.vehicleEntry);
    })
    
  }
  downloadReport(){
    console.log(this.vehicleData);
    const range = this.range.value;
    console.log(range);
    
    this.appService.downloadReport(range).subscribe((result)=>{
      console.log(result);
      alert('Report Download successfully!')
      
    })
  }
  onUserFormSubmit(){
    const userData = this.addUserForm.value;
    const userExists = this.usersData.filter((x:any)=>x.email === userData.email);
    if(userExists.length > 0){
      return alert('User Already exists')
    }
    this.appService.addUser(userData).subscribe((result)=>{
      alert('User added successfully')
      this.getAllUsers();
      
    })

  }

  getSelectedUser(user:any){
    console.log(user);
    
    this.addUserForm.setValue({
      username:user.name,
      email:user.email,
      password:user.password,
      user_id:user.user_id
    })
    this.updateUser = true;
    this.addUser = true
  }
  updateUserData(){
    const updateData = this.addUserForm.value;
    this.appService.updateUserData(updateData).subscribe((result)=>{
      alert("user Data Updated Successfully")
      this.getAllUsers();
    })
  }
}
