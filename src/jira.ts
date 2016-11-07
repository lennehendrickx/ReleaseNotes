import * as request from 'request'
import * as Rx from '@reactivex/rxjs'

export class Jira {
    private readonly apiUrl: string;

    constructor(host: string, private user: string, private pass: string) {
        this.apiUrl = host + '/rest/api/2/';
    }

    getIssue(issue: string): Rx.Observable<Issue> {
        return this.apiCall(ResponseMappers.issueMapper(), 'issue', issue);
    }

    private apiCall<T>(responseMapper: ResponseMapper<T>, method:string, param:string):Rx.Observable<T> {
        return Rx.Observable.create((observer: Rx.Observer<T>) => {
                request.get(this.apiUrl + method + '/' + param,
                    {
                        json: true,
                        auth: {user: this.user, pass: this.pass}
                    }, function (error, response, body) {
                        if (error) {
                            console.log('An error occured: ' + error)
                            observer.error(error);
                        } else {
                            observer.next(responseMapper.map(body));
                            observer.complete();
                        }
                    }
                );
            }
        );
    }
}

export class Issue {
    constructor(public id: string, public key : string, public summary: string) { }
}

interface ResponseMapper<T> {
    map(response:any):T
}

class ResponseMappers {
    static issueMapper():ResponseMapper<Issue> {
        return {
            map(response:any):Issue {
                return new Issue(response.id, response.key, response.fields.summary)
            }
        };
    }
}