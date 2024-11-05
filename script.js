
function validateForm() {
    const fullname = document.getElementById('fullname');
    const group = document.getElementById('group');
    const idcard = document.getElementById('idcard');
    const dob = document.getElementById('dob');
    const email = document.getElementById('email');

    const fullnameOutput = document.getElementById('fullnameOutput');
    const groupOutput = document.getElementById('groupOutput');
    const idcardOutput = document.getElementById('idcardOutput');
    const dobOutput = document.getElementById('dobOutput');
    const emailOutput = document.getElementById('emailOutput');

    const fullnamePattern = /^[А-ЯЄЇІа-яєїі]{2,} [А-ЯЄЇІ]\.[А-ЯЄЇІ]\.$/;
    const groupPattern = /^[А-ЯІЇЄ]{2}-\d{2}$/;
    const idcardPattern = /^\d+$/;
    const dobPattern = /^\d{2}\.\d{2}\.\d{4}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;

    function setError(field, isValid) {
        if (isValid) {
            field.style.border = '1px solid green';
        } else {
            field.style.border = '1px solid red';
        }
    }

    const isFullnameValid = fullnamePattern.test(fullname.value);
    const isGroupValid = groupPattern.test(group.value);
    const isIdcardValid = idcardPattern.test(idcard.value);
    const isDobValid = dobPattern.test(dob.value);
    const isEmailValid = emailPattern.test(email.value);

    setError(fullname, isFullnameValid);
    setError(group, isGroupValid);
    setError(idcard, isIdcardValid);
    setError(dob, isDobValid);
    setError(email, isEmailValid);

    if (isFullnameValid && isGroupValid && isIdcardValid && isDobValid && isEmailValid) {
        fullnameOutput.innerHTML = `<strong>ПІБ:</strong> ${fullname.value}`;
        groupOutput.innerHTML = `<strong>Група:</strong> ${group.value}`;
        idcardOutput.innerHTML = `<strong>ID-карта:</strong> ${idcard.value}`;
        dobOutput.innerHTML = `<strong>Дата народження:</strong> ${dob.value}`;
        emailOutput.innerHTML = `<strong>Email:</strong> ${email.value}`;
    } else {
        alert("Перевірте коректність введених даних!");
    }
}

// Функція для генерації таблиці 6x6
function createTable() {
    const tableBody = document.getElementById('colorTable').querySelector('tbody');
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement('td');
            const cellNumber = i * 6 + j + 1;
            cell.textContent = cellNumber;
            // Додати події для клітинки
            cell.addEventListener('mouseover', () => changeColorOnHover(cell, cellNumber));
            cell.addEventListener('click', changeColorOnClick);
            cell.addEventListener('dblclick', changeDiagonalColor);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}

// Зміна кольору на випадковий при наведенні на клітинку номер 17
function changeColorOnHover(cell, cellNumber) {
    if (cellNumber === 17) {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        cell.style.backgroundColor = randomColor;
    }
}

// Зміна кольору на обраний з палітри при кліку
function changeColorOnClick(event) {
    const colorPicker = document.getElementById('colorPicker');
    const selectedColor = colorPicker.value;
    event.target.style.backgroundColor = selectedColor;
}

// Зміна кольору клітинок головної діагоналі при дворазовому кліку
function changeDiagonalColor(event) {
    const cells = document.querySelectorAll('#colorTable td');
    cells.forEach((cell, index) => {
        if (index % 7 === 0) { // Головна діагональ (0, 6, 12, 18, 24, 30)
            const colorPicker = document.getElementById('colorPicker');
            cell.style.backgroundColor = colorPicker.value; // Використовуємо вибраний колір
        }
    });
}

// Виклик функції для створення таблиці
createTable();

