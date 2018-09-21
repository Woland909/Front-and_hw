# Todo
Это программа для создания новых, текстовых, задач и их удаления!
Эта программа содержит такие файлы и папки:
 - todo.html - Файл разметки страницы.
 - Папку js c файлами: 
    - todo.js - Файл  в котором написана программа, на языке JavaScript.

### todo.html :
*  Создана стандартная разметка на платформе [Bootstrap](http://getbootstrap.com) которая примнимает любой текст в виде задачи в форму с полями:
    - Title - Заголовок
    - Description - Описание
```html 
<form name="add_new_item_form">
     <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" name="title" id="title">
    </div>
    <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" name="description" id="description">
    </div>
    <button type="submit" class="btn btn-primary">Add item</button>
</form>
```
* Для добаления задачи исплоьзуется кнопка `Add item` из разметки в форме что приведена выше, 
    * Задача генерируется в разметку: 
```html 
    <table class="table mt-5">
        <tbody></tbody>
    </table>
```
* Для удаления задачи используется кнопка `Delete` из генерированой разметки которая создатся при добавлении задачи
 ```html
    <button class ="btn btn-danger remove_item">Delete</button>
```

### todo.js :
- Содержит html элементы
    ```js
    const table = document.querySelector('.table tbody');
    const form = document.forms['add_new_item_form'];
    const title = form['title'];
    const description = form['description'];
    ```
- Функцию `onSubmitForm` которая обрабатывает событие формы и передает  их содержимое в функцию "addNewItem", также вызывает в функцию "showAlert" если данные не были переданы в форме. 
```js
/**
@param {Event} e - Обьект события.
@returns {void} 
*/
    const onSubmitForm = e => {
    e.preventDefault();
    if (title.value && description.value) {
        addNewItem(title.value, description.value);
        form.reset(); //Сбрасываем текст в форме
    } else {
        showAlert('Вы не введи данные', 'danger');
    }
};
```
- функция `addNewItem` добавляет задачу в массив "todos" содержащийся  в обьекте "state" и вызывает функцию "generateItems", также  функцию "showAlert" с текстом о выполненой задаче
```js
/**
@param {string} title - Заголовок задачи
@param {string} description - Описание задачи
@returns {void}
*/
function addNewItem(title, description) {
    const newTodo = {
        id: state.todos.length + 1,
        title,
        description
    };
   
    state.todos.push(newTodo);
    generateItems(state.todos);
    showAlert('Задача добавлена успешно!', 'success');
}
```
- Обьект `state` c массивом (задач) todos 
```js
    const state = {
        todos: [
            {
                body
            },
        ]
};
```
-  Функция `generateItems` и передает по одной задаче в функцию "addItem". также генерируя таблицу с html  документа.
```js
    const generateItems = items => {
        table.innerHTML = '';
        items.forEach((todo,index) => addItem(todo,index));
};
```
- Функция `addItem` добавляет один элемент в разметку
```js
/**
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
```


- Функция `deleteItem` удаляет элемент из массива и разметки, вызывает функцию "generateItems" и "showAlert" выводит уведомление про успешное удаление задачи.
```js
/**
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
```
- Функция `showAlert` выводит алерт перед таблицей и удаляет его через 2 сек.
```js
/**
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
```
- Все события:
   ```js
    form.addEventListener('submit', onSubmitForm);
    table.addEventListener('click', onTableClick);
    ```
