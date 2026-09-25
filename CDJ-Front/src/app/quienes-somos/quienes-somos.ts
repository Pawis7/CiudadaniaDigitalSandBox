import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { ImageLoaderDirective } from '../shared/image-loader/image-loader.directive';

@Component({selector:'app-quienes-somos',standalone:true,imports:[CommonModule,RouterLink,RevealDirective,ImageLoaderDirective],changeDetection:ChangeDetectionStrategy.OnPush,templateUrl:'./quienes-somos.html',styleUrl:'./quienes-somos.css'})
export class QuienesSomosComponent {
  editorial={
    title:'Quiénes somos',
    brief:'Ciudadanía Digital para la comunidad educativa de Jalisco.',
    explanatory:'Ciudadanía Digital es un espacio de la Secretaría de Educación Jalisco que reúne experiencias, orientaciones y recursos para aprender a usar la tecnología de manera segura, crítica, responsable y saludable.',
    alfaTitle:'Alfa Digital',
    alfaText:'La Dirección de Alfabetización Digital, conocida como Alfa Digital, depende de la Dirección General de Programas Estratégicos de la Secretaría de Educación Jalisco. Su trabajo impulsa el aprovechamiento educativo de las tecnologías, el desarrollo de habilidades digitales, la innovación, la robótica y la producción de recursos multimedia para apoyar a estudiantes, docentes y comunidades escolares.',
    alfaPortal:'Este portal se integra a esa labor: convertir la ciudadanía digital en experiencias prácticas para niñas, niños, adolescentes, familias y docentes, con contenidos adecuados a cada etapa.',
  };

  audiences=[
    {title:'Niñas, niños y adolescentes',description:'Actividades y recursos adaptados a su edad y autonomía para aprender a decidir, cuidarse y pedir ayuda cuando sea necesario.'},
    {title:'Familias',description:'Orientaciones para acompañar la vida digital con diálogo, acuerdos y autonomía progresiva.'},
    {title:'Docentes',description:'Situaciones y recursos para trabajar ciudadanía digital desde el aula y abrir conversaciones con el grupo.'}
  ];
}
