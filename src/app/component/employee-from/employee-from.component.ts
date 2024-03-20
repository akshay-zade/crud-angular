import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-from',
  standalone: true,
  imports: [MatInputModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employee-from.component.html',
  styleUrl: './employee-from.component.css'
})
export class EmployeeFromComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route  = inject(ActivatedRoute);
  toaster = inject(ToastrService);
   employeeForm = this.formBuilder.group({
    name: ["",[Validators.required]],
    email: ["",[Validators.required]],
    age:['',[Validators.required]],
    phone: ["",[]],
    salary:['',[Validators.required]]
   })
 
   employeeId!: number;
   isEdit = false;
   ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if(this.employeeId){
      this.isEdit = true;
     this.httpService.getEmployee(this.employeeId).subscribe((result) => {
             console.log(result);
             this.employeeForm.patchValue(result);
             this.employeeForm.controls.email.disable();
      })
    }
   }

   save(){
    console.log(this.employeeForm.value);
    const employee :IEmployee = {
         name : this.employeeForm.value.name!,
         email : this.employeeForm.value.email!,
         age : this.employeeForm.value.age!,
         phone : this.employeeForm.value.phone!,
         salary : this.employeeForm.value.salary!,   
    }
    if(this.isEdit){
      this.httpService.updateEmployee(this.employeeId,employee).subscribe(()=>{
        console.log('successfully');
        this.toaster.success("Record Update Successfully.");
        this.router.navigateByUrl('/employ-list');
      })
    }else{
      this.httpService.createEmployee(employee).subscribe(()=>{
        console.log("Success....")
        this.toaster.success("Record Create Successfully.");
        this.router.navigateByUrl('/employ-list');
      })
    }
  
   }
}
