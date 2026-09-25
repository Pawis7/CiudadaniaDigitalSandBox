import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BAND_LABELS, PROFILE_LABELS, StageDelivery } from './stage-experiences.data';

@Component({
  selector: 'app-experience-conditions', standalone: true, imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="conditions" aria-labelledby="conditions-title" data-experience-conditions>
      <div class="start-box">
        <span class="material-symbols-rounded start-icon" aria-hidden="true" translate="no">verified_user</span>
        <div><h2 id="conditions-title">Antes de empezar</h2><p>No abras un juego ni una red social para resolver el caso. No escribas datos reales ni muestres contraseñas, fotografías o conversaciones personales.</p><p class="essential-meta">Caso ficticio preparado · Sin cuentas personales</p></div>
      </div>
      <p class="accompaniment"><strong>Acompañamiento:</strong> {{ accompaniment() }}.</p>
      @if (delivery().context === 'escuela') {
        <p class="school-note">La persona docente programa y conduce la experiencia conforme a las condiciones del plantel. Puede leerla, proyectarla o imprimirla; no se requiere un celular personal.</p>
      }
      @if (delivery().option.band === 'sec') {
        <div class="age-notes"><p><strong>Antes de los 14 años:</strong> se aprende con casos preparados, sin abrir ni utilizar cuentas de redes sociales.</p><p><strong>Desde los 14 años:</strong> cumplir esa edad no autoriza cualquier servicio. Se revisan sus condiciones y las reglas del contexto de uso.</p><a routerLink="/pantallas-seguras" fragment="redes-sociales">Consultar la disposición sobre redes sociales</a></div>
      }
      <details class="scope"><summary>Condiciones de uso, privacidad y materiales</summary><div class="scope-body">
        <dl><div><dt>Dirigida a</dt><dd>{{ profiles[delivery().option.profile] }} · {{ delivery().option.label }}</dd></div><div><dt>Etapa que se trabaja</dt><dd>{{ bands[delivery().option.band] }}</dd></div><div><dt>Contexto</dt><dd>{{ delivery().context === 'escuela' ? 'Actividad escolar programada' : 'En casa' }}</dd></div><div><dt>Conexión y materiales</dt><dd>Conexión para abrir el portal. Una persona adulta puede imprimir el caso desde su perfil y continuar sin pantalla.</dd></div></dl>
        <p>Las elecciones de este ejercicio no se envían ni se guardan al salir. Esto no es un canal para reportar casos.</p><p>Seleccionar una etapa adapta el contenido; no verifica identidad, recaba consentimiento ni concede permisos de acceso.</p>
      </div></details>
    </section>
  `,
  styles: [`:host{display:block}.conditions{margin:1.3rem 0 1.8rem;color:var(--text-primary)}.start-box{display:grid;grid-template-columns:30px minmax(0,1fr);gap:.9rem;padding:1.2rem 1.4rem;border:1px solid var(--border-strong);border-radius:14px;background:var(--surface-soft)}.start-icon{font-size:28px;color:var(--aud);line-height:1.4}h2{font-size:1.05rem;line-height:1.4;font-weight:700;margin:0 0 .35rem}.start-box p{font-size:.95rem;line-height:1.65;max-width:90ch}.start-box .essential-meta{margin-top:.6rem;font-size:.82rem;color:var(--text-soft)}.accompaniment{font-size:.88rem;margin-top:.8rem;line-height:1.65}.school-note{font-size:.84rem;line-height:1.65;color:var(--text-soft);margin-top:.45rem;max-width:100ch}.age-notes{font-size:.86rem;border-left:3px solid var(--aud);padding:.3rem 0 .3rem 1rem;margin-top:.9rem;line-height:1.6}.age-notes p{margin:.35rem 0}.age-notes a{font-size:.82rem}.scope{margin-top:.7rem;color:var(--text-soft);font-size:.83rem}.scope summary{cursor:pointer;min-height:44px;align-content:center;text-decoration:underline;text-underline-offset:3px}.scope-body{border-top:1px solid var(--border-soft);padding-top:.8rem}.scope-body>p{margin-top:.6rem;max-width:100ch;line-height:1.6}dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.9rem 1.5rem}dt{font-size:.75rem;color:var(--text-soft);margin-bottom:.2rem}dd{color:var(--text-primary);font-size:.86rem;line-height:1.55}a{color:inherit;text-decoration:underline;text-underline-offset:3px}a:focus-visible,summary:focus-visible{outline:3px solid var(--aud);outline-offset:4px}@media(max-width:500px){.start-box{grid-template-columns:24px minmax(0,1fr);gap:.6rem;padding:1rem}.start-icon{font-size:24px}.start-box p{font-size:.91rem}dl{grid-template-columns:1fr}}@media print{.start-box{background:white;border:1px solid #aaa;display:block;padding:.6rem}.start-icon{display:none}.scope{display:none}.age-notes,.conditions{break-inside:avoid}.start-box p,.accompaniment,.school-note,.age-notes{font-size:10pt}a{display:none}}`],
})
export class ExperienceConditionsComponent {
  readonly delivery = input.required<StageDelivery>();
  readonly profiles = PROFILE_LABELS;
  readonly bands = BAND_LABELS;
  accompaniment(): string {
    const { option, context } = this.delivery();
    if (option.profile === 'teachers') return 'Guía docente para acompañar al grupo';
    if (option.profile === 'families') return 'Guía para conversar con la persona acompañada';
    if (context === 'escuela') return 'Mediación docente durante la actividad';
    return option.profile === 'kids' ? 'Una persona adulta presente durante la experiencia' : 'Lectura y decisiones con una persona de apoyo disponible';
  }
}
