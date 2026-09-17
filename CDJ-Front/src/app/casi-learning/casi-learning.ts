import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ContentService } from '../core/services/content.service';
import { VideoItem } from '../core/models/content.models';

type CasiProfile = 'pb'|'pa'|'families'|'teachers';

const GUIDES: Record<CasiProfile,{label:string;intro:string;before:string;after:string;action:string}> = {
  pb:{label:'Primaria baja',intro:'Historias breves para reconocer cuándo algo en internet puede convertirse en un problema y practicar una respuesta segura con apoyo adulto cuando haga falta.',before:'¿Qué crees que está a punto de pasar?',after:'¿Qué señal de alerta viste y a quién pedirías ayuda?',action:'Elige una regla sencilla que puedas recordar la próxima vez.'},
  pa:{label:'Primaria alta',intro:'Historias para detenerse antes de compartir, descargar, comprar o responder y tomar decisiones con mayor autonomía.',before:'¿Qué decisión podría cambiar la historia?',after:'¿Qué habrías hecho tú y por qué?',action:'Convierte lo aprendido en una decisión concreta para tu vida digital.'},
  families:{label:'Familias',intro:'Una serie para abrir conversaciones sin sermones: mirar juntos, escuchar primero y construir acuerdos acordes con la edad.',before:'Antes de reproducirlo, pregunta qué creen que puede pasar.',after:'Escucha su respuesta antes de explicar qué harías tú.',action:'Cierren con un acuerdo familiar breve y posible de cumplir.'},
  teachers:{label:'Docentes',intro:'Cada episodio funciona como detonador de una conversación de aula sobre riesgos, convivencia, pensamiento crítico y autocuidado digital.',before:'Presenta el dilema sin adelantar la respuesta.',after:'Pide al grupo identificar señales, consecuencias y alternativas.',action:'Cierra con una regla, decisión o producto breve construido por el grupo.'},
};

@Component({selector:'app-casi-learning',standalone:true,imports:[CommonModule,RouterLink],templateUrl:'./casi-learning.html',styleUrl:'./casi-learning.css',changeDetection:ChangeDetectionStrategy.OnPush})
export class CasiLearningComponent {
  private content=inject(ContentService); private sanitizer=inject(DomSanitizer); private route=inject(ActivatedRoute);
  private q=toSignal(this.route.queryParamMap.pipe(map(p=>p.get('perfil'))),{initialValue:null});
  profile=signal<CasiProfile>('pb');
  serie=computed(()=>this.content.getSeriesBySlug('el-dia-que-casi'));
  videos=computed(()=>this.serie()?.videos??[]);
  guide=computed(()=>GUIDES[this.profile()]);
  selected=signal<VideoItem|null>(null);
  playlistUrl=computed(()=>this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/videoseries?list='+(this.serie()?.youtubePlaylistId??'PL6UhGvZdF4uhkptPgZt5UpoFiK1WQyig4')));
  videoUrl=computed(()=>{const v=this.selected(); if(!v)return this.playlistUrl(); const id=this.videoId(v.youtubeUrl); return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/'+id+'?rel=0');});
  constructor(){const raw=this.q(); if(raw==='pa'||raw==='families'||raw==='teachers')this.profile.set(raw);}
  setProfile(p:CasiProfile){this.profile.set(p)}
  play(v:VideoItem){this.selected.set(v); window.scrollTo({top:0,behavior:'smooth'});}
  showPlaylist(){this.selected.set(null)}
  private videoId(url:string){try{return new URL(url).searchParams.get('v')??''}catch{return ''}}
}
