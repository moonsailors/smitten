import { Injectable } from '@angular/core';
import { ApiService } from './apiService';

@Injectable()
export class PostService {
  path: string = '/api/posts';
  constructor(private apiService: ApiService) {}

  createPost(email, post) {
    return this.apiService.post(`${this.path}/${email}`, post);
  }

  getRelationshipPosts(email: string) {
    return this.apiService.get(`${this.path}/relationship/${email}`);
  }

  // getUserPosts(email: string) {
  //   return this.apiService.get(`${this.path}/user/${email}`);
  // }

  updatePost(postId: string, params) {
    return this.apiService.put(`${this.path}/${postId}`, params);
  }

  deletePost(postId: string) {
    return this.apiService.delete(`${this.path}/${postId}`);
  }
}
