import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user/user.service";
import {User} from "../../core/models/user.model";
import {UpperCasePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    UpperCasePipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  user?: User | null;
  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }
  loadUser() {
    const userId = localStorage.getItem("userId");

    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
        }
      );
    } else {
      console.warn("Aucun ID utilisateur trouvé dans le localStorage.");
    }
  }
  logout(): void {
    console.log('Logging out...');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}
