import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './../../validators/validators';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  /**
  * @param formularioUsuario Rastrea el valor y el estado de validez de un grupo de instancias de FormControl.
  * Un FormGroup agrega los valores de cada FormControl hijo en un objeto, con cada nombre de control como la clave.
  * Calcula su estatus reduciendo los estatus de sus hijos. Por ejemplo, si uno de los controles de un grupo no es
  * válido, todo el grupo se convierte en no válido.
  * FormGroup es uno de los tres bloques de construcción fundamentales utilizados para definir formularios en Angular,
  * junto con FormControl y FormArray.
  */
  formularioUsuario: FormGroup;

  constructor(
    private alertCtrl: AlertController,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  /**
   * evento que se ejecuta al enviar la informacion, este solo cumple la funcion de mostrar un mensaje de informacion,
   * resetea el formulario y sus validaciones y limpia el parametro datosUsuario para el nuevo ingreso de informacion.
   */
  saveData() {
    console.log(this.formularioUsuario.value);
    const alert = this.alertCtrl.create({
      title: "Datos enviados!",
      subTitle: "Información",
      message: "Los registros fueron enviados correctamente",
      buttons: ['Ok']
    });
    alert.present()
    this.buildForm();
  }


  buildForm() {
    /**
     * @description Asignamos a la propiedad "formularioUsuario" los campos que se van a controlar de la vista
     */
    this.formularioUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email]],
      tipo_contacto: ['Telefono', [Validators.required]],
      numero_contacto: ['', [Validators.required, MyValidators.checkPhoneSize]]
    });

    this.formularioUsuario.get('tipo_contacto')
      .valueChanges
      .subscribe(value => {
        console.log(value);
        if (value === 'Telefono') {
          const validators = [Validators.required, MyValidators.checkPhoneSize];
          this.formularioUsuario.get('numero_contacto').setValidators(validators);
        } else {
          const validators = [Validators.required, MyValidators.checkCellPhoneSize];
          this.formularioUsuario.get('numero_contacto').setValidators(validators);
        }
        this.formularioUsuario.updateValueAndValidity();
      });
  }
}
