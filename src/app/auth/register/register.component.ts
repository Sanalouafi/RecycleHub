import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { AuthActions } from "../../core/stores/auth/auth.actions";
import { Role } from "../../core/models/user.model";
import { NgIf } from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  registerForm: FormGroup;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder, private store: Store) {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      address: [""],
      city: [""],
      phone: [""],
      birthDate: ["", Validators.required],
      profilePicture: [null],
      role: [Role.PARTICULAR],
      createdAt: new Date().toISOString().split("T")[0],
    });


  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.registerForm.patchValue({ profilePicture: file });
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        address: this.registerForm.value.address || "",
        city: this.registerForm.value.city || "",
        phone: this.registerForm.value.phone || "",
        birthDate: this.registerForm.value.birthDate,
        role: this.registerForm.value.role,
        createdAt: this.registerForm.value.createdAt,
        profilePicture: this.registerForm.value.profilePicture ? this.registerForm.value.profilePicture.name : null
      };
      this.store.dispatch(AuthActions.registerUser({ user }));
    }
  }
}
