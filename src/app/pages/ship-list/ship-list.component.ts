import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DetailDialogComponent } from 'src/app/shared/components/detail-dialog/detail-dialog.component';
import { Ship } from 'src/app/shared/models/ship.interface';
import { ShipService } from 'src/app/shared/services/ship.service';

@Component({
  selector: 'app-ship-list',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.scss'],
})
export class ShipListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataLoading = false;
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
    this.dataLoading = true;
    this.shipService
      .getShipList(page)
      .pipe(
        map((res: { [key: string]: string }) => {
          this.list = res;
          this.shipList = res.results;
          this.dataLoading = false;
        }),
        catchError((err) => throwError(err))
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
