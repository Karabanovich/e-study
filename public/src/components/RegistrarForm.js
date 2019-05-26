let registrarContent = document.createElement('div');
registrarContent.innerHTML = `
<div class="roman username dst_curs student_courses">Мои курсы</div>
<div class="add_course"></div>
<div class="submit_courses"></div>
<div class="all_courses"></div>
<div class="create_schedule_btn"></div>
<div class="update_schedule_btn"></div>
<div class="delete_schedule_btn"></div>
<div class="delete_schedule_btn_sub"></div>
`
registrarContent.querySelector('.create_schedule_btn').addEventListener('click',
    () => {
        Manager.register(selectedCourses)
        registration()
    })

function registration() {
    selectedCourses = []
    const courses = Manager.getCourseOfferings();
    courses.forEach(course => {
        if (course.open) {
            selectedCourses.push(course.name);
        }
    })
    displayAllCourses(courses);
    document.querySelector('.create_schedule_btn').innerHTML = 'Обновить данные о курсах'
}

