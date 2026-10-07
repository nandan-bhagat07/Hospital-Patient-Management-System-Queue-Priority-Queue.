
// Patient queue
let patients = [];


// Get HTML elements
const patientForm = document.getElementById("patientForm");

const patientTableBody =
    document.getElementById("patientTableBody");

const totalPatients =
    document.getElementById("totalPatients");

const waitingPatients =
    document.getElementById("waitingPatients");

const emergencyPatients =
    document.getElementById("emergencyPatients");

const nextPatientBtn =
    document.getElementById("nextPatientBtn");

const searchPatient =
    document.getElementById("searchPatient");


// Add Patient
patientForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("patientName").value;

    const age =
        document.getElementById("patientAge").value;

    const symptoms =
        document.getElementById("symptoms").value;

    const priority =
        document.getElementById("priority").value;


    const patient = {

        token: patients.length + 1,

        name: name,

        age: age,

        symptoms: symptoms,

        priority: priority,

        status: "Waiting"

    };


    patients.push(patient);


    // Sort according to priority
    sortPatients();


    // Show patients
    displayPatients();


    // Update dashboard
    updateDashboard();


    // Clear form
    patientForm.reset();

});


// Priority Queue
function sortPatients() {

    const priorityValue = {

        "Emergency": 1,

        "High": 2,

        "Normal": 3

    };


    patients.sort(function(a, b) {

        return priorityValue[a.priority] -
               priorityValue[b.priority];

    });

}


// Display Patients
function displayPatients(list = patients) {

    patientTableBody.innerHTML = "";


    list.forEach(function(patient) {

        const row =
            document.createElement("tr");


        let priorityClass = "";


        if (patient.priority === "Emergency") {

            priorityClass = "priority-emergency";

        }

        else if (patient.priority === "High") {

            priorityClass = "priority-high";

        }

        else {

            priorityClass = "priority-normal";

        }


        row.innerHTML = `

            <td>${patient.token}</td>

            <td>${patient.name}</td>

            <td>${patient.age}</td>

            <td>${patient.symptoms}</td>

            <td class="${priorityClass}">
                ${patient.priority}
            </td>

            <td>${patient.status}</td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deletePatient(${patient.token})">
                    Delete
                </button>
            </td>

        `;


        patientTableBody.appendChild(row);

    });

}


// Next Patient
nextPatientBtn.addEventListener("click", function() {

    if (patients.length === 0) {

        alert("No patients in the queue.");

        return;

    }


    // First patient gets served
    const patient = patients.shift();


    alert(
        "Now serving: " +
        patient.name +
        " | Priority: " +
        patient.priority
    );


    displayPatients();

    updateDashboard();

});


// Delete Patient
function deletePatient(token) {

    patients = patients.filter(function(patient) {

        return patient.token !== token;

    });


    displayPatients();

    updateDashboard();

}


// Dashboard update
function updateDashboard() {

    totalPatients.textContent =
        patients.length;


    waitingPatients.textContent =
        patients.filter(function(patient) {

            return patient.status === "Waiting";

        }).length;


    emergencyPatients.textContent =
        patients.filter(function(patient) {

            return patient.priority === "Emergency";

        }).length;

}


// Search Patient
searchPatient.addEventListener("input", function() {

    const searchText =
        searchPatient.value.toLowerCase();


    const filteredPatients =
        patients.filter(function(patient) {

            return patient.name
                .toLowerCase()
                .includes(searchText);

        });


    displayPatients(filteredPatients);

});

