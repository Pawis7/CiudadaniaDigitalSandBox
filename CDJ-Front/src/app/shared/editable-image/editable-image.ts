import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageEditService } from '../../core/services/image-edit.service';

@Component({
  selector: 'app-editable-image',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './editable-image.html',
  styleUrl: './editable-image.css',
})
export class EditableImageComponent {
  protected svc = inject(ImageEditService);

  private _id = signal<string>('');
  private _src = signal<string>('');
  private _alt = signal<string>('');
  private _imgClass = signal<string>('');
  private _width = signal<number | undefined>(undefined);
  private _height = signal<number | undefined>(undefined);
  private _aspectLabel = signal<string | undefined>(undefined);
  private _eager = signal<boolean>(false);

  @Input({ required: true }) set id(v: string) { this._id.set(v); }
  @Input({ required: true }) set src(v: string) { this._src.set(v); }
  @Input() set alt(v: string) { this._alt.set(v); }
  @Input() set imgClass(v: string) { this._imgClass.set(v); }
  @Input() set width(v: number | undefined) { this._width.set(v); }
  @Input() set height(v: number | undefined) { this._height.set(v); }
  @Input() set aspectLabel(v: string | undefined) { this._aspectLabel.set(v); }
  @Input() set eager(v: boolean) { this._eager.set(v); }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  uploading = signal(false);
  errorMsg = signal<string | null>(null);

  resolvedSrc = computed(() => this.svc.getOverride(this._id()) ?? this._src());
  hasOverride = computed(() => !!this.svc.getOverride(this._id()));
  editMode = this.svc.editMode;

  get displayId() { return this._id(); }
  get alt$() { return this._alt(); }
  get imgClass$() { return this._imgClass(); }
  get loadingAttr() { return this._eager() ? 'eager' : 'lazy'; }
  get widthLabel() {
    const w = this._width(), h = this._height();
    if (w && h) return `${w} × ${h}px`;
    return null;
  }
  get aspect() { return this._aspectLabel(); }

  pickFile() {
    this.errorMsg.set(null);
    this.fileInput?.nativeElement?.click();
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.errorMsg.set('Selecciona un archivo de imagen.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.errorMsg.set('La imagen pesa más de 5 MB.');
      return;
    }

    this.uploading.set(true);
    try {
      const dataUrl = await this.fileToDataUrl(file);
      this.svc.setOverride(this._id(), dataUrl);
    } catch {
      this.errorMsg.set('No se pudo leer la imagen.');
    } finally {
      this.uploading.set(false);
      if (input) input.value = '';
    }
  }

  reset() {
    this.svc.clearOverride(this._id());
  }

  private fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
}
