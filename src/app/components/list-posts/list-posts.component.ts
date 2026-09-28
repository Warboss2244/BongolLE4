import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {
  posts?: Post[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.http.get<Post[]>('https://localhost:7170/api/Post')
      .subscribe({
        next: (data: Post[]) => {
          this.posts = data;
          console.log(this.posts);
        }
      });
  }
}