import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  posts: PostDTO[];
  numLikes: number;
  numDislikes: number;
  chart!: Chart

  constructor(private store: Store<AppState>) {
    this.posts = new Array<PostDTO>();
    this.numLikes = 0;
    this.numDislikes = 0;
  }

  ngOnInit(): void {
    this.loadPosts();
    const data = {
      labels: ["Likes", "Dislikes"],
      datasets: [{
        axis: 'y',
        label: 'Number of likes',
        data: [0, 0],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(54, 162, 235, 0.5)',
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1
      }]
    };

    this.chart = new Chart("likesChart", {
      type: "bar" as ChartType,
      data: data,
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
      this.numLikes = 0;
      this.numDislikes = 0;
      this.posts.forEach((post) => {
        this.numLikes = this.numLikes + post.num_likes;
        this.numDislikes = this.numDislikes + post.num_dislikes;
      });

      this.chart.data.datasets[0].data = [this.numLikes, this.numDislikes];
      this.chart.update();
    });

  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }
}
