import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { getExperience } from './learning-experience.data';
@Component({selector:'app-learning-experience',standalone:true,imports:[RouterLink],templateUrl:'./learning-experience.html',styleUrl:'./learning-experience.css',changeDetection:ChangeDetectionStrategy.OnPush})
export class LearningExperienceComponent{
 private route=inject(ActivatedRoute); private sanitizer=inject(DomSanitizer);
 slug=toSignal(this.route.paramMap.pipe(map(p=>p.get('slug')??'')),{initialValue:''});
 experience=computed(()=>getExperience(this.slug()));
 videoUrl=computed(()=>{const x=this.experience();return x?this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/'+x.videoId):null;});
 sheet=signal<'first'|'post'|null>(null); firstChoice=signal<string|null>(null); postChoice=signal<number|null>(null); actionChoice=signal<string|null>(null);
 open(which:'first'|'post'){this.sheet.set(which);document.body.classList.add('no-scroll');}
 close(){this.sheet.set(null);document.body.classList.remove('no-scroll');}
 chooseFirst(v:string){this.firstChoice.set(v);} choosePost(i:number){this.postChoice.set(i);} chooseAction(v:string){this.actionChoice.set(v);}
}
