import { Component } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
})
export class OverlayComponent {
  mostrar() {
    const overlayElement = document.querySelector('.overlay') as HTMLElement;
    overlayElement.style.display = 'block';
  }
}
