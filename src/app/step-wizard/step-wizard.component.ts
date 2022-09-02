import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-step-wizard',
  templateUrl: 'step-wizard.component.html'
})
export class StepWizardComponent implements AfterViewInit {

  @Input() steps: number;
  @Input() active = 0;
  @Output() changes = new EventEmitter();

  private iterableSteps: Array<number>;

  constructor() { }

  ngAfterViewInit() {
    this.iterableSteps = Array.from(Array(this.steps), (x, i) => i);
  }

  goToStep(step) {
    this.active = step;
    this.changes.emit(this.active);
  }

}
