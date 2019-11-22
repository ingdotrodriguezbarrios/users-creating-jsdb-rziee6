import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from './../../model/user';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  userList : User[];
  
  constructor(private route: ActivatedRoute, private userService:UserService) { }

  async ngOnInit() {
    this.userList = await this.userService.loadUserList();
    this.route.queryParamMap.subscribe( params => {
      let addingResult = params.get('addingResult');
      if(addingResult === 'success')
        alert('Usuario guardado correctamente');
    });
  }

  async delete(idUserDeleting) {
    if(confirm("Está segunro de eliminar este usuario")){
      let result = await this.userService.delete(idUserDeleting);
      if(result === 'success'){
        alert('Usuario eliminado correctamente');
        this.userList = await this.userService.loadUserList();
      }
    }
  }
}