import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../shared/post.model';
import { Subscription } from 'rxjs/Subscription';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  q = null;
  posts: Post[];
  sub: Subscription;

  constructor(private postService: PostService) {
  }

  search() {
    this.sub = this.postService.getPosts({ q: this.q })
    .subscribe(
      data => this.posts = data,
      err => console.log(err)
    );
  }

  searchByTerm($event) {
    console.log('search by term:' + $event);
    this.updateTerm($event);
    this.search();
  }

  updateTerm($event) {
    console.log('update term:' + $event);
    this.q = $event;
  }

  clearTerm($event) {
    console.log('clear term:' + $event);
    this.q = null;
  }

  ngOnInit() {
    console.log('calling ngOnInit::PostListComponent');
    this.search();
  }

  ngOnDestroy() {
    console.log('calling ngOnDestroy::PostListComponent');
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
