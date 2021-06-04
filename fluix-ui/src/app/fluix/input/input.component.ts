import { Directive, HostBinding, OnInit, Optional } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Directive({
  selector: 'input[fxInput], textarea[fxInput]',
})
export class FluixInputDirective implements OnInit {
  private _control!: FormControl;
  private _isSearch!: boolean;
  private _isTextArea!: boolean;
  private _label!: string;
  private _outline!: boolean;

  @HostBinding('class')
  public className = 'fx-input';

  constructor(@Optional() control: NgControl) {
    console.log(control);
  }

  @HostBinding('class.fx-input-outline')
  public get outline() {
    return this._outline;
  }

  @HostBinding('class.fx-input-valid')
  public get valid() {
    return true;
  }

  @HostBinding('class.fx-input-invalid')
  public get invalid() {
    return;
  }

  ngOnInit(): void {}
}
