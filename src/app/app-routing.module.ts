import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesEnum } from './models/routes.enum';
import { HomeComponent } from './pages/home/home.component';
import { LearnedWordsComponent } from './pages/learned-words/learned-words.component';
import { LearningGamesComponent } from './pages/learning-games/learning-games.component';
import { LoginComponent } from './pages/login/login.component';
import { NewWordsSelectionComponent } from './pages/new-words-selection/new-words-selection.component';
import { SelectedWordsComponent } from './pages/selected-words/selected-words.component';
import { FeatureListComponent } from './pages/support/components/feature-list/feature-list.component';
import { QuestionListComponent } from './pages/support/components/question-list/question-list.component';
import { SupportComponent } from './pages/support/support.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesEnum.selectNew,
    pathMatch: 'full',
  },
  {
    canActivate: [AuthGuard],
    path: RoutesEnum.selectNew,
    component: NewWordsSelectionComponent,
  },
  {
    canActivate: [AuthGuard],
    path: RoutesEnum.home,
    component: HomeComponent,
  },
  {
    canActivate: [AuthGuard],
    path: RoutesEnum.selectedWords,
    component: SelectedWordsComponent,
  },
  {
    canActivate: [AuthGuard],
    path: RoutesEnum.learnedWords,
    component: LearnedWordsComponent,
  },
  {
    path: RoutesEnum.login,
    component: LoginComponent,
  },
  {
    canActivate: [AuthGuard],
    path: RoutesEnum.learningGames,
    component: LearningGamesComponent,
  },
  {
    canActivate: [AuthGuard],
    path: RoutesEnum.support,
    component: SupportComponent,
  },
  {
    canActivate: [AuthGuard],
    path: RoutesEnum.featureList,
    component: FeatureListComponent,
  },
  {
    canActivate: [AuthGuard],
    path: RoutesEnum.questionList,
    component: QuestionListComponent,
  },
  {
    path: '**',
    redirectTo: RoutesEnum.home,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
