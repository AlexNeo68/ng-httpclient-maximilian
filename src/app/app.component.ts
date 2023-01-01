import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-http';

  private errorSubscription: Subscription;

  loadedPosts: Post[] = [];

  isFetching: boolean = false;

  error: string;

  constructor(private postService: PostService) {}

  @ViewChild('postForm') postForm: NgForm;

  ngOnInit() {
    this.fetchPosts();
    this.errorSubscription = this.postService.error.subscribe(
      (error) => (this.error = error)
    );
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postService.store(postData.title, postData.content);
    this.postForm.reset();
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.isFetching = true;
    this.postService.destroy().subscribe(() => {
      this.loadedPosts = [];
      this.isFetching = false;
    });
  }

  fetchPosts() {
    this.isFetching = true;
    this.postService.index().subscribe(
      (posts: Post[]) => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      (error) => {
        this.error = error.message;
        this.isFetching = false;
      }
    );
  }

  onHandleError() {
    this.error = '';
  }
}
