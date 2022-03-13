export class CreateUserDto {
    username: string;
    password: string
    full_name: string;
    phone_number?: string;
    city_id?: number;

}