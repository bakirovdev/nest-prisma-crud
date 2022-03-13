export class UpdateUserDto {
    username: string;
    full_name: string;
    password: string;
    phone_number?: string;
    city_id?: number;
}