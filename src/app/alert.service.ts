import Swal from 'sweetalert2';

export class AlertService {

  

  constructor() { }

  errorAlert(): any {
    Swal.fire ({
    icon: 'error',
    title: 'Oops...',
    text: 'Lo sentimos, no hay stock de este producto :(',
    footer: '<a href="">Why do I have this issue?</a>'
  })
}
  
   
  
   
}
