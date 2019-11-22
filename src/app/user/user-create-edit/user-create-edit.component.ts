import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from './../../model/user';


@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.css']
})
export class UserCreateEditComponent implements OnInit {
  userCreationForm;
  adding = true;
  constructor(private route: ActivatedRoute,private userService:UserService, private formBuilder: FormBuilder,private router: Router) { 
    this.userCreationForm = new FormGroup({
      id: new FormControl({value:0}),
      name: new FormControl({value:''}),
      email: new FormControl({value:''})
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      let user = await this.userService.get(+params.get('userId'));
      if(user){
        this.userCreationForm = new FormGroup({
          id: new FormControl({value: user.id, disabled: false}),
          name: new FormControl({value: user.name, disabled:false}),
          email: new FormControl({value: user.email, disabled:false})
        });
        this.adding = false;
      }
    });
  }

  async onSubmit(user : User){
    let response :string = this.adding? await this.userService.add(user):await this.userService.update(user);
    if(response === "success"){
      this.router.navigate(['/'],{queryParams:{addingResult:"success"}});
    } else {
      this.showError();
    }
  }

  showError() {
    alert('Error al guardar el usuario');
  }
}