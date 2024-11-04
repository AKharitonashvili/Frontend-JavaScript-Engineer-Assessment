import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent {
  readonly data = inject<{
    message: string;
  }>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ErrorDialogComponent>);

  close(): void {
    this.dialogRef.close();
  }
}
