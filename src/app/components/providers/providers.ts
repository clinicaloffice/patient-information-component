import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EncounterService, PersonService, IPrsnlReltn, IEncntrPrsnlReltn } from '@clinicaloffice/mpage-developer';
import { Field } from '../field/field';

@Component({
  selector: 'app-providers',
  imports: [Field],
  templateUrl: './providers.html',
  styleUrl: './providers.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class Providers {
  protected encounterService = inject(EncounterService);
  protected personService = inject(PersonService);

  // Return a relationship object in sorted order by prsnl relation type
  protected sortedRelationships(relationship: IPrsnlReltn[] | IEncntrPrsnlReltn[] | undefined): IPrsnlReltn[] | IEncntrPrsnlReltn[] | undefined {
    return relationship ? relationship.sort((a, b) => a.reltnType.localeCompare(b.reltnType)) : undefined;
  }

}
