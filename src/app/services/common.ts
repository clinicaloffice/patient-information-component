import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { IAddress, MPageService } from '@clinicaloffice/mpage-developer';

@Injectable({
  providedIn: 'root',
})
export class Common {
  public ready: WritableSignal<boolean> = signal(false);
  public MPage = inject(MPageService);

  // Perform Initial Data Load
  public initialLoad(): void {

    this.MPage.executeCCL({
      payload: {
        patientSource: [this.MPage.emptyPatientSource],
        person: {
          aliases: true,
          names: true,
          personInfo: true,
          prsnlReltn: true,
          personReltn: true,
          personPlanReltn: true,
          personCodeReltn: true,
          patient: true,
          orgReltn: true,
          loadExtendedPersons: true
        },
        encounter: {
          prsnlReltn: true,
          personReltn: true,
          encounterInfo: true,
          loadExtendedPersons: true
        },
        prsnl: {
          aliases: true,
          loadExtendedPersons: true
        },
        address: true,
        phone: true
      }
    }, -1, (() => {
      this.ready.set(true);
    }));
  }

  // Converts an IAddress object into an array of strings for display
  public addressToArray(address: IAddress | undefined): string[] {
    const formattedAddress = <string[]>[];

    if (address) {
      formattedAddress.push(address.streetAddr);
      if (address.streetAddr2) formattedAddress.push(address.streetAddr2);
      if (address.streetAddr3) formattedAddress.push(address.streetAddr3);
      if (address.streetAddr4) formattedAddress.push(address.streetAddr4);
      formattedAddress.push((address.city + ', ' + address.state + ' ' + address.zipCode).trim().replace(/,$/, ''));
    }

    return formattedAddress;
  }

}
