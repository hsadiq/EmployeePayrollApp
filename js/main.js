class EmployeePayroll {
  constructor() {
    this.name = "";
    this.profile = "";
    this.gender = "";
    this.department = [];
    this.salary = 0;
    this.notes = "";
  }

  setName(name) {
    if (name && name.trim().length >= 3 && /^[A-Z][A-Za-z\s]*$/.test(name)) {
      this.name = name.trim();
    } else {
      throw new Error("Invalid name! Name must start with a capital letter and have a minimum of 3 characters.");
    }
  }

  setProfile(profile) {
    if (profile && profile.trim().length > 0) {
      this.profile = profile.trim();
    } else {
      throw new Error("Invalid profile image!");
    }
  }

  setGender(gender) {
    if (gender === "male" || gender === "female") {
      this.gender = gender;
    } else {
      throw new Error("Invalid gender!");
    }
  }

  setDepartment(department) {
    if (Array.isArray(department)) {
      this.department = department;
    } else {
      throw new Error("Invalid department!");
    }
  }

  setSalary(salary) {
    if (typeof salary === "number" && salary >= 0) {
      this.salary = salary;
    } else {
      throw new Error("Invalid salary!");
    }
  }

  setNotes(notes) {
    if (notes && notes.trim().length > 0) {
      this.notes = notes.trim();
    } else {
      this.notes = "";
    }
  }
}

function save() {
  try {
    const employee = new EmployeePayroll();

    const name = document.getElementById("name").value;
    const profile = document.querySelector(
      'input[name="profile"]:checked'
    ).value;
    const gender = document.querySelector(
      'input[name="gender"]:checked'
    ).value;
    const department = Array.from(
      document.querySelectorAll('input[name="department"]:checked')
    ).map((checkbox) => checkbox.value);
    const salary = document.getElementById("salary").valueAsNumber;
    const notes = document.getElementById("notes").value;

    employee.setName(name);
    employee.setProfile(profile);
    employee.setGender(gender);
    employee.setDepartment(department);
    employee.setSalary(salary);
    employee.setNotes(notes);


    console.log(employee);

    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `
      <p>Name: ${employee.name}</p>
      <p>Profile: ${employee.profile}</p>
      <p>Gender: ${employee.gender}</p>
      <p>Department: ${employee.department.join(", ")}</p>
      <p>Salary: ${employee.salary}</p>
      <p>Notes: ${employee.notes}</p>
    `;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

const salaryRange = document.getElementById('salary');
const salaryOutput = document.querySelector('.salary-output');

salaryRange.addEventListener('input', function() {
  salaryOutput.textContent = salaryRange.value;
});
