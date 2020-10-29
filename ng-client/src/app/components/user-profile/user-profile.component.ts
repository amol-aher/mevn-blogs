import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  public currentUser = {
    name: '',
    email: ''
  }

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    this.authService.getProfile().subscribe(res => {
      console.log(res)
      this.currentUser = res;
    })
  }

  ngOnInit() { }
}