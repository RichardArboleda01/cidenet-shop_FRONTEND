import { AbstractControl } from '@angular/forms';

export class MyValidation {

    static validPass(password: any) {
        console.log(password);
        
        return (control: AbstractControl) => {
          const value = control.value;
          if (value != password) {
            return {validPass: true};
          }
          return null;
        };
      }
    }