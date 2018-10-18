const api_url = "https://jsonplaceholder.typicode.com";
const xhr = new XMLHttpRequest();

//Настройка
xhr.open("GET", `${api_url}/users`);

//Отправка запроса
xhr.send();

//событие получение данных из сервера и передачи их в класс Users и вызывавет метод init
xhr.addEventListener("load", () => {
    const objUser = JSON.parse(xhr.responseText);
    return new Users(objUser).init();
});


/**
 * Принимет обьект с пользователями
 */
class Users {
    constructor(objUser) {
        this.objUser = objUser;
    }

    init() {
        //перебераем обьект и создаем в разметку кнопку с пользователем
        this.objUser.forEach((element, index) => {
            const btn = `<button type="button" id = "${index + 1}" class="btn btn-primary" style = "margin: 10px; position:relative">${element.name}</button>`;
            document.body.insertAdjacentHTML("afterbegin", btn);
        });

        this.body = document.body;

        this._Events();
        return this;
    }

    /**
     * Создает разметеку info и удаляет ее
     * @param {mouseevent} e 
     */
    info(e) {
        const id = parseFloat(e.toElement.id);
        this.objUser.forEach(e => {
            if (e.id === id) {
                const info = `<ul class = "info"
                id = "${e.id+100}"
                                style = "
                                    position: absolute;
                                    text-align: left;
                                    background-color: blue;
                                    border-radius: 10px;
                                    left: 0;
                                    top: 40px;
                                    z-index: 1;
                                ">
                                    <li>name: ${e.name}</li>
                                    <li>id: ${e.id}</li>
                                    <li>username: ${e.username}</li>
                                    <li>phone: ${e.phone}</li>
                                    <li>email: ${e.email}</li>
                                    <li>website: ${e.website}</li>
                              </ul>`;
                this.btn = document.getElementById(id);
                this.btn.insertAdjacentHTML("afterbegin", info)
            } 
        });


        const info = document.querySelectorAll(".info");
        const infoID = document.getElementById(id+100);//+100 для того что бы id был уникальным и не повторялся с id btn
        info.forEach(user => {
            if(user.id !== infoID.id) {
                const delID = parseFloat(user.id);
                const info = document.getElementById(delID);
                info.remove();
            }
        })
    }

    //События
    _Events() {
        this.body.addEventListener("click", (e) => this.info(e));
    }
}
