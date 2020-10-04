import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ship } from '../../models/ship.interface';

@Component({
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss'],
})
export class DetailDialogComponent implements OnInit {
  ship;
  constructor(
    public dialogRef: MatDialogRef<DetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {[key: string]: string}
  ) {}

  ngOnInit(): void {
    this.ship = this.data;
  }

  onClose() {
    this.dialogRef.close();
  }
}
