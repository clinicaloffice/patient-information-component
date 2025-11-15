import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-information',
  imports: [],
  templateUrl: './information.html',
  styleUrl: './information.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class Information {
}
