import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'PhoneFormat'
})

export class PhoneFormat implements PipeTransform {
    areaCode:string
    firstFourDigits:string
    lastFourDigits:string

    transform(value: string) { 
        this.areaCode = value.substring(0,2)
        this.firstFourDigits = value.substring(2,6)
        this.lastFourDigits = value.substring(6,10)
        return '(' + this.areaCode +') ' + this.firstFourDigits + '-' + this.lastFourDigits
    }

}