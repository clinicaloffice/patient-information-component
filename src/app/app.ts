import {ChangeDetectionStrategy, Component, inject, input, InputSignal, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
  ErrorHandlerService,
  OrganizationService, PersonService, PhoneService, ProblemService, ReferenceService, PrsnlService
} from '@clinicaloffice/mpage-developer';

declare const VERSION: string;

@Component({
  selector: 'app-root',
  imports: [MpageLogComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrls: ['../styles.scss', '../clinical-office-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [MPageService, AddressService, AllergyService, CodeValueService, ConfigService, CustomService,
    DiagnosisService, EncounterService, ErrorHandlerService, OrganizationService, PersonService, PhoneService,
    ProblemService, PrsnlService, ReferenceService]
})
export class App implements OnInit {
  public activatedRoute = inject(ActivatedRoute);
  public MPage = inject(MPageService);

  public title: InputSignal<string> = input('default');
  public path: InputSignal<string> = input('path');

  ngOnInit() {
    // Grab any parameters in the URL (Used in Cerner Components)
    this.activatedRoute.queryParams.subscribe(params => {
      this.MPage.personId = params['personId'] ? parseInt(params['personId']) : this.MPage.personId;
      this.MPage.encntrId = params['encounterId'] ? parseInt(params['encounterId']) : this.MPage.encntrId;
      this.MPage.prsnlId = params['userId'] ? parseInt(params['userId']) : this.MPage.prsnlId;
    });

    this.MPage.setMaxInstances(2, true, 'CHART', false);

  }

}
