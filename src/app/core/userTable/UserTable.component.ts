import { Component, Injectable, OnInit } from "@angular/core";
import { User } from "src/app/model/user.model";
import { UserTableService } from "./UserTable.service";

@Injectable({
    providedIn: 'root'
})

@Component({
    templateUrl: './UserTable.component.html',
    styleUrls: ['./UserTable.component.css']
})

export class UserTable implements OnInit {

    constructor(private userTableService: UserTableService) { }

    _employess: User[]
    filteredEmployees: User[] = []
    _filterBy: string
    employeeString: string
    ArrayFilterBy: string[]

    currentPage: number = 1
    totalOfPages: number
    limitPerPage: number

    arrayIndex:User

    dateFormat: string[]

    ngOnInit(): void {
        this._employess = this.userTableService.retrieveAll()
        this.filteredEmployees = this._employess
        this.setLimitEqualEmployeeAmount(this.filteredEmployees.length)
        this.setTotalOfPages(this.filteredEmployees.length, this.limitPerPage)
    }

    set filter(value: string) {
        this._filterBy = value
        this.filteredEmployees = this._employess.filter((employee: User) => this.filterByAllFields(employee, this._filterBy))
        this.setLimitEqualEmployeeAmount(this.filteredEmployees.length)
        this.setTotalOfPages(this.filteredEmployees.length, this.limitPerPage)
        this.currentPage = 1
    }

    get filter() {
        return this._filterBy
    }

    set amountToDisplay(value: number) {
        if (value <= this.filteredEmployees.length) this.limitPerPage = value
        this.setTotalOfPages(this.filteredEmployees.length, this.limitPerPage)
        this.currentPage = 1
    }

    get amountToDisplay() {
        return this.limitPerPage
    }

    deleteById(id: number) {
        this.userTableService.deleteById(id)
        this.filteredEmployees = this._employess
        this.setTotalOfPages(this.filteredEmployees.length, this.limitPerPage)
    }

    filterByAllFields(employee: User,
        filterBy: string) {
        this.employeeString = Object.values(employee).toString().replace(',', '').toLocaleLowerCase()
        this.ArrayFilterBy = filterBy.toLocaleLowerCase().split(" ")
        for (let counter = 0; counter < this.ArrayFilterBy.length; counter++) {
            if (this.employeeString.indexOf(this.ArrayFilterBy[counter]) == -1) return false
        }
        return true
    }

    setLimitEqualEmployeeAmount(value: number) {
        value > 10 ? this.limitPerPage = 10 : this.limitPerPage = value
    }

    setTotalOfPages(numberOfEmployees: number, limitPerPage: number) {
        numberOfEmployees == 0 ? this.totalOfPages = 0 : this.totalOfPages = Math.ceil(numberOfEmployees / limitPerPage)
    }

    nextPage() {
        if ((this.currentPage + 1) <= this.totalOfPages) this.currentPage += 1
    }

    previousPage() {
        if ((this.currentPage - 1) != 0) this.currentPage -= 1
    }

    showElement(iterator: number) {
        if (Math.floor(iterator / this.limitPerPage) == (this.currentPage - 1)) return true
        return false
    }

    retrieveFilteredEmployees() {
        return this.filteredEmployees
    }

    fixingDateFormat(date: string) {
        if (date.indexOf('/') > -1) return date
        this.dateFormat = date.split('-')
        return this.dateFormat[2] + '/' + this.dateFormat[1] + '/' + this.dateFormat[0]
    }
}