export class User {
    
    idCard: any = '';
    firstName: String = '';
    lastName: String = '';
    idCardType: String = '';
    email: String = '';
    password: String = '';
    confirmPass: String = '';
    userType: Usertype[]= [new Usertype];
    address: String = ''
}

export class Usertype {
    idRole: number = 1;
    roleType: String = '';
}
