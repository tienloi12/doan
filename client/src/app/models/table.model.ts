import { Location } from './location.model';

export interface Table {
     tableId: string,
     tableName: string,
     seats: number,
     status: boolean,
     locationId: Location,
     reservationId?: string,
}