import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  myCustomNumbersSubscription: Subscription;
  myCustomObservableSubscription: Subscription;

  constructor() { }

  ngOnInit() {

    const myNumbers = Observable.interval(1000)
      .map(
        (data : number)=> {
          return data * 2;
        }
      );

    this.myCustomNumbersSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create(

      (observer: Observer<string>) => {

        setTimeout(() => {
            observer.next('First Package');
        }, 2000);

        setTimeout(() => {
            observer.next('Second Package');
        }, 4000);

        setTimeout(() => {
            // observer.error('This does not work');
            observer.complete();
        }, 5000);

        setTimeout(() => {
            // observer.error('This does not work');
            observer.complete();
        }, 6000);

      }
    ); // END OF create


    this.myCustomObservableSubscription = myObservable.subscribe(

      (data: string) => {
        console.log(data);
      },

      (error: string) => {
        console.error(error);
      },

      () => {
        console.log('Completed');
      }

    );

  }

  ngOnDestroy() {
    this.myCustomNumbersSubscription.unsubscribe();
    this.myCustomObservableSubscription.unsubscribe();
  }

}
