let students = JSON.parse(localStorage.getItem("students")) || [];
let totalClasses = JSON.parse(localStorage.getItem("classes")) || 0;

function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("classes", JSON.stringify(totalClasses));
}

function addStudent() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;

    if (!name || !roll) {
        alert("Fill all fields");
        return;
    }

    students.push({ name, roll, present: 0, total: 0 });
    saveData();
    displayStudents();

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
}

function markAttendance(index, isPresent) {
    students[index].total++;

    if (isPresent) {
        students[index].present++;
    }

    totalClasses++;
    saveData();
    displayStudents();
}

function deleteStudent(index) {
    if (confirm("Delete this student?")) {
        students.splice(index, 1);
        saveData();
        displayStudents();
    }
}

function getPercentage(p, t) {
    if (t === 0) return "0%";
    return ((p / t) * 100).toFixed(1) + "%";
}

function displayStudents(list = students) {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    list.forEach((s, i) => {
        table.innerHTML += `
        <tr>
            <td>${s.name}</td>
            <td>${s.roll}</td>
            <td>
                ${s.present}/${s.total} (${getPercentage(s.present, s.total)})
            </td>
            <td>
                <button class="btn btn-success btn-sm" onclick="markAttendance(${i}, true)">
                    <i class="fa fa-check"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="markAttendance(${i}, false)">
                    <i class="fa fa-times"></i>
                </button>
                <button class="btn btn-dark btn-sm" onclick="deleteStudent(${i})">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById("totalStudents").innerText = students.length;
    document.getElementById("totalClasses").innerText = totalClasses;
}

function searchStudent() {
    let value = document.getElementById("search").value.toLowerCase();

    let filtered = students.filter(s =>
        s.name.toLowerCase().includes(value) ||
        s.roll.toLowerCase().includes(value)
    );

    displayStudents(filtered);
}

displayStudents();
