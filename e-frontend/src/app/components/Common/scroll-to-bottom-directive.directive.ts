import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[scrollToBottom]',
  standalone: true
})
export class ScrollToBottomDirectiveDirective implements AfterViewInit, OnDestroy {

  private mutationObserver: MutationObserver;

  constructor(private el: ElementRef) {
    this.mutationObserver = new MutationObserver(() => {
      this.scrollToBottom();
    });
  }

  ngAfterViewInit() {
    const config = { childList: true };
    this.mutationObserver.observe(this.el.nativeElement, config);
    this.scrollToBottom(); // Por si acaso el contenido inicial es demasiado largo
  }

  ngOnDestroy() {
    this.mutationObserver.disconnect();
  }

  private scrollToBottom() {
    this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
  }

}
