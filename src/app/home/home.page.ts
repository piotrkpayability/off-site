import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';

interface Message {
  author: string;
  message: string;
  timestamp: any;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  messages: Message[] = [];
  health: string;
  value = "";
  messages$ = new Subject<any>();

  constructor(private db: AngularFirestore) {
    this.db.collection('chat_room')
      .valueChanges().subscribe(messages => {
        messages
          .filter((message: any) => !!message.timestamp)
          .sort((a: Message, b: Message) => {
            return a.timestamp.seconds - b.timestamp.seconds;
          })
        this.messages$.next(messages);

      });


    // this.http.get('https://internal.payability.com/bin/sup_widget/health')
    //   .subscribe((res: any) => this.health = res);
  }

  onSendClick () {
    this.db.collection('chat_room').add(
      {
        message: this.value,
        author: 'PK',
        timestamp: new Date()
      }
    );

    this.value = "";
  }
}
