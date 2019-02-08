import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListService } from './user-list/user-list.service';
import { UserFormService } from './user-form/user-form.service';

@NgModule({
    declarations: [UserListComponent, UserFormComponent],
    imports: [
        CommonModule,
        UserRoutingModule
    ],
    providers: [
        UserListService,
        UserFormService
    ]
})
export class UserModule { }
