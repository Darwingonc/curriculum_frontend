import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators, AbstractControl, FormBuilder} from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';

import {deserialize, JsonApiResponse, serialize} from 'jsonapi-fractal';
import {formatDate} from '@angular/common';
// import {Alert} from '../../../interfaces/alert';

/* Servicios */
// import {UsersService} from 'src/app/services/users/users.service';
// import {StatusesService} from 'src/app/services/statuses/statuses.service';
// import {AlertsService} from 'src/app/services/alerts/alerts.service';
// import {CountriesService} from '../../../services/countries/countries.service';
// import {StatesService} from '../../../services/states/states.service';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

    private statusActive: any;
    private password: any;
    private countryUuid: any;

    public token: any;
    public id: any;
    public identity: any;
    public strongPassword: any = 0;
    public strongPasswordColor: any;
    public showInstructions = false;
    public loading = false;
    public lengthColor: any;
    public numberColor: any;
    public lowerColor: any;
    public upperColor: any;
    public symbolColor: any;
    public show = false;
    // public alert: Alert;
    public countries: any;
    public states: any;
    public cities: any;


    informacionBasica = new FormGroup({
        /*información básica*/
        nombre: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        apellido: new FormControl('', Validators.required ),
        telefono: new FormControl('', Validators.required ),
        correo: new FormControl('', [
            Validators.required,
            Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
        nacimiento: new FormControl('', Validators.required),
        genero: new FormControl('', Validators.required),
        nacionalidad: new FormControl('', Validators.required),
        ocupacion: new FormControl('', Validators.required),
        descripcion: new FormControl('', Validators.required),
        pais: new FormControl('', Validators.required),
        estado: new FormControl('' , Validators.required),
        ciudad: new FormControl('', Validators.required),
    });



  constructor(
      private usuarioServicio: UsuarioService,
      private deviceService: DeviceDetectorService,
      private activatedRouter: ActivatedRoute,
      // private alertService: AlertsService,
      private formBuilder: FormBuilder,
      // private statusesService: StatusesService,
      private router: Router,
      // private countriesService: CountriesService,
      // private statesService: StatesService,
  ) { }

  ngOnInit(): void {

  }

    submitForm(form): void {
        const data = {
            nombre: form.nombre,
            apellido: form.apellido,
            telefono: form.telefono,
            correo: form.correo,
            password: form.password,
            nacimiento: form.nacimiento,
            genero: form.genero,
            nacionalidad: form.nacionalidad,
            ocupacion: form.ocupacion,
            descripcion: form.descripcion,
            pais: form.pais,
            estado: form.estado,
            ciudad: form.ciudad,
        };
        this.usuarioServicio.registro(data).then((query: any) => {
                if (query.ok){
                    console.log(query);
                    this.token = query.token;
                    this.id = query.data.id;
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('id', this.id);
                    this.router.navigate(['modificar-perfil']);
                } else{
                    alert('ocurrió un error');
                }
            }
        );
    }



    checkStrength(event): void {
        this.password = event.target.value;

        // 1
        let force = 0;

        // 2
        const lowerLetters = this.passwordLowerLetter(this.password);
        const upperLetters = this.passwordUpperLetter(this.password);
        const numbers = this.passwordNumber(this.password);
        const symbols = this.passwordSymbol(this.password);
        const length = this.passwordLength(this.password);

        // 3
        const flags = [lowerLetters, upperLetters, numbers, symbols, length];

        // 4
        let passedMatches = 0;

        for (const flag of flags) {
            passedMatches += flag === true ? 1 : 0;

        }

        // 5
        force += 2 * this.password.length + ((this.password.length >= 10) ? 1 : 0);
        force += passedMatches * 10;

        // 6
        force = this.password.length ? this.password.length <= 5 ? 20 : force : 0;

        // 7
        force = (passedMatches === 1) ? this.checkPassedMatches(passedMatches) : force;
        force = (passedMatches === 2) ? this.checkPassedMatches(passedMatches) : force;
        force = (passedMatches === 3) ? this.checkPassedMatches(passedMatches) : force;
        force = (passedMatches === 4) ? this.checkPassedMatches(passedMatches) : force;
        force = (passedMatches === 5) ? this.checkPassedMatches(passedMatches) : force;

        this.strongPassword = force;
    }

    checkPassedMatches(passedMatches): number {
        switch (passedMatches) {
            case 1:
                this.strongPasswordColor = 'danger';
                return 20;
            case 2:
                this.strongPasswordColor = 'danger';
                return 40;
            case 3:
                this.strongPasswordColor = 'warning';
                return 60;
            case 4:
                this.strongPasswordColor = 'success';
                return 80;
            case 5:
                this.strongPasswordColor = 'success';
                return 100;
        }
    }

    checkPasswords(group: FormGroup): { notSame: true } {
        const password = group.get('password').value;
        const confirmPassword = group.get('password_confirmation').value;
        return password === confirmPassword ? null : { notSame: true };
    }

    passwordLowerLetter(password): boolean {
        if (/[a-z]+/.test(password)) {
            this.lowerColor = true;
            return true;
        } else {
            this.lowerColor = false;
            return false;
        }
    }

    passwordUpperLetter(password): boolean {
        if (/[A-Z]+/.test(password)) {
            this.upperColor = true;
            return true;
        } else {
            this.upperColor = false;
            return false;
        }
    }

    passwordNumber(password): boolean {
        if (/[0-9]+/.test(password)) {
            this.numberColor = true;
            return true;
        } else {
            this.numberColor = false;
            return false;
        }
    }

    passwordSymbol(password): boolean {
        const regex = /[$-/:-?{-~!"^_#@`\[\]]/g;
        if (regex.test(password)) {
            this.symbolColor = true;
            return true;
        } else {
            this.symbolColor = false;
            return false;
        }
    }

    passwordLength(password): boolean {
        if (password.length >= 6) {
            this.lengthColor = true;
            return true;
        } else {
            this.lengthColor = false;
            return false;
        }
    }

    toggleInstructions(): void {
        this.showInstructions = true;
    }

    get passwordConfirmation(): AbstractControl {
        return this.informacionBasica.get('password_confirmation');
    }

    get password2(): AbstractControl {
      return this.informacionBasica.get('password');
    }


}
