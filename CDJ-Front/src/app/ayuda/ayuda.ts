import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ayuda.html',
})
export class AyudaComponent {
  editorial = {
    title: 'Ayuda Digital',
    brief: 'Orientación ante riesgos y violencia digital.',
    explanatory: 'Si algo en internet te preocupa, te amenaza, te expone o afecta tu bienestar, es importante actuar con calma y pedir apoyo. Esta sección ayuda a reconocer situaciones frecuentes, conservar información útil y ubicar canales de orientación o atención cuando sea necesario.',
    stepsTitle: 'Qué hacer primero',
    stepsSubtitle: 'Tres pasos clave ante una situación de riesgo digital',
    situationsTitle: 'Situaciones frecuentes',
    situationsSubtitle: 'Reconoce el problema para saber cómo actuar',
    channelsTitle: 'Instancias y canales de atención',
    channelsSubtitle: 'Si una situación digital te preocupa, no tienes que resolverla sola o solo. Identifica a qué instancia acudir según el tipo de riesgo.'
  };

  steps = [
    {
      step: '01',
      title: 'Conserva evidencia',
      description: 'Guarda capturas, enlaces, mensajes o cualquier información que pueda ayudar a entender lo ocurrido.',
      icon: 'file_save'
    },
    {
      step: '02',
      title: 'Busca apoyo',
      description: 'Habla con una persona de confianza, familiar, docente, orientador o institución de apoyo.',
      icon: 'contact_support'
    },
    {
      step: '03',
      title: 'Reporta o denuncia',
      description: 'Utiliza los canales adecuados para que las autoridades puedan orientarte y dar seguimiento.',
      icon: 'campaign'
    }
  ];

  situations = [
    {
      title: 'Ciberacoso y violencia digital',
      description: 'Insultos, amenazas, humillaciones o presión a través de medios digitales.',
      icon: 'gavel',
      bgClass: 'bg-rose-500',
      shadowClass: 'shadow-rose-100'
    },
    {
      title: 'Fraudes y engaños en línea',
      description: 'Estafas, suplantación u ofertas falsas para obtener dinero o información.',
      icon: 'credit_card_off',
      bgClass: 'bg-orange-500',
      shadowClass: 'shadow-orange-100'
    },
    {
      title: 'Robo de identidad y privacidad',
      description: 'Uso indebido de datos personales para suplantarte o afectarte.',
      icon: 'badge',
      bgClass: 'bg-amber-500',
      shadowClass: 'shadow-amber-100'
    },
    {
      title: 'Difusión no consentida',
      description: 'Compartir fotos, videos o información privada sin permiso.',
      icon: 'no_photography',
      bgClass: 'bg-pink-600',
      shadowClass: 'shadow-pink-100'
    },
    {
      title: 'Grooming y riesgos para menores',
      description: 'Adultos que buscan ganarse la confianza de menores para obtener favores o encuentros.',
      icon: 'warning',
      bgClass: 'bg-red-600',
      shadowClass: 'shadow-red-100'
    },
    {
      title: 'Contenido dañino o amenazante',
      description: 'Mensajes, imágenes o retos que pueden afectar tu seguridad o bienestar.',
      icon: 'person_off',
      bgClass: 'bg-violet-600',
      shadowClass: 'shadow-violet-100'
    }
  ];

