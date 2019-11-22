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
  idUserDeleting:number;
  
  constructor(private route: ActivatedRoute, private userService:UserService) { }

  async ngOnInit() {
    this.userList = await this.userService.loadUserList();
    this.route.queryParamMap.subscribe( params => {
      let addingResult = params.get('addingResult');
      if(addingResult === 'success')
        alert('Usuario añadido correctamente');
    });
  }

  goDelete(idUserDeleting) {
    this.idUserDeleting = idUserDeleting;
  }
}