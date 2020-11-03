import { Component, OnInit } from '@angular/core';

import { LogService } from '../../services/log.service';

import * as uuid from 'uuid';

import { Log } from '../../models/Log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;

  isNew: boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.logService.selectedLog.subscribe(log => {
      if(log.id !== null){
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    })
  }

  onSubmit(){
    if(this.isNew){
      const newLog = {
        id: uuid.v4(),
        text: this.text,
        date: new Date()
      }
      this.logService.addLog(newLog);
    } else {
      const updtLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      this.logService.updateLog(updtLog);
    }

    this.clearState();
  }

  clearState(){
    this.isNew = true;
    this.id = "";
    this.text = "";
    this.date = "";
    this.logService.clearState();
  }

}
