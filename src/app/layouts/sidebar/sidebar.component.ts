import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { User } from "../../core/models/user.model";
import { UserService } from "../../core/services/user/user.service";
import { Role } from "../../core/models/user.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user?: User | null;
  isCollector: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const userId = localStorage.getItem("userId");

    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
          this.isCollector = user.role === Role.COLLECTOR;
        },
        (error) => {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
        }
      );
    } else {
      console.warn("Aucun ID utilisateur trouvé dans le localStorage.");
    }
  }
}
