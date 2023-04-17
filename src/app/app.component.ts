import { Component, OnInit } from '@angular/core';
import { ReservationsService } from './services/reservations.service';
import { MatTableDataSource } from '@angular/material/table';
import { Reservations } from './models/reservations';
import { DatePipe } from '@angular/common';
import { DialogComponent } from './popup/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'idm-eng-app';
  searchTerm?: any;
  dataSource = new MatTableDataSource<Reservations>([]);
  displayedColumns: string[] = [
    'email',
    'arrivalDate',
    'departureDate',
    'firstName',
    'lastName',
    'phone',
  ];

  constructor(
    private reservationService: ReservationsService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  formatDate(date: string) {
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    return formattedDate;
  }

  openDialog(row: Reservations) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '900px',
      height: '750px',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  search() {
    console.log(this.searchTerm);
    if (this.searchTerm) {
      const filteredData = this.dataSource.data.filter((row) =>
        row.email.includes(this.searchTerm)
      );
      this.dataSource = new MatTableDataSource(filteredData);
    } else {
      this.loadData();
    }
  }

  loadData() {
    this.reservationService.getReservations().subscribe((data) => {
      const reservations: Reservations[] = data as Reservations[];
      this.dataSource = new MatTableDataSource(reservations);
    });
  }
}
