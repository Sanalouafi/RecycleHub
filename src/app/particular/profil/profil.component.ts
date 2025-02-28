import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../core/models/user.model';
import { UserService } from "../../core/services/user/user.service";
import { SidebarComponent } from "../../layouts/sidebar/sidebar.component";
import { NavbarComponent } from "../../layouts/navbar/navbar.component";
import { NgIf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profil',
  standalone: true,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  imports: [
    SidebarComponent,
    NavbarComponent,
    NgIf,
    ReactiveFormsModule
  ]
})
export class ProfilComponent implements OnInit {
  user?: User;
  profileForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder,
              private router : Router) {}

  ngOnInit() {
    this.initForm();
    this.loadUser();
  }

  initForm() {
    this.profileForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      city: [''],
      birthDate: [''],
    });
  }

  loadUser() {
    const userId = localStorage.getItem("userId");

    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
          this.profileForm.patchValue(user);
          this.userService.setUser(user);
        },
        (error) => {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
        }
      );
    } else {
      console.warn("Aucun ID utilisateur trouvé dans le localStorage.");
    }
  }

  updateProfile() {
    if (this.profileForm.valid && this.user && this.user.id !== undefined) {
      this.userService.updateUser(this.user.id, this.profileForm.value).subscribe(
        (updatedUser) => {
          console.log("Profil mis jour avec succes :", updatedUser);
        },
        (error) => {
          console.error("Erreur:", error);
        }
      );
    } else {
      console.warn("ID utilisateur invalide.");
    }
  }
  deleteProfile() {
    if (confirm("Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible !")) {
      const userId = this.user?.id;

      if (userId !== undefined) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            alert("Profil supprimé avec succès.");
            console.log("Utilisateur supprimé avec succès.");
            this.router.navigate(['/register']);
          },
          (error) => {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
            alert("Une erreur est survenue lors de la suppression du profil.");
          }
        );
      } else {
        console.warn("Impossible de supprimer : ID utilisateur invalide.");
        alert("ID utilisateur invalide.");
      }
    }
  }


}
