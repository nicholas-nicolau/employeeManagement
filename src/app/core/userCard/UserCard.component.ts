import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { User } from "src/app/model/user.model";

@Component({
    templateUrl:'./UserCard.component.html',
    selector: 'app-user-card',
    styleUrls:['./UserCard.component.css']
})

export class UserCard {
    @Input() src:string
    @Input() name:string
    @Input() email:string
    @Input() phoneNumber:string
}