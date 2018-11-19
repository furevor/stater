import { Component, OnInit } from '@angular/core';
import { ItemsState } from '../../assets/item.state.interface';
import { Observable } from 'rxjs';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  state$: Observable<ItemsState>;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.state$ = this.stateService.getState();
    this.state$.subscribe(state => {
      console.log('This is your app state', state);
    });
  }

}
