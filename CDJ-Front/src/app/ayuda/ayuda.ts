import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';

@Component({selector:'app-ayuda',standalone:true,imports:[CommonModule,RouterLink,RevealDirective],changeDetection:ChangeDetectionStrategy.OnPush,templateUrl:'./ayuda.html'})
export class AyudaComponent {
  steps=[
    {n:'01',title:'Elige un perfil',description:'En el menú selecciona Niñas y niños, Adolescentes, Familias o Docentes. El contenido cambia según quién va a utilizarlo.',icon:'person_search'},
    {n:'02',title:'Selecciona la etapa',description:'Dentro del perfil elige el nivel educativo o la edad. Así verás únicamente los recursos pensados para esa etapa.',icon:'filter_alt'},
    {n:'03',title:'Abre una actividad',description:'Entra a una situación, video o recurso. Lee el planteamiento, participa y avanza siguiendo las indicaciones de la pantalla.',icon:'touch_app'},
    {n:'04',title:'Explora a tu ritmo',description:'Puedes volver al perfil, cambiar de etapa o consultar otra actividad cuando quieras. No necesitas seguir un orden único.',icon:'route'}
  ];
  tools=[
    {icon:'menu',title:'Menú lateral',description:'Te lleva al inicio, a los perfiles y a las principales secciones del portal.'},
    {icon:'search',title:'Buscar',description:'Úsalo para localizar temas, recursos, videos o actividades sin recorrer todo el portal.'},
    {icon:'dark_mode',title:'Tema claro u oscuro',description:'El botón de la parte superior cambia la apariencia para que puedas leer con mayor comodidad.'},
    {icon:'devices',title:'Celular, tableta o computadora',description:'El portal se adapta al dispositivo. En celular, abre el menú con el botón de la esquina superior.'}
  ];
  faqs=[
    {q:'¿Tengo que registrarme para explorar?',a:'No. Puedes recorrer los perfiles y consultar los recursos disponibles directamente desde el portal.'},
    {q:'¿Por qué una misma temática cambia según el perfil?',a:'Porque una actividad para una niña o un niño no se trabaja igual que con una familia o con un grupo escolar. El enfoque, las preguntas y el nivel de autonomía se adaptan a cada perfil.'},
    {q:'¿Qué hago si una actividad indica que necesito acompañamiento?',a:'Realízala con una persona adulta de confianza. Algunas experiencias incluyen decisiones sobre privacidad, seguridad, compras o situaciones en las que conviene pedir apoyo.'},
    {q:'¿Puedo usar los materiales en clase o en familia?',a:'Sí. Los perfiles de Docentes y Familias incluyen orientaciones para conversar, acompañar y aprovechar los recursos en esos contextos.'}
  ];
}
