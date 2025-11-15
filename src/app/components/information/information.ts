import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PersonService, PhoneService, AddressService } from '@clinicaloffice/mpage-developer';
import { Common } from '../../services/common';
import { Field } from '../field/field';

@Component({
  selector: 'app-information',
  imports: [Field],
  templateUrl: './information.html',
  styleUrl: './information.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class Information {
  protected personService = inject(PersonService);
  protected phoneService = inject(PhoneService);
  protected addressService = inject(AddressService);
  protected common = inject(Common);
}
