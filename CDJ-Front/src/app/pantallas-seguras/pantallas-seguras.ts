import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { ImageLoaderDirective } from '../shared/image-loader/image-loader.directive';

@Component({selector:'app-pantallas-seguras',standalone:true,imports:[CommonModule,RevealDirective,ImageLoaderDirective],changeDetection:ChangeDetectionStrategy.OnPush,templateUrl:'./pantallas-seguras.html'})
export class PantallasSegurasComponent {
  editorial={
    title:'Pantallas Seguras',
    official:'Ley para Garantizar los Derechos de Niñas, Niños y Adolescentes en Entornos Digitales del Estado de Jalisco y sus Municipios',
    explanatory:'Jalisco cuenta con una ley específica para reconocer y proteger los derechos de niñas, niños y adolescentes también en los entornos digitales. La ley aborda acceso, formación, seguridad, privacidad, acompañamiento y uso responsable de la tecnología.',
    note:'“Pantallas Seguras” es la forma en que presentamos este tema dentro del portal; el nombre oficial de la norma es el que aparece arriba.'
  };
  rights=[
    {title:'Acceso y participación',text:'Reconoce el acceso seguro y acompañado a internet y la participación de niñas, niños y adolescentes de acuerdo con su edad y autonomía progresiva.'},
    {title:'Información adecuada a la edad',text:'Establece el derecho a recibir información clara y orientación sobre uso seguro de internet, privacidad, dignidad y seguridad.'},
    {title:'Habilidades digitales',text:'Promueve la formación de competencias para ejercer derechos de manera plena, informada y responsable en entornos digitales.'},
    {title:'Privacidad y protección',text:'Incluye la protección de la vida privada, la seguridad y la prevención de situaciones que puedan vulnerar derechos.'}
  ];
  school=[
    'Programas de alfabetización digital crítica y ciudadanía digital para la comunidad escolar, adaptados a cada nivel.',
    'Protocolos pedagógicos de navegación guiada y acuerdos de convivencia digital en los centros educativos.',
    'Espacios de diálogo sobre usos, riesgos y oportunidades de la tecnología, evitando medidas de control excesivo.',
    'Acompañamiento docente que favorezca pensamiento crítico, autocuidado, seguridad y ejercicio informado de derechos.'
  ];
  families=[
    'Acompañar el acceso a internet de acuerdo con la edad y la autonomía progresiva.',
    'Orientar sobre privacidad, seguridad, respeto y responsabilidad digital.',
    'Establecer acuerdos sobre el uso de dispositivos y tiempos de exposición.',
    'Mantener abierto el diálogo para que pedir ayuda sea una opción segura.'
  ];
}
