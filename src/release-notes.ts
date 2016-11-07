import {Jira, Issue} from "./jira";

export class ReleaseNotes {
    constructor(private jira:Jira) { }

    forVersion():void {
        this.jira.getIssue('FRAME-939')
            .forEach((issue: Issue) => {
                return console.log(issue.summary);
            });
    }
}