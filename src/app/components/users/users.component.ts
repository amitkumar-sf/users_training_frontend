import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { deepCopy } from '@angular-devkit/core/src/utils/object';
import { User } from '../../interfaces/userInterface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayText: string = 'Load data';
  showTable: boolean = false;
  loading: boolean = false;
  users: User[] = [];
  defaultUsers: User[] = [];
  indexArray: boolean[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
  loadFunction(): void {
    console.log('Inside loadFunction');
    this.displayText = 'Refresh data';
    this.showTable = true;
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.users.length = 0;
    this.userService.getUsers().subscribe((res) => {
      console.log('List of users', res);
      this.loading = false;
      this.users = res;
      this.makeNewArray(res);
      this.makeAllTrues(this.users.length);
    });
  }

  makeAllTrues(len: number): void {
    this.indexArray = [];
    while (len--) {
      this.indexArray.push(true);
    }
  }

  makeNewArray(users: User[]): void {
    this.defaultUsers.length = 0;
    users.forEach((user) => {
      let newObj = deepCopy(user);
      this.defaultUsers.push(newObj);
    });
  }

  editUsers(index: number): void {
    this.indexArray[index] = false;
  }

  deleteUser(index: number): void {
    this.deleteAPI(this.users[index]?.id);
    this.users.splice(index, 1);
    this.defaultUsers.splice(index, 1);
    this.indexArray.splice(index, 1);
  }

  saveUsers(index: number): void {
    const editUser = this.users[index];
    this.saveUsersAPI(editUser);
    this.indexArray[index] = true;
  }

  saveUsersAPI(user: User): void {
    user.modified_on = new Date();
    this.userService.editUserDetails(user, user.id).subscribe((res) => {
      console.log('checking response of edit ', res);
    });
  }

  deleteAPI(id: number): void{
    this.userService.deleteUser(id).subscribe((res) => {
      console.log('checking response of edit ', res);
    });
  }

  cancelUsers(index: number): void {
    this.users.splice(index, 1, deepCopy(this.defaultUsers[index]));
    this.indexArray[index] = true;
  }
}
