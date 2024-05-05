import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  showSpinner: boolean;

  constructor(private store: Store<AppState>){
    this.showSpinner = false;
  }

  ngAfterViewInit(): void {
    this.store.subscribe((state) => {

      if(state.auth.loading){
        this.showSpinner = true;
      } else if (state.auth.loaded || state.auth.error){
        this.showSpinner = false;
      }
      
      if(state.categories.loading){
        this.showSpinner = true;
      } else if (state.categories.loaded || state.categories.error){
        this.showSpinner = false;
      }

      if(state.posts.loading){
        this.showSpinner = true;
      } else if (state.posts.loaded || state.posts.error){
        this.showSpinner = false;
      }

      if(state.user.loading){
        this.showSpinner = true;
      } else if (state.user.loaded || state.user.error){
        this.showSpinner = false;
      }
    })
  }

}
