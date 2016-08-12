import { Injectable } from '@angular/core';
import { ApiService } from './apiService';

@Injectable()
export class PostService {
  path: string = '/api/posts';
  constructor(private apiService: ApiService) {}

  createPost(post, email) {
    return this.apiService.post(`${this.path}/${email}`, post)
      .subscribe(res => console.log(res));
  }

  getRelationshipPosts(email: string) {
    return this.apiService.get(`${this.path}/relationship/${email}`);
  }

  getUserPosts(email: string) {
    return this.apiService.get(`${this.path}/user/${email}`);
  }

  deletePost(postId: string) {
    return this.apiService.delete(`${this.path}/${postId}`);
  }

  updatePost(postId: string, params) {
    return this.apiService.put(`${this.path}/${postId}`, params);
  }
}
