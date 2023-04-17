export interface Reservations {
    stay:            Stay;
    room:            Room;
    firstName:       string;
    lastName:        string;
    email:           string;
    phone:           string;
    addressStreet:   AddressStreet;
    addressLocation: AddressLocation;
    extras:          string[];
    payment:         string;
    note:            string;
    tags:            string[];
    reminder:        boolean;
    newsletter:      boolean;
    confirm:         boolean;
}

export interface AddressLocation {
    zipCode: string;
    state:   string;
    city:    string;
}

export interface AddressStreet {
    streetName:   string;
    streetNumber: string;
}

export interface Room {
    roomSize:     string;
    roomQuantity: number;
}

export interface Stay {
    arrivalDate:   Date;
    departureDate: Date;
}
