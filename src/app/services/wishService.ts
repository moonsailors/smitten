import { Injectable } from '@angular/core';
import { ApiService } from './apiService';

@Injectable()
export class WishService {
  path: string = '/wishes';
  constructor(private apiService: ApiService) {}

  createWish(wish) {
    return this.apiService.post(this.path, wish);
  }

  getRelationshipWishes(email: string) {
    return this.apiService.get(`${this.path}/relationship/${email}`);
  }

  getUserWishes(email: string) {
    return this.apiService.get(`${this.path}/user/${email}`);
  }

  deleteWish(wishId: string) {
    return this.apiService.delete(`${this.path}/${wishId}`);
  }

  updateWish(wishId: string, params) {
    return this.apiService.put(`${this.path}/${wishId}`, params);
  }
}
