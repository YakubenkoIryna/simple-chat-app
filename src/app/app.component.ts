import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';
import { IMessage } from "./interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  username = 'Username';
  message = '';
  messages: IMessage[] = [];


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('35acdede4296778407d3', {
      cluster: 'eu'
    });


    const channel = pusher.subscribe('chat');

    channel.bind('message', (data: any) => {
        this.messages.push(data);
    });

  }


  submit(): void {
    this.http.post('http://localhost:8000/api/messages', {
      username: this.username,
      message: this.message
    }).subscribe(()=> this.message);
     this.message=''
  }

}
