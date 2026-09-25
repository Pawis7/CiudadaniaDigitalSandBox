import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';

@Component({selector:'app-ayuda',standalone:true,imports:[CommonModule,RouterLink,RevealDirective],changeDetection:ChangeDetectionStrategy.OnPush,templateUrl:'./ayuda.html'})
export class AyudaComponent {
  incidentSteps=[
    {n:'01',title:'Detén la exposición',description:'No respondas bajo presión ni reenvíes el contenido. Si es posible, sal de la conversación, bloquea el contacto o pausa la operación.'},
    {n:'02',title:'Guarda evidencia mínima',description:'Conserva enlaces, usuario, fecha y las capturas indispensables. Evita compartirlas en grupos o con personas que no atenderán el caso.'},
    {n:'03',title:'Busca acompañamiento',description:'Si involucra a una niña, niño o adolescente, informa a una persona adulta responsable. En la escuela, activa la ruta institucional correspondiente.'},
    {n:'04',title:'Protege y reporta',description:'Cambia contraseñas si una cuenta puede estar comprometida, cierra sesiones abiertas y usa los canales de reporte de la plataforma o de la autoridad competente.'}
  ];
  incidentTypes=[
    {title:'Amenazas, acoso o difusión sin permiso',description:'Frena la circulación, conserva evidencia sin volver a exponer a la persona y pide apoyo.'},
    {title:'Fraude, suplantación o cuenta comprometida',description:'No hagas más pagos, verifica por un canal oficial y protege accesos y medios de pago.'},
    {title:'Contacto sexual, chantaje o petición de imágenes',description:'No negocies ni envíes más contenido. Involucra de inmediato a una persona adulta responsable y a la autoridad competente.'}
  ];
  supportChannels=[
    {icon:'emergency',title:'Riesgo inmediato',description:'Si existe peligro físico, amenaza activa o una emergencia, llama al 911.',href:'tel:911',label:'Llamar al 911'},
    {icon:'school',title:'Situación escolar',description:'Informa a dirección, orientación o a la persona responsable del protocolo escolar. Evita resolver el caso en grupos o redes.',href:'',label:''},
    {icon:'support_agent',title:'Contención emocional',description:'La Línea de la Vida brinda orientación y apoyo en el 800 911 2000.',href:'tel:8009112000',label:'Llamar al 800 911 2000'}
  ];
  steps=[
    {n:'01',title:'Elige un perfil',description:'En el menú selecciona Niñas y niños, Adolescentes, Familias o Docentes. El contenido cambia según quién va a utilizarlo.',icon:'person_search'},
    {n:'02',title:'Selecciona la etapa',description:'Dentro del perfil elige el nivel educativo o la edad. Así verás únicamente los recursos pensados para esa etapa.',icon:'filter_alt'},
    {n:'03',title:'Abre una actividad',description:'Entra a una situación, video o recurso. Lee el planteamiento, participa y avanza siguiendo las indicaciones de la pantalla.',icon:'touch_app'},
    {n:'04',title:'Explora a tu ritmo',description:'Puedes volver al perfil, cambiar de etapa o consultar otra actividad cuando quieras. No necesitas seguir un orden único.',icon:'route'}
  ];
  tools=[
    {icon:'menu',title:'Menú lateral',description:'Te lleva al inicio, a los perfiles y a las principales secciones del portal.'},
    {icon:'filter_alt',title:'Cambio de etapa',description:'Dentro de cada perfil puedes cambiar la edad o el nivel educativo para consultar contenidos adecuados a ese contexto.'},
    {icon:'dark_mode',title:'Tema claro u oscuro',description:'El botón de la parte superior cambia la apariencia para que puedas leer con mayor comodidad.'},
    {icon:'devices',title:'Celular, tableta o computadora',description:'El portal se adapta al dispositivo. En celular, abre el menú con el botón de la esquina superior.'}
  ];
  faqs=[
    {q:'¿Tengo que registrarme para explorar?',a:'No. Puedes recorrer los perfiles y consultar los recursos disponibles directamente desde el portal.'},
    {q:'¿Por qué una misma temática cambia según el perfil?',a:'Porque una actividad para una niña o un niño no se trabaja igual que con una familia o con un grupo escolar. El enfoque, las preguntas y el nivel de autonomía se adaptan a cada perfil.'},
    {q:'¿Qué hago si una actividad indica que necesito acompañamiento?',a:'Realízala con una persona adulta de confianza. Algunas experiencias incluyen decisiones sobre privacidad, seguridad, compras o situaciones en las que conviene pedir apoyo.'},
    {q:'¿Esta página sustituye una denuncia o la atención de una emergencia?',a:'No. La orientación del portal ayuda a ordenar los primeros pasos, pero una emergencia, amenaza o posible delito requiere los canales institucionales y autoridades correspondientes.'},
    {q:'¿Puedo usar los materiales en clase o en familia?',a:'Sí. Los perfiles de Docentes y Familias incluyen orientaciones para conversar, acompañar y aprovechar los recursos en esos contextos.'}
  ];
}
