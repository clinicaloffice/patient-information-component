import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { inList } from '@clinicaloffice/mpage-developer';

@Component({
  selector: 'app-field',
  imports: [],
  templateUrl: './field.html',
  styleUrl: './field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class Field {
  public label = input('');
  public text = input('--', {
    transform: (value: string | string[] | undefined) => {
      return (inList(value, [null, undefined]) ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'string' && inList(value.trim(), [',', '']))) ? '--' :
        value;
    }
  });
  public skipIfEmpty = input(false);

  // Used in the HTML to determine if text is an array
  protected get isTextArray(): boolean {
    return Array.isArray(this.text());
  }

  // Used in the HTML to exclude displaying values
  protected get skipEmpty(): boolean {
    return this.text() === '--' && this.skipIfEmpty();
  }

}
