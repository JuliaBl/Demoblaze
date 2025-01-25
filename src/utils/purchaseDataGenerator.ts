import { faker } from '@faker-js/faker';
import { IPlaceOrder } from '../model/IPlaceOrder';

export async function purchaseDataGenerator(): Promise<IPlaceOrder> {
    const name = faker.person.fullName();
    const country = faker.location.country();
    const city = faker.location.city();
    const creditCardNumber = faker.finance.creditCardNumber();
    const month = faker.date.month();
    const year = '2025';

    return { name, country, city, creditCardNumber, month, year };
}