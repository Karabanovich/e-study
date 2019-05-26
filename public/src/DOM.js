let mark;
function displayStudentCourses(courses, del) {
  document.querySelector('.student_courses').innerHTML = 'Мои курсы';
  courses.forEach((course) => {
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `${course.name}               ${course.schedule}        ${course.professor}`;
    newDiv.className = 'active_course';
    if (del) {
      newDiv.className = 'active_course delete';
    }
    document.querySelector('.student_courses').appendChild(newDiv);
  })
}

function displayProfessorCourses(courses, del) {
  document.querySelector('.student_courses').innerHTML = 'Мои курсы';
  courses.forEach((course) => {
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `${course.name}               ${course.schedule} `;
    newDiv.className = 'active_course';
    if (del) {
      newDiv.className = 'active_course delete';
    }
    else {
      newDiv.addEventListener('click', (e) => { showCourseStudents(e, course.name) })
    }
    document.querySelector('.student_courses').appendChild(newDiv);
  })
}

function displayCourseOfferings(courses, userSchedule) {
  selectedCourses = []
  if (userSchedule) {
    userSchedule.forEach(course => {
      selectedCourses.push(course.name.replace('?', ''))
      if (!courses.find(elem => elem.name === course.name)) {
        courses.push(course)
      }
    })
  }
  document.querySelector('.all_courses').innerHTML = '<div class="all_courses_name" >Доступные курсы</div>';
  courses.forEach((course) => {
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `${course.name}               ${course.schedule}          ${course.price}$`;
    newDiv.className = 'active_course';
    if (userSchedule && userSchedule.find(elem => elem.name === course.name || elem.name === course.name + '?')) {
      newDiv.className = 'active_course selected1';
    }
    newDiv.addEventListener('click', (e) => {
      if (selectedCourses.length < 6 && !selectedCourses.find((name) => name === course.name)) {
        if (selectedCourses.length >= 4) {
          e.target.className = 'active_course selected2'
        }
        else {
          e.target.className = 'active_course selected1'
        }
        selectCourse(course.name)
      }
      else if (selectedCourses.find((name) => name === course.name)) {
        e.target.className = 'active_course'
        deselectCourse(course.name)
      }
    });
    document.querySelector('.all_courses').appendChild(newDiv);
  })
}
function displayAllCourses(courses) {
  document.querySelector('.all_courses').innerHTML = '<div class="all_courses_name" >Доступные курсы</div>';
  courses.forEach((course) => {
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `${course.name}               ${course.schedule}          ${course.price}$`;
    if (course.open) {
      newDiv.className = 'veryactive_course';
    }
    else {
      newDiv.className = 'disactive_course';
    }
    newDiv.addEventListener('click', (e) => {
      if (!selectedCourses.find((name) => name === course.name)) {
        e.target.className = 'veryactive_course'
        selectCourse(course.name)
      }
      else if (selectedCourses.find((name) => name === course.name)) {
        e.target.className = 'disactive_course'
        deselectCourse(course.name)
      }
    });
    document.querySelector('.all_courses').appendChild(newDiv);
  })
}

function showCourseStudents(event, course) {
  CourseEditting.getCourseStudents(course).forEach(user => {
    let userDiv = document.createElement('div');
    userDiv.innerHTML = `<div>${user.username}</div><input type="text" value="${user.marks.length > 0 ? user.marks[0] : ''}" onchange="mark = this.value"/>`
    let button = document.createElement('div');
    button.innerHTML = `Оценить`
    button.className = "oc_but"
    userDiv.appendChild(button)
    event.target.appendChild(userDiv)
    button.onclick = function () {
      markUser(event.target, user.username)
    };
  })
}
function markUser(target, student) {
  target.removeChild(target.childNodes[1])
  CourseEditting.markStudent(mark, student)
} 