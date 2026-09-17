import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContentService } from '../core/services/content.service';

interface SidebarItem { id:string; label:string; icon:string; routerLink:string[]; audience:string; subItems?:{label:string;fragment:string}[]; }
const COLLAPSE_KEY='cdj_sidebar_collapsed';

@Component({selector:'app-sidebar',standalone:true,imports:[CommonModule,RouterLink,RouterLinkActive],changeDetection:ChangeDetectionStrategy.Default,templateUrl:'./sidebar.html',styleUrl:'./sidebar.css'})
export class SidebarComponent {
  @Input() variant:'desktop'|'mobile'='desktop'; @Output() navigate=new EventEmitter<void>();
  private content=inject(ContentService); branding=this.content.branding; collapsed=signal<boolean>(this.readCollapsed()); openedAudience=signal<string|null>(null);
  constructor(){effect(()=>{const isCollapsed=this.collapsed();if(typeof document!=='undefined'&&this.variant==='desktop')document.body.classList.toggle('sidebar-collapsed',isCollapsed)})}
  learnSections:SidebarItem[]=[{id:'home',label:'Inicio',icon:'home',routerLink:['/'],audience:'cdj'}];
  audiences:SidebarItem[]=[
    {id:'kids',label:'Niñas y niños',icon:'child_care',routerLink:['/p','ninas-y-ninos'],audience:'kids',subItems:[{label:'Preescolar',fragment:'preescolar'},{label:'Primaria baja',fragment:'primaria-baja'},{label:'Primaria alta',fragment:'primaria-alta'}]},
    {id:'teens',label:'Adolescentes',icon:'forum',routerLink:['/p','adolescentes'],audience:'teens',subItems:[{label:'Secundaria',fragment:'secundaria'},{label:'Preparatoria',fragment:'preparatoria'}]},
    {id:'families',label:'Familias',icon:'family_restroom',routerLink:['/p','familias'],audience:'families',subItems:[{label:'0–5 años',fragment:'fam-0-5'},{label:'6–11 años',fragment:'fam-6-11'},{label:'12–14 años',fragment:'fam-12-14'},{label:'15–22 años',fragment:'fam-15-22'}]},
    {id:'teachers',label:'Docentes',icon:'school',routerLink:['/p','docentes'],audience:'teachers',subItems:[{label:'Preescolar',fragment:'doc-pre'},{label:'Primaria baja',fragment:'doc-pb'},{label:'Primaria alta',fragment:'doc-pa'},{label:'Secundaria',fragment:'doc-sec'},{label:'Preparatoria',fragment:'doc-prep'}]}
  ];
  helpSections:SidebarItem[]=[
    {id:'pantallas-seguras',label:'Pantallas Seguras',icon:'screenshot_monitor',routerLink:['/pantallas-seguras'],audience:'screens'},
    {id:'ayuda',label:'Ayuda',icon:'help',routerLink:['/ayuda'],audience:'help'},
    {id:'quienes',label:'Quiénes somos',icon:'groups',routerLink:['/quienes-somos'],audience:'cdj'}
  ];
  toggleCollapse(){this.collapsed.update(v=>!v);this.persistCollapsed();if(this.collapsed())this.openedAudience.set(null)}
  toggleAudience(id:string,ev:Event){ev.stopPropagation();this.openedAudience.update(curr=>curr===id?null:id)}
  onNavigate(){this.openedAudience.set(null);this.navigate.emit()} onSubitemClick(){this.navigate.emit()}
  private readCollapsed():boolean{if(typeof localStorage==='undefined')return false;return localStorage.getItem(COLLAPSE_KEY)==='1'}
  private persistCollapsed(){try{if(this.collapsed())localStorage.setItem(COLLAPSE_KEY,'1');else localStorage.removeItem(COLLAPSE_KEY)}catch{}}
}
