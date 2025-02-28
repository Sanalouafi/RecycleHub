import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {CollectionStatus} from "../models/collection-request.model";

export function createCollectionRequestValidator(fb: FormBuilder) {
  const today: string = new Date().toISOString().split('T')[0];
  return fb.group({
    user: [null, Validators.required],
    estimatedWeight: [null, [Validators.required, Validators.min(1)]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    collectionDate: ['', [Validators.required, minDateValidator(today)]],
    timeSlot: ['', [Validators.required, timeSlotValidator]],
    status: [CollectionStatus.PENDING, Validators.required],
    additionalNotes: [''],
    items: fb.array([], validateTotalWeight()),
  })
}

export function timeSlotValidator(control: FormControl) {
  if (!control.value) return null;

  const time = control.value;
  const [hours, minutes] = time.split(':').map(Number);

  if (hours < 9 || (hours === 18 && minutes > 0) || hours > 18) {
    return { invalidTimeSlot: true };
  }
  return null;
}
export function validateTotalWeight(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as FormArray;
    if (!formArray || !formArray.controls) return null;

    const totalWeight = formArray.controls.reduce((sum, control) => {
      return sum + (control.get('weight')?.value || 0);
    }, 0);

    return totalWeight > 10 ? { maxWeightExceeded: true } : null;
  };
}
export function minDateValidator(minDate: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateValue = control.value;
    return dateValue && dateValue < minDate ? {'min': true} : null;
  };
}
