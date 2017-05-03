import {Component, ViewChild, OnInit} from '@angular/core';
import {DayPilot} from 'daypilot-pro-angular';
import {DataService} from './data.service';

@Component({
    selector: 'app',
    providers: [ DataService ],
    template: `
        <h1>{{name}}</h1>
        <daypilot-scheduler [events]="events" [config]="config" #scheduler1></daypilot-scheduler>
        `
})
export class AppComponent implements OnInit {
    name: string;
    last: number = 1;
    @ViewChild('scheduler1') scheduler1: DayPilot.Angular.Scheduler;
    jorge : string;
    events: any[];

    config: any = {
                               
        timeHeaders: [
          { groupBy: "Month", format: "MMMM yyyy" },
          { groupBy: "Day", format: "d" }
        ],
        scale: "Day",
        startDate: "2016-09-01",
        days: 365,
        bubble: new DayPilot.Bubble(),
        resources: [],
        events : [
                    {
                        start: new DayPilot.Date("2016-09-02T00:00:00"),
                        end: new DayPilot.Date("2016-09-02T00:00:00"),
                        id: 1208089310982301,
                        resource: "B",
                        text: "One-Day Event",
                        bubbleHtml: "Details"
                    }
                 ],
        treeEnabled: true,
        onEventMove: args => {
            let data = {
                id: args.e.id(),
                newStart: args.newStart.toString(),
                newEnd: args.newEnd.toString(),
                newResource: args.newResource
            };

            this.ds.moveEvent(data).subscribe(result => {
                this.scheduler1.control.message("Updated");
            });
        },
        onEventResize: args => {
            let data = {
                id: args.e.id(),
                newStart: args.newStart.toString(),
                newEnd: args.newEnd.toString(),
                newResource: args.e.resource()  // existing resource id
            };

            this.ds.moveEvent(data).subscribe(result => {
                this.scheduler1.control.message("Updated");
            });
        },
        onTimeRangeSelect: args => {
            var name = prompt("Event name: ", "New event");
            if (!name) {
                return;
            }
            this.scheduler1.control.clearSelection();
            var e = {
                id: null,
                start: args.start.toString(),
                end: args.end.toString(),
                text: name,
                resource: args.resource
            };

            this.ds.createEvent(e).subscribe(result => {
                e.id = result.id;
                this.events.push(e);
                this.scheduler1.control.message("Created");
            });
        }
    };

    constructor(private ds: DataService) {
        this.name = 'Scheduler';
    }

    ngOnInit(){
        //this.ds.getEvents().subscribe(data => this.events = data);
        this.ds.getResources().subscribe(data =>  this.config.resources = data);
        
    }

}