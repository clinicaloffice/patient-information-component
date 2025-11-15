import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { EncounterService, PersonService, PhoneService, AddressService, IPersonReltn, IEncntrPersonReltn } from '@clinicaloffice/mpage-developer';
import { Common } from '../../services/common';
import { Field } from '../field/field';

@Component({
  selector: 'app-relationships',
  imports: [Field, NgTemplateOutlet],
  templateUrl: './relationships.html',
  styleUrl: './relationships.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class Relationships {
  protected encounterService = inject(EncounterService);
  protected personService = inject(PersonService);  
  protected phoneService = inject(PhoneService);
  protected addressService = inject(AddressService);
  protected common = inject(Common);

  // Return a relationship object in sorted order by person relation type
  protected sortedRelationships(relationship: IPersonReltn[] | IEncntrPersonReltn[] | undefined): IPersonReltn[] | IEncntrPersonReltn[] | undefined {
    return relationship ? relationship.sort((a, b) => a.personReltnType.localeCompare(b.personReltnType)) : undefined;
  }
}
