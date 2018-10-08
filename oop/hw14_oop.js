//Задача 2
class Building {
    constructor(name, numberOfFloors) {
        this.name = name;
        this.numberOfFloors = numberOfFloors;
    }
    getNumberOfFloors() {
        return this.numberOfFloors
    }

    setTheNumberOfFloors(num) {
        return this.numberOfFloors = num;
    }
}

const building = new Building("Park", 6);

class House extends Building {
    constructor(name, numberOfFloors, numberOfApartmentsPerFloor) {
        super(name, numberOfFloors);
        this.numberOfApartmentsPerFloor = numberOfApartmentsPerFloor;
    }

    getNumberOfFloors() {
        return {floors: this.numberOfFloors, numberOfApartmentsPerFloor: this.numberOfApartmentsPerFloor}
    }
}

const house = new House("Prime", 5, 5);

class ShoppingCenter extends Building {
    constructor(name, numberOfFloors, numberOfStoresPerFloor) {
        super(name, numberOfFloors);
        this.numberOfStoresPerFloor = numberOfStoresPerFloor;
    }

    getNumberOfFloors() {
        return {floors: this.numberOfFloors, numberOfStoresPerFloor: this.numberOfStoresPerFloor}
    }
}

const shoppingCenter = new ShoppingCenter("ATB", 3, 3);

//Задача 4
class User {
    constructor(name, dateRegistration) {
        this.name = name;
        this.dateRegistration = dateRegistration;
    }
}

User.prototype.info = function() {
    return {name: this.name, registration: new Date(this.dateRegistration)};
}

const user = new User("Kolya", 1539029833323);

class Admin extends User {
    constructor(name, dateRegistration, superAdmin) {
        super(name, dateRegistration);
        this.superAdmin = superAdmin;// я не смог сделать скрытным и при этом иметь доступ через метотд info без this.
    }

    info() {
        return {name: this.name, registration: new Date(this.dateRegistration), superAdmin: this.superAdmin };
    }
}

const admin = new Admin("Mike", 1539029033323, true);

class Guest extends User {
    constructor(name, dateRegistration, validDate) {
        super(name, dateRegistration);
        this.validDate = validDate;
    }

    info() {
        return {name: this.name, registration: new Date(this.dateRegistration), validDate: new Date(this.validDate) };
    }
}

const guest = new Guest("Tanya", 1539019033323, 1539419033323);