import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { ShipService } from '../../services/ship.service';
import { Ship } from '../../models/ship.interface';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';

@Component({
  selector: 'app-ship-list',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.scss'],
})
export class ShipListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  shipList: string;
  list: { [key: string]: string };
  ship: Ship;
  detailDialog: TemplateRef<DetailDialogComponent>;
  constructor(protected shipService: ShipService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getShipList();
  }

  /**
   * Get the list of ships
   */
  getShipList(page?: string) {
    this.shipService
      .getShipList(page)
      .pipe(
        map((res: { [key: string]: string }) => {
          console.log('res', res);
          this.list = res;
          this.shipList = res.results;
        })
      )
      .subscribe();
  }

  /**
   * Get a ship
   * @param page index
   */
  getShip(page: number) {
    this.shipService
      .getShip(page)
      .pipe(
        map((res: Ship) => {
          console.log('res', res);
          this.ship = res;
        })
      )
      .subscribe();
  }

  /**
   * Open the ship detail dialog
   * @param ship ship
   */
  openDialog(ship: Ship): void {
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '60vw',
      height: '60vh',
      data: ship,
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }
}
