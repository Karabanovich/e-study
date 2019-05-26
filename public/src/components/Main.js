selectedCourses = [];
function start(role) {
    main.style.height = 'calc(100% - 62px)';
    main.style.margin = '62px 0px 0px 0px';
    App.insertBefore(header, App.firstChild);
    if (sign_pg.querySelector('.sign_wrong'))
        sign_pg.removeChild(sign_wrong);
    while (content.firstChild)
        content.removeChild(content.firstChild);
    if (!JSON.parse(localStorage.User)) {
        LogIn()
        return
    }
    if (role === 'student') {
        content.appendChild(studentContent);
        document.querySelector('.all_courses').innerHTML = '';
        document.querySelector('.create_schedule_btn').innerHTML = ''
        document.querySelector('.update_schedule_btn').innerHTML = ''
        const userCourses = Registration.getCurrentSchedule(JSON.parse(localStorage.User))
        if (userCourses.length > 0) {
            document.querySelector('.add_course').innerHTML = 'Обновить курсы'
            document.querySelector('.delete_schedule_btn').innerHTML = 'Удалить курсы'
            if (userCourses.find(el => {
                return el.name[el.name.length - 1] === '?'
            }))
                document.querySelector('.submit_courses').innerHTML = 'Подтвердить курсы'
            else
                document.querySelector('.submit_courses').innerHTML = ''
            displayStudentCourses(userCourses);
        }
        else {
            document.querySelector('.submit_courses').innerHTML = ''
            document.querySelector('.delete_schedule_btn').innerHTML = ''
            document.querySelector('.add_course').innerHTML = ''
            document.querySelector('.student_courses').innerHTML = '<div class="create_schedule">Создать расписание</div>'
            document.querySelector('.create_schedule').addEventListener('click', createSchedule);
        }
    }
    else if (role === 'professor') {
        content.appendChild(professorContent);
        document.querySelector('.all_courses').innerHTML = '';
        document.querySelector('.create_schedule_btn').innerHTML = ''
        document.querySelector('.update_schedule_btn').innerHTML = ''
        const userCourses = CourseEditting.getCurrentSchedule(JSON.parse(localStorage.User))
        if (userCourses.length > 0) {
            document.querySelector('.add_course').innerHTML = 'Обновить курсы'
            document.querySelector('.delete_schedule_btn').innerHTML = 'Удалить курсы'
            if (userCourses.find(el => {
                return el.name[el.name.length - 1] === '?'
            }))
                document.querySelector('.submit_courses').innerHTML = 'Подтвердить курсы'
            else
                document.querySelector('.submit_courses').innerHTML = ''
            displayProfessorCourses(userCourses);
        }
        else {
            document.querySelector('.submit_courses').innerHTML = ''
            document.querySelector('.delete_schedule_btn').innerHTML = ''
            document.querySelector('.add_course').innerHTML = ''
            document.querySelector('.student_courses').innerHTML = '<div class="create_schedule">Создать расписание</div>'
            document.querySelector('.create_schedule').addEventListener('click', createSchedule);
        }
    }
    else if (role === 'registrar') {
        content.appendChild(registrarContent);
        document.querySelector('.all_courses').innerHTML = '';
        document.querySelector('.create_schedule_btn').innerHTML = ''
        document.querySelector('.update_schedule_btn').innerHTML = ''
        document.querySelector('.submit_courses').innerHTML = ''
        document.querySelector('.delete_schedule_btn').innerHTML = ''
        document.querySelector('.add_course').innerHTML = ''
        document.querySelector('.student_courses').innerHTML = ''
        registration()
    }
    newUser(role);
    sign_input_login.value = '';
    sign_input_pass.value = '';
}

function newUser(username) {
    document.querySelector('.username').innerHTML = username;
}

