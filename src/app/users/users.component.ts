import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { UsersService } from 'src/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{


  constructor(private userService : UsersService,private router : Router ){}
  users : User[] | undefined;
  user : User = new User();


  private getUsers(){
    this.userService.getUsersList().subscribe(data => {
    this.users = data;
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngSubmit(){
    this.createUser();
  }

  createUser(){
    this.userService.createUser(this.user).subscribe(data=>{
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'User Created Successfully!',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      }).then((result)=>{
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    });
      }

      deleteUser(id : number|undefined){
        this.userService.deleteUser(id).subscribe(data =>{
          console.log(data);
          window.location.reload();
        });
      }
}
