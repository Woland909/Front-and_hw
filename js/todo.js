const state = {
    todos: [
        {
            id: 1,
            title: 'Some title 1',
            description: 'Some discription 1'
        },
        {
            id: 2,
            title: 'Some title 2',
            description: 'Some discription 2'
        },
        {
            id: 3,
            title: 'Some title 3',
            description: 'Some discription 3'
        },
    ]
};

/* UI Elements */
const table = document.querySelector('.table tbody');
const form = document.forms['add_new_item_form'];
const title = form['title'];
const description = form['description'];


/**
 Функция onSubmitForm обрабатывает событие формы. Добаление новой задачи
  @param {Event} e - Обьект события.
  @returns {void} 
 */
const onSubmitForm = e => {
    e.preventDefault();
    if (title.value && description.value) {
        addNewItem(title.value, description.value);
        form.reset(); //Сбрасываем тест в форме
    } else {
        showAlert('Вы не введи данные', 'danger');
    }
};

/**
 Функция onTableClick обрабатывает событие в таблице, ищет BUTTON (Delete)
 @param {Event} e - Обьект события.
 @returns {void}
*/
const onTableClick = e => {
    if (e.target.classList.contains('remove_item')) {
        const tr = e.target.closest('tr');
        const id = tr.dataset.id;
        deleteItem(id);
    }
};

/**
  Функция вывода alert
  @param {str} text - Текст сообщения
  @param {str} type - Тип алерта: "success", "warning";
  @returns {void}
 */
const showAlert = (text = 'Вы забыли передать текст', type = 'danger') => {
    //Находим и удаляем текущий алерт если он есть на странице
    deleteAlert();

    //Создать разметку
    const template = `
        <div class = "alert alert-${type} mt-3">${text}</div>
    `;

    document.querySelector('.table').insertAdjacentHTML('beforebegin', template);

    // Удаляем алерт через 2 сек
    setTimeout(deleteAlert, 2000);
}

/**
 Функция удаления алерта
 @param {boolean}
 */
const deleteAlert = () => {
    const currentAlert = document.querySelector('.alert');
    if(currentAlert) currentAlert.parentElement.removeChild(currentAlert);
    return Boolean(currentAlert);
}

/**
Создаем функцию добавления задач
@param {string} title - Заголовок задачи
@param {string} description - Описание задачи
@returns {void}
 */
function addNewItem(title, description) {
    const newTodo = {
        id: state.todos.length + 1,
        title,
        description
    }
   
    state.todos.push(newTodo);
    generateItems(state.todos);
    showAlert('Задача добавлена успешно!', 'success');
}

/** 
Функция addItem добавляет один элемент в разметку
@param {Object} item - один обьект задачи;
@returns {void}
*/
const addItem = (item, index) => {
    const template = `
        <tr data-id ="${item.id}">
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td><button class ="btn btn-danger remove_item">Delete</button></td>
        </tr>
    `;
    table.insertAdjacentHTML('afterbegin',template);
};

/**Удаляет эл из массива и из разметки
@param {number} id - id задачи котроую нужно удалить
@returns {void}
*/
const deleteItem = id => {
    const status = confirm('Вы действительно хотите удалить задачу?');
    
    if(!status) return;
    //Удаляем задачу из массива
    state.todos.forEach((item, index) => {
        if(item.id === Number(id)) {
            state.todos.splice(index, 1);
        }
    });
    //Заново генерируем эл
    generateItems(state.todos);

    //Выводим уведомление
    showAlert('Задача была удалена успешно', 'warning')
};

/*Перебераем в цикле массив с задачами и передаем по одной задаче в функцию addItem*/
const generateItems = items =>{
    table.innerHTML = '';
    items.forEach((todo,index) => addItem(todo,index));
};

/**
Все события
 */

 form.addEventListener('submit', onSubmitForm);
 table.addEventListener('click', onTableClick);

//Первый раз вызываем генерацию задач
generateItems(state.todos);





