import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from './../../model/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  constructor(private route: ActivatedRoute,private userService:UserService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.user = await this.userService.get(+params.get('userId'));
    });
  }

}