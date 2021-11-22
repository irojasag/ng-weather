import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { ButtonState } from "app/constants/button-states.contant";
import { Observable } from "rxjs";

@Component({
  selector: "three-states-button",
  templateUrl: "./three-states-button.component.html",
  styleUrls: ["./three-states-button.component.css"],
})
export class ThreeStatesButtonComponent implements OnInit {
  @Input("stateObservable") stateObservable: Observable<ButtonState>;
  public buttonStates = ButtonState;
  constructor() {}

  ngOnInit(): void {}
}
