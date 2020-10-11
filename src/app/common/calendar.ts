import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Calendar {
    public toDate(dateStr:string) {
        if (dateStr == "" || dateStr == null) return "";
        return new Date(dateStr).toLocaleString();
    }
    public toGeoDate(dateStr:string) {
        if (dateStr == "" || dateStr == null) return "";

        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleString("ka-GE",options);
    }
}
