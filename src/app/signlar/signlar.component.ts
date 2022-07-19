import { Component, OnDestroy, OnInit } from '@angular/core';
import axios from 'axios';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-signlar',
  templateUrl: './signlar.component.html',
  styleUrls: ['./signlar.component.css']
})
export class SignlarComponent implements OnInit, OnDestroy {
  hub: string = '';
  apideviceId: string = '';
  // apiBaseUrl: string = 'http://localhost:7071';
  apiBaseUrl: string = 'https://sim-dev-notifications.azurewebsites.net';
  constructor() { }
  ngOnDestroy(): void {
    this.stopConnection();
  }

  deviceid = "";

  stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
  hubConnection;
  data: any;

  ngOnInit() {

  }

  dataReceived(obj, data) {
    console.log('received packet');
    this.data = data;
    console.log(data);

  }
  getConnectionInfo() {
    const inputs = {
      deviceId: this.apideviceId,
      hubName: this.hub
    };

    return axios.post(`${this.apiBaseUrl}/api/GetHubInfo/simtelemetry/` + this.deviceid, inputs).then(resp => resp.data);
  }

  clearData() {
    this.data = {};
  }

  connect() {
    this.getConnectionInfo().then(info => {
      info.accessToken = info.accessToken || info.accessKey;
      info.url = info.url || info.endpoint;
      const options = {
        accessTokenFactory: () => info.accessToken
      };
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(info.url, options)
        .configureLogging(signalR.LogLevel.Information)
        .build();
      this.hubConnection.on('ReceiveMessage', (data: any) => {
        this.dataReceived(this, data);
      });
      this.hubConnection.onclose(() => console.log('disconnected'));
      this.hubConnection
        .start()
        .then(() => {
          console.log('connected!');
        })
        .catch(console.error);
    });
  }

  disconnect() {
    this.stopConnection();
  }


}
