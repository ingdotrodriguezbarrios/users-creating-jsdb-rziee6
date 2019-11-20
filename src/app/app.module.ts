import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { FontAwesomeModule,FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrash,faEdit,faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserService } from "./services/user.service";
import { UserlistComponent } from "./user/userlist/userlist.component";
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserCreateEditComponent } from './user/user-create-edit/user-create-edit.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { AppComponent } from './app/app.component';

@NgModule({
   imports: [
    BrowserModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: UserlistComponent },
      { path: 'user/:userId', component: UserDetailComponent },
      { path: 'userAdd/:userId', component: UserCreateEditComponent },
      { path: 'userAdd', component: UserCreateEditComponent }
    ])
  ],
  declarations: [UserlistComponent, UserDetailComponent, UserCreateEditComponent, UserDeleteComponent, AppComponent],
  bootstrap: [AppComponent],
  providers: [UserService]
})
export class AppModule {
   constructor(private library: FaIconLibrary) {
    library.addIcons(faTrash, faEdit, faSearch);
  }
}
