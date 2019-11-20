import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { User } from './../../model/user';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  userList : User[];
  
  constructor(private userService:UserService) { }

  async ngOnInit() {
    this.userList = await this.userService.loadUserList();
  }
}