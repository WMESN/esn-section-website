import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { IMainItem, MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'esn-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  mainInfo: IMainItem | undefined;
  public timestamp: string = environment.timeStamp;

  constructor(
    private mainService: MainService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  async ngOnInit(): Promise<void> {
    this.mainInfo = await firstValueFrom(this.mainService.fetchMain()).then(
      (res: any) => res.data[0]
    );
  }

  public pink(): void {
    const footer = this.document.getElementById('foot');
    const footer2 = this.document.getElementById('foot2');
    const footer3 = this.document.getElementById('foot3');
    const strapiLink = this.document.getElementById('strapiLink');
    footer!.setAttribute('style', 'background-color: #ec008c');
    footer2!.setAttribute('style', 'fill: #ec008c');
    footer3!.setAttribute('style', 'fill: #ec008c');
    strapiLink!.setAttribute('style', 'color: #eaeaea !important');
  }
}
