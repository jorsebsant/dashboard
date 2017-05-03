import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import {DayPilot} from 'daypilot-pro-angular';

@Injectable()
export class DataService {

    constructor(private http : Http){
    }

    getEvents(): Observable<any[]> {
        let body = JSON.stringify({
            start: "2016-09-01T00:00:00",
            end: "2016-09-30T00:00:00",
        });

        return this.http.post("backend_events.php", body).map((response:Response) => response.json());
    }

    getResources(): Observable<any[]> {
        
        return this.http.get("backend_resources.php").map((response:Response) => response.json());
    }

    createEvent(data: any): Observable<DataResponse> {
        let body = JSON.stringify(data);
        return this.http.post("backend_create.php", body).map((response:Response) => response.json());
    }

    moveEvent(data: any): Observable<DataResponse> {
        let body = JSON.stringify(data);
        return this.http.post("backend_move.php", body).map((response:Response) => response.json());
    }

}

export interface DataResponse {
    result: string;
    id?: number;
    message?: string;
}
