export interface PaymentModel{
    id: string,
    reservationId: string
    amount: number,
    status: string
    paymentMethod: string
    date: Date
}