  categories = [
    {
      id: 'c1',
      title: '1. Emergencia y riesgo inmediato',
      bgHeader: 'bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30',
      textHeader: 'text-rose-700 dark:text-rose-400',
      iconHeader: 'emergency',
      items: [
        {
          name: '911 Emergencias',
          level: 'Estatal / nacional',
          whenToUse: 'Si hay peligro inmediato, amenaza en curso, agresión, riesgo físico, violencia sexual, extorsión activa o una situación que requiera intervención urgente.',
          contacts: [
            { type: 'phone', label: 'Llamar al 911', value: '911', btnClass: 'bg-rose-600 hover:bg-rose-700 text-white' }
          ]
        },
        {
          name: 'Código Violeta / Red de Centros de Justicia para las Mujeres Jalisco',
          level: 'Jalisco',
          whenToUse: 'Violencia contra mujeres, agresión, amenazas, acoso, difusión no consentida de imágenes, violencia de pareja o riesgo urgente con componente digital o presencial.',
          contacts: [
            { type: 'phone', label: 'Pedir Código Violeta (911)', value: '911', btnClass: 'bg-rose-600 hover:bg-rose-700 text-white' },
            { type: 'whatsapp', label: 'Chatbot Violeta (WhatsApp)', value: '3314151002', btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
            { type: 'phone', label: 'Llamar', value: '3336681880', btnClass: 'bg-slate-700 hover:bg-slate-800 text-white' },
            { type: 'info', label: 'Atención 24/7 en Centros de Justicia para las Mujeres', value: '', btnClass: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 pointer-events-none' }
          ]
        }
      ]
    },
    {
      id: 'c2',
      title: '2. Orientación y reporte cibernético',
      bgHeader: 'bg-sky-50 border-sky-100 dark:bg-sky-950/20 dark:border-sky-900/30',
      textHeader: 'text-sky-700 dark:text-sky-400',
      iconHeader: 'policy',
      items: [
        {
          name: 'Policía Cibernética de Jalisco',
          level: 'Jalisco',
          whenToUse: 'Orientación sobre fraudes digitales, suplantación, acoso digital, amenazas por redes, cuentas falsas, extorsión digital, reclutamiento en línea, phishing o incidentes tecnológicos.',
          contacts: [
            { type: 'web', label: 'Ver sitio oficial', value: 'https://fiscalia.jalisco.gob.mx/policia-cibernetica', btnClass: 'bg-sky-600 hover:bg-sky-700 text-white' },
            { type: 'email', label: 'policia.cibernetica@jalisco.gob.mx', value: 'policia.cibernetica@jalisco.gob.mx', btnClass: 'bg-slate-700 hover:bg-slate-800 text-white' },
            { type: 'phone', label: 'Prevención del Delito (Ext. 15878)', value: '3338376000,15878', btnClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200' },
            { type: 'phone', label: 'Policía Cibernética (Ext. 15832)', value: '3338376000,15832', btnClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200' }
          ]
        }
      ]
    },
    {
      id: 'c3',
      title: '3. Protección de niñas, niños y adolescentes',
      bgHeader: 'bg-violet-50 border-violet-100 dark:bg-violet-950/20 dark:border-violet-900/30',
      textHeader: 'text-violet-700 dark:text-violet-400',
      iconHeader: 'child_care',
      items: [
        {
          name: 'Procuraduría de Protección de Niñas, Niños y Adolescentes (PPNNA)',
          level: 'Jalisco',
          whenToUse: 'Casos de vulneración de derechos de niñas, niños y adolescentes relacionadas con situaciones digitales que los vulneren o pongan en riesgo.',
          contacts: [
            { type: 'phone', label: 'Teléfono (Ext. 7001/7005)', value: '3330308200', btnClass: 'bg-violet-600 hover:bg-violet-700 text-white' },
            { type: 'info', label: 'Dirección: Av. Américas 599, piso 10, Torre Cuauhtémoc, Col. Ladrón de Guevara, GDL', value: '', btnClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 pointer-events-none' }
          ]
        }
      ]
    },
    {
      id: 'c4',
      title: '4. Violencia digital contra mujeres y difusión no consentida',
      bgHeader: 'bg-purple-50 border-purple-100 dark:bg-purple-950/20 dark:border-purple-900/30',
      textHeader: 'text-purple-700 dark:text-purple-400',
      iconHeader: 'female',
      items: [
        {
          name: 'Red de Centros de Justicia para las Mujeres Jalisco',
          level: 'Jalisco',
          whenToUse: 'Difusión no consentida de imágenes íntimas, amenazas, acoso, control digital, violencia de pareja, extorsión sexual o cualquier forma de violencia contra mujeres.',
          contacts: [
            { type: 'phone', label: 'Llamar al Centro de Justicia para las Mujeres', value: '3336681880', btnClass: 'bg-purple-600 hover:bg-purple-700 text-white' },
            { type: 'whatsapp', label: 'Chatbot Violeta (WhatsApp)', value: '3314151002', btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
            { type: 'phone', label: 'Emergencias Código Violeta (911)', value: '911', btnClass: 'bg-rose-600 hover:bg-rose-700 text-white' },
            { type: 'info', label: 'Atención 24/7 en sedes del Centro de Justicia para las Mujeres', value: '', btnClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 pointer-events-none' }
          ]
        }
      ]
    },
    {
      id: 'c5',
      title: '5. Denuncia y seguimiento penal',
      bgHeader: 'bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30',
      textHeader: 'text-amber-700 dark:text-amber-400',
      iconHeader: 'gavel',
      items: [
        {
          name: 'Fiscalía del Estado de Jalisco / Ministerio Público',
          level: 'Jalisco',
          whenToUse: 'Denuncia penal por amenazas, extorsión, acoso, difusión no consentida, fraude, suplantación de identidad, violencia digital u otros delitos.',
          contacts: [
            { type: 'phone', label: 'Llamar a Fiscalía', value: '3338376000', btnClass: 'bg-amber-600 hover:bg-amber-700 text-white' },
            { type: 'web', label: 'Sitio Web de la Fiscalía', value: 'https://fiscalia.jalisco.gob.mx/inicio', btnClass: 'bg-slate-700 hover:bg-slate-800 text-white' }
          ]
        }
      ]
    }
  ];

  cleanPhone(phone: string): string {
    return phone.replace(/[^0-9+]/g, '');
  }
}
