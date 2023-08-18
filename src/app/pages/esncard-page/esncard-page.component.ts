import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TransferState,
  makeStateKey,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IPartnerItem, PartnerService } from './partner.service';
import { MainService } from 'src/app/services/main.service';
import { MainItem } from '../../services/main-item';
import {
  INationalPartnerItem,
  NationalPartnerService,
} from './national-partners.service';
import { isPlatformServer, NgIf, NgFor, NgClass } from '@angular/common';
import { OlaContentItemComponent } from '../../components/ola-content-item/ola-content-item.component';
import { NationalPartnersComponent } from '../../components/national-partners/national-partners.component';
import { ContentItemComponent } from '../../components/content-item/content-item.component';

@Component({
  selector: 'esn-esncard-page',
  templateUrl: './esncard-page.component.html',
  styleUrls: ['./esncard-page.component.scss', './../base.scss'],
  standalone: true,
  imports: [
    ContentItemComponent,
    NgIf,
    NgFor,
    NgClass,
    NationalPartnersComponent,
    OlaContentItemComponent,
  ],
})
export class EsncardPageComponent implements OnInit {
  public readonly page: string = 'ESNcard_page';
  public directusImageLink: string = environment.DIRECTUS_URL_IMAGE;
  public partnerInfo?: IPartnerItem[];
  public nationalPartner?: INationalPartnerItem[];
  public cityName?: string;
  private mainInfo?: MainItem;

  constructor(
    private title: Title,
    private partnerService: PartnerService,
    private nationalPartnerService: NationalPartnerService,
    private mainService: MainService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

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
    this.fetchPartnerInfo();
    this.fetchNationalPartner();
  }

  async fetchPartnerInfo(): Promise<void> {
    this.partnerInfo = await firstValueFrom(
      this.partnerService.fetchPagePartner(),
    );
    if (isPlatformServer(this.platformId)) {
      this.transferState.set<IPartnerItem[]>(
        makeStateKey('partnerInfo'),
        this.partnerInfo,
      );
    }
  }

  async fetchNationalPartner(): Promise<void> {
    this.nationalPartner = await firstValueFrom(
      this.nationalPartnerService.fetchPageNationalPartner(),
    );
    if (isPlatformServer(this.platformId)) {
      this.transferState.set<INationalPartnerItem[]>(
        makeStateKey('nationalPartner'),
        this.nationalPartner,
      );
    }
  }

  public toggleInfo(partner: IPartnerItem): void {
    partner.show = !partner.show;
    if (!partner.show) {
      partner.buttonText = `More info`;
    } else {
      partner.buttonText = `Less info`;
    }
  }

  private setTitle(): void {
    this.title.setTitle(
      'ESNcard & Partners | ' + this.mainInfo?.section_long_name,
    );
  }
}
