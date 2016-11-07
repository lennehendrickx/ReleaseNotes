import {ReleaseNotes} from "./release-notes";
import {Jira} from "./jira";

let jira = new Jira('thegluesolutions.atlassian.net', 'USERNAME', 'PASSWORD');
new ReleaseNotes(jira).forVersion();