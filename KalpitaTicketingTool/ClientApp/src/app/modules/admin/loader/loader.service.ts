import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { defer, NEVER } from 'rxjs';
import { finalize, share } from 'rxjs/operators';
import {SpinnerComponentComponent} from '../components/spinner-component/spinner-component.component'

@Injectable({
  providedIn: 'root'
})
export class  LoaderService {
 
public overlayRef?: OverlayRef=undefined ;
  

  constructor(private readonly overlay: Overlay) { }

  public readonly spinner$ = defer(() => {
    this.show();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      })
    );
  }).pipe(share());

  private show(): void {
    // console.log('SpinnerOverlayService ~ show spinner');
 
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
      });
       this.overlayRef.attach(new ComponentPortal(SpinnerComponentComponent));
      // this.overlayRef.attach();
    });
  
}
private hide(): void {
  // console.log('SpinnerOverlayService ~ hide spinner');
  this.overlayRef?.detach();
  this.overlayRef = undefined;
}
}
