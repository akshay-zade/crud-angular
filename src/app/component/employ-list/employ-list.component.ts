import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employ-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,RouterLink],
  templateUrl: './employ-list.component.html',
  styleUrl: './employ-list.component.css'
})
export class EmployListComponent {
  router = inject(Router)
  toaster=inject(ToastrService)
 employeeList:IEmployee[]=[];
 httpservice = inject(HttpService)
 displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'age', 'salary','action'];
 ngOnInit(){
   this.getEmployeeFormServer();
 }
 getEmployeeFormServer(){
  this.httpservice.getAllEmployee().subscribe((result) => {
    this.employeeList=result ;
    console.log(this.employeeList);
   })
 }
 edit(id:number){
    console.log(id);
    this.router.navigateByUrl('/employee/'+id);
 }
 delete(id:number){
  this.httpservice.deleteEmployee(id).subscribe(()=> {
    console.log("deleted")
   this.getEmployeeFormServer();
   this.toaster.success("Record Deleted Successfully.");
  })
 }
}
