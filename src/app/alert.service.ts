import Swal from 'sweetalert2';

export class AlertService {



  constructor() { }

  errorAlert(): any {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Lo sentimos, no tenemos unidades disponibles de este producto :(',
    })
  }
}
