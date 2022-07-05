import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/model/user.model";
import { UserTableService } from "../userTable/UserTable.service";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    templateUrl: './UserInputFields.component.html',
    styleUrls: ['./UserInputFields.component.css']
})



export class UserFileds implements OnInit {
    userId: number
    action: string
    dateWrongFormat: string[]
    employeeToRefresh: User = {
        name: "",
        birthDate: "",
        department: "",
        email: "",
        imageUrl: "",
        phoneNumber: "",
        role: "",
        id:-1
    }
    constructor(private activatedRoute: ActivatedRoute, private userTableService: UserTableService) { }

    ngOnInit(): void {
        this.userId = +this.activatedRoute.snapshot.paramMap.get('id')!
        this.userId == -1 ? this.action = "Add new" : this.action = "Edit"
        this.userId == -1 ? console.log("Add user") : this.fixingDateFormat(this.userTableService.retrieveById(this.userId)!)
        console.log()
    }

    fixingDateFormat(employee: User) {
        if (employee.birthDate.indexOf('/') > -1) {
            employee.birthDate = employee.birthDate.substring(6, 10) + '-' + employee.birthDate.substring(3, 5) + '-' + employee.birthDate.substring(0, 2)
        }
        this.employeeToRefresh = employee
    }
    hdlClick() {
        if (this.action == "Edit") {
            this.generateUserObject()
            this.userTableService.updateEmployee(this.userId, this.employeeToRefresh)
        } else {
            this.generateUserObject()
            this.userTableService.addNewEmployee(this.employeeToRefresh)
        }
    }

    generateUserObject() {
        this.employeeToRefresh.name = (document.getElementById("name") as HTMLInputElement).value
        this.dateWrongFormat = (document.getElementById("birthDate") as HTMLInputElement).value.toString().split('-')
        this.employeeToRefresh.birthDate = this.dateWrongFormat[2] + '/' + this.dateWrongFormat[1] + '/' + this.dateWrongFormat[0]
        this.employeeToRefresh.department = (document.getElementById("department") as HTMLInputElement).value
        this.employeeToRefresh.email = (document.getElementById("email") as HTMLInputElement).value
        this.employeeToRefresh.imageUrl = (document.getElementById("imageUrl") as HTMLInputElement).value
        this.employeeToRefresh.phoneNumber = (document.getElementById("phoneNumber") as HTMLInputElement).value
        this.employeeToRefresh.role = (document.getElementById("role") as HTMLInputElement).value
        this.employeeToRefresh.id = this.userId
    }
}