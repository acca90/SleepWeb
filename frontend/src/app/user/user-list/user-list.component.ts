import { Component, OnInit } from '@angular/core';
import { UserListService } from './user-list.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    constructor(private userListService: UserListService) { }

    error: any;

    ngOnInit() {
        this.userListService.listUsers().subscribe(
            (items) => {
                this.datatablesInitialize(items);
            },
            (error: any) => this.error = error
        );
    }

    private datatablesInitialize (items) {
        return $('#user-list').DataTable({
            data: items,
            columns: [
                { title: 'Id', data: 'id', width: '60px' },
                { title: 'Name', data: 'name', width: '' },
                { title: 'E-mail', data: 'email', width: '' }
            ]
        });
    }
}



