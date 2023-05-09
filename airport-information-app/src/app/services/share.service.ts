import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor() {}

  public sharedIataCode: any = 'DUB';
  public status: boolean = false;
}
