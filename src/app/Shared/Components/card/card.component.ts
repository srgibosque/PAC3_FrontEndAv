import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostDTO } from 'src/app/Post/models/post.dto';
import { PostService } from 'src/app/Post/services/post.service';
import { SharedService } from '../../Services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() post!: PostDTO;
  @Output() onLikeEvent: EventEmitter<string> = new EventEmitter();
  @Output() onDislikeEvent: EventEmitter<string> = new EventEmitter();
  showButtons: boolean;

  constructor(private store: Store<AppState>){
    this.showButtons = false;

    this.store.select('auth').subscribe((auth) => {
      this.showButtons = false;

      if (auth.credentials.access_token) {
        this.showButtons = true;
      }
    });
  }

  ngOnInit(){}

  onLike(){
    this.onLikeEvent.emit(this.post.postId);
  }

  onDislike(){
    this.onDislikeEvent.emit(this.post.postId);
  }

}
