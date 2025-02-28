import {FormBuilder, Validators} from "@angular/forms";

export function createLoginValidator(fb: FormBuilder) {
  return fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });
}
