import { Directive, Input, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[hoverer]'
})

export class HtmlTableDirective {
  @HostBinding('style.background') backgroundColor: string;

  constructor() { }

  @HostListener('mouseover') onMouseOver() {
    this.backgroundColor = 'red';
  }

  @HostListener('mouseout') onMouseOut() {
    this.backgroundColor = 'none';
  }
}
