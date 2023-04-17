import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservations } from '../models/reservations';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  form!: FormGroup;

  formatExtras(extras: string[]): string {
    return extras.join(', ').trim();
  }

  rooms = [
    { value: 'business-suite', display: 'Business Suite' },
    { value: 'presidential-suite', display: 'Presidential Suite' },
  ];

  payments = [
    { value: 'cc', display: 'Credit Card', checked: true },
    { value: 'cash', display: 'Cash', checked: true },
    { value: 'paypal', display: 'Paypal', checked: true },
    { value: 'bitcoin', display: 'Bitcoin', checked: true },
  ];

  states = ['Arizona', 'Arkansas'];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reservations,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const paymentValue = this.data.payment;
    const selectedPayment = this.payments.find(
      (payment) => payment.value === paymentValue
    );

    console.log(`selectedPayment ${JSON.stringify(selectedPayment)}`);
    this.form = this.fb.group({
      dateOfArrival: [this.data.stay.arrivalDate || ''],
      dateOfDeparture: [this.data.stay.departureDate || ''],
      roomSize: [this.data.room.roomSize || ''],
      roomQuantity: [this.data.room.roomQuantity || ''],
      firstName: [this.data.firstName || ''],
      lastName: [this.data.lastName || ''],
      email: [this.data.email || '', Validators.email],
      phone: [this.data.phone || ''],
      streetName: [this.data.addressStreet.streetName || ''],
      streetNumber: [this.data.addressStreet.streetNumber || ''],
      zipcode: [this.data.addressLocation.zipCode || ''],
      state: [this.data.addressLocation.state || ''],
      city: [this.data.addressLocation.city || ''],
      extras: [this.data.extras || ''],
      payment: [selectedPayment || ''],
      note: [this.data.note || ''],
      tags: [this.data.tags || ''],
      reminder: [this.data.reminder || ''],
      newsletter: [this.data.newsletter || ''],
      confirm: [this.data.confirm || ''],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    console.log('Submit');
  }
}
