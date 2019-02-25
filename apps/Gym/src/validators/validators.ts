import { FormControl } from "@angular/forms";

export class MyValidators{

  static checkPhoneSize(control: FormControl) {
    const value: string = control.value;
    if (value && value.length > 7) {
      return {
        'phoneSize': true
      }
    }
    return null;
  }
  

  static checkCellPhoneSize(control: FormControl) {
    const value: string = control.value;
    if (value && value.length > 10) {
      return {
        'cellPhoneSize': true
      }
    }
    return null;
  }

}