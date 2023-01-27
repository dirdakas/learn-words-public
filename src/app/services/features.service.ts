import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export enum FeatureStatus {
  new = 'new',
  seen = 'seen',
  implemented = 'implemented',
  rejected = 'rejected',
  inProgress = 'inProgress',
}

export interface IFeature {
  userId: string;
  description: string;
  status: FeatureStatus;
}

const ASK_FEATURE_KEY: string = 'ask-feature';

@Injectable({
  providedIn: 'root',
})
export class FeaturesService {

  constructor(private fireStore: AngularFirestore, private authService: AuthService) {}

  askForNewFeature(description: string): Observable<any> {
    return from(
      this.fireStore.collection(ASK_FEATURE_KEY).add({
        userId: this.authService.getCurrentUser().userId,
        description,
        status: FeatureStatus.new,
      })
    );
  }

  getAllFeatureRequests(): Observable<IFeature[]> {
    return this.fireStore
      .collection(ASK_FEATURE_KEY)
      .valueChanges()
      .pipe(
        map((data) => [...data] as IFeature[])
      );
  }
}
