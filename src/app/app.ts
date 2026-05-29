import { ChangeDetectionStrategy, Component, inject, input, InputSignal, OnInit, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MPageService,
  MpageLogComponent,
  AddressService,
  AllergyService,
  CodeValueService,
  ConfigService,
  CustomService,
  DiagnosisService,
  EncounterService,
  Dialog,
  OrganizationService,
  PersonService,
  PhoneService,
  ProblemService,
  ReferenceService,
  PrsnlService,
  IMenuItem,
  TabbedMenuComponent,
  MPageLogService
} from '@clinicaloffice/mpage-developer';
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
  providers: [MPageService, MPageLogService, AddressService, AllergyService, CodeValueService, ConfigService, CustomService,
    DiagnosisService, EncounterService, Dialog, OrganizationService, PersonService, PhoneService,
    ProblemService, PrsnlService, ReferenceService, Common]
})
export class App implements OnInit {
  public activatedRoute = inject(ActivatedRoute);
  public MPage = inject(MPageService);
  public common = inject(Common);

  public title: InputSignal<string> = input('default');
  public path: InputSignal<string> = input('path');
  public person_id: InputSignal<string> = input('');
  public encntr_id: InputSignal<string> = input('');
  public prsnl_id: InputSignal<string> = input('');
  public disable_debugger: InputSignal<string> = input('0');

  public menuItems: IMenuItem[] = [
    { label: 'Information', idName: 'info', icon: 'contact_mail' },
    { label: 'Relationships', idName: 'reltionships', icon: 'people' },
    { label: 'Provider Relationships', idName: 'provider-reltionships', icon: 'handshake' }
  ];
  public selectedMenu: WritableSignal<IMenuItem> = signal(this.menuItems[0]);


  ngOnInit() {
    // Grab any parameters in the URL (Used in Cerner Components)
    this.activatedRoute.queryParams.subscribe(params => {
      this.MPage.personId = params['personId'] ? parseInt(params['personId']) : this.person_id() !== '' ? parseInt(this.person_id()) : this.MPage.personId;
      this.MPage.encntrId = params['encounterId'] ? parseInt(params['encounterId']) : this.encntr_id() !== '' ? parseInt(this.encntr_id()) : this.MPage.encntrId;
      this.MPage.prsnlId = params['userId'] ? parseInt(params['userId']) : this.prsnl_id() !== '' ? parseInt(this.prsnl_id()) : this.MPage.prsnlId;
      this.MPage.disableDebugger = parseInt(this.disable_debugger()) === 1;
    });

    this.MPage.setMaxInstances(2, true, 'CHART', false);
    this.common.initialLoad();

  }

}
