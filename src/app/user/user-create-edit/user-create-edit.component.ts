import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from './../../model/user';


@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.css']
})
export class UserCreateEditComponent {
  userCreationForm;
  constructor(private userService:UserService, private formBuilder: FormBuilder,private router: Router) { 
    this.userCreationForm = this.formBuilder.group({
      id:0,
      name:'',
      email:''
    });
  }

  async onSubmit(user : User){
    let response :string = await this.userService.add();
    if(response === "success"){
      this.router.navigate(['/','success'])
    } else {
      this.showError();
    }
  }

  showError() {
    alert('Error al guardar el usuario');
  }
}