import { Component, OnInit } from '@angular/core';
import { DataPersona } from 'src/app/shared/interfaces/IDataPersona';
import { DataPersonService } from 'src/app/shared/services/dataPerson.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  nombre = '';
  apellidos = '';
  tipoDocumento = 0;
  fechaNacimiento = '';
  ValorGana = 0;
  estadoCivil = 0;
  listaPersonas:DataPersona[] = []

  constructor(public dataPersonService: DataPersonService) {}

  ngOnInit(): void {
    this.consultarTodasPersonas();
  }

  consultarTodasPersonas() {
    this.dataPersonService.consultarDataPersonas().subscribe({
      next: (data) => {
        this.listaPersonas = data;
      },
      error: (error) => {
        //alert('Error al momento de consultar la información');
      },
    });
  }

  enviarFormulario() {

    if(!this.validarInformacion()) {
      return
    }

    let data: DataPersona = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      tipoDocumento: this.tipoDocumento,
      valorGana: this.ValorGana,
      fechaNacimiento: this.fechaNacimiento,
      estadoCivil: this.estadoCivil,
    };

    this.dataPersonService.guardarInformacionDataPersona(data).subscribe({
      next: (data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Data grabada exitosamente",
          showConfirmButton: false,
          timer: 1500
        });
        this.consultarTodasPersonas();
      },
      error: (error) => {
        this.consultarTodasPersonas();
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al momento de grabar",
          showConfirmButton: false,
          timer: 1500
        });
      },
    });
  }

  validarInformacion() : boolean {
    if(this.nombre.trim() === '') {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Favor introducir nombre",
        showConfirmButton: false,
        timer: 1500
      });      
      return false;
    }
    if(this.apellidos.trim() === '') {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Favor introducir apellido",
        showConfirmButton: false,
        timer: 1500
      });      

      return false;
    }
    if(this.fechaNacimiento.trim() === '') {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Favor introducir fecha nacimiento",
        showConfirmButton: false,
        timer: 1500
      });      

      return false;
    }
    if(this.tipoDocumento=== 0) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Favor introducir tipo documento",
        showConfirmButton: false,
        timer: 1500
      });      

      return false;
    }
    if(this.ValorGana === 0) {
      alert('Favor introducir el valor que gana')
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Favor introducir nombre",
        showConfirmButton: false,
        timer: 1500
      });      

      return false;
    }
    return true;
  }

  capturarNombre(event: Event) {
    const valor = event.target as HTMLInputElement;
    this.nombre = valor.value;
  }

  capturarApellido(event: Event) {
    const valor = event.target as HTMLInputElement;
    this.apellidos = valor.value;
  }
  capturarFecha(event: Event) {
    const valor = event.target as HTMLInputElement;
    this.fechaNacimiento = valor.value;
  }
  capturarSalario(event: Event) {
    const valor = event.target as HTMLInputElement;
    this.ValorGana = Number(valor.value);
  }

  capturarTipoDocumento(event: Event) {
    const valor = event.target as HTMLInputElement;
    this.tipoDocumento = Number(valor.value);
  }
}
