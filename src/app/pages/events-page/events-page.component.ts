import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { MainService } from 'src/app/services/main.service';
import { MainItem } from '../../services/main-item';
import { NgIf } from '@angular/common';
import { PretixCalendarComponent } from '../../components/pretix-calendar/pretix-calendar.component';
import { CustomCalendarComponent } from '../../components/custom-calendar/custom-calendar.component';

@Component({
  selector: 'esn-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss', './../base.scss'],
  standalone: true,
  imports: [NgIf, CustomCalendarComponent, PretixCalendarComponent],
})
export class EventsPageComponent implements OnInit {
  public mainInfo?: MainItem;
  public loadPretix: boolean;

  constructor(
    private title: Title,
    private mainService: MainService,
    private cookieService: CookieService,
  ) {
    this.loadPretix = this.cookieService.get('pretix') === 'true';
  }

  ngOnInit(): void {
    this.mainService.getMainInformation().subscribe({
      next: (mainInfo?: MainItem) => {
        this.mainInfo = mainInfo;
      },
      error: (error) => {
        console.error(error);
      },
    });

    if (this.mainInfo) {
      this.setTitle();
    }
  }

  public setLoadPretix(): void {
    this.loadPretix = !this.loadPretix;
    this.cookieService.set('pretix', this.loadPretix.toString());
  }

  private setTitle(): void {
    this.title.setTitle('Events | ' + this.mainInfo?.section_long_name);
  }
}
