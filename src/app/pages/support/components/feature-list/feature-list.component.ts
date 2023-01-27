import { Component, OnInit } from '@angular/core';
import { finalize, take, tap } from 'rxjs/operators';
import { FeaturesService, IFeature } from './../../../../services/features.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
})
export class FeatureListComponent implements OnInit {
  featureList: IFeature[] = [];
  isLoading = true;

  constructor(private featuresService: FeaturesService) {}

  ngOnInit(): void {
    this.featuresService
      .getAllFeatureRequests()
      .pipe(
        take(1),
        tap((list) => (this.featureList = list)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }
}
