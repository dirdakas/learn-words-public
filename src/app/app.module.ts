import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnglishDetailsComponent } from './components/english-details/english-details.component';
import { HeaderComponent } from './components/header/header.component';
import { LithuanianDetailsComponent } from './components/lithuanian-details/lithuanian-details.component';
import { LoaderModule } from './components/loader/loader.module';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { WordActionsComponent } from './components/word-actions/word-actions.component';
import { WordDetailsComponent } from './components/word-details/word-details.component';
import { HomeModule } from './pages/home/home.module';
import { LearnedWordsModule } from './pages/learned-words/learned-words.module';
import { LearningGamesModule } from './pages/learning-games/learning-games.module';
import { LoginModule } from './pages/login/login.module';
import { NewWordsSelectionModule } from './pages/new-words-selection/new-words-selection.module';
import { SelectedWordsModule } from './pages/selected-words/selected-words.module';
import { SupportModule } from './pages/support/support.module';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WordActionsComponent,
    WordDetailsComponent,
    EnglishDetailsComponent,
    LithuanianDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NewWordsSelectionModule,
    SelectedWordsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    LoaderModule,
    HttpClientModule,
    LoginModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatTabsModule,
    MatRippleModule,
    MatDialogModule,
    MatDividerModule,
    LearnedWordsModule,
    LearningGamesModule,
    HomeModule,
    SupportModule,
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
