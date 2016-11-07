import {Jira, Issue} from "./jira";
import * as Rx from '@reactivex/rxjs'

export class ReleaseNotes {
    constructor(private jira:Jira) { }

    forVersion():void {
        Rx.Observable.fromPromise(this.jira.getIssue('FRAME-939'))
            .forEach((issue: Issue) => {
                return console.log(issue.summary);
            });
    }
}