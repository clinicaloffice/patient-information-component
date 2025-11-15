import { ChangeDetectionStrategy, Component, inject, input, InputSignal, OnInit, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MPageService, MpageLogComponent, AddressService, AllergyService, CodeValueService, ConfigService, CustomService, DiagnosisService, EncounterService, ErrorHandlerService, OrganizationService, PersonService, PhoneService, ProblemService, ReferenceService, PrsnlService, IMenuItem, TabbedMenuComponent } from '@clinicaloffice/mpage-developer';
import { Common } from './services/common';
import { Information } from './components/information/information';
import { Relationships } from './components/relationships/relationships';
import { Providers } from './components/providers/providers';

declare const VERSION: string;

@Component({
  selector: 'app-root',
  imports: [MpageLogComponent, TabbedMenuComponent, Information, Relationships, Providers],
  templateUrl: './app.html',
  standalone: true,
  styleUrls: ['../styles.scss', '../clinical-office-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [MPageService, AddressService, AllergyService, CodeValueService, ConfigService, CustomService,
    DiagnosisService, EncounterService, ErrorHandlerService, OrganizationService, PersonService, PhoneService,
    ProblemService, PrsnlService, ReferenceService, Common]
})
export class App implements OnInit {
  public activatedRoute = inject(ActivatedRoute);
  public MPage = inject(MPageService);
  public common = inject(Common);

  public title: InputSignal<string> = input('default');
  public path: InputSignal<string> = input('path');

  public menuItems: IMenuItem[] = [
    { label: 'Information', idName: 'info', icon: 'contact_mail' },
    { label: 'Relationships', idName: 'reltionships', icon: 'people' },
    { label: 'Provider Relationships', idName: 'provider-reltionships', icon: 'handshake' }
  ];
  public selectedMenu: WritableSignal<IMenuItem> = signal(this.menuItems[0]);


  ngOnInit() {
    // Grab any parameters in the URL (Used in Cerner Components)
    this.activatedRoute.queryParams.subscribe(params => {
      this.MPage.personId = params['personId'] ? parseInt(params['personId']) : this.MPage.personId;
      this.MPage.encntrId = params['encounterId'] ? parseInt(params['encounterId']) : this.MPage.encntrId;
      this.MPage.prsnlId = params['userId'] ? parseInt(params['userId']) : this.MPage.prsnlId;
    });

    this.MPage.setMaxInstances(2, true, 'CHART', false);
    this.common.initialLoad();

  }

}
