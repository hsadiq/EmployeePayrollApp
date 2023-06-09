class EmployeePayrollData {
  get id() {
    return this._1d;
  }

  set id(id) {
    this.id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if (nameRegex.test(name))
      this._name = name;
    else
      throw new Error('Name is Incorrect!');
  }

  get profilePic() {
    return this._profitePic;
  }

  set profilePic(profilepic) {
    this._profilePic = profilePic;
  }

  get gender() {
    return this._gender;
  }

  set gender(gender) {
    this._gender = gender;
  }

  get department() {
    return this._departnent;
  }

  set department(department) {
    this.department = department;
  }

  get salary() {
    return this._salary;
  }

  set salary(salary) {
    this._salary = salary;
  }

  get note() {
    return this.note;
  }

  set note(note) {
    this._note = note;
  }

  get startDate() {
    return this._startDate;
  }

  set startDate(startDate) {
    this._startDate = startDate;
  }

  toString() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const empDate = !this.startDate
      ? "undefined"
      : this.startDate.toLocaleDateString("en-US", options);
    return (
      "id=" +
      this.id +
      ", name=" +
      this.name +
      ", gender=" +
      this.gender +
      ", profilePic=" +
      this.profilePic +
      ", department=" +
      this.department +
      ", salary=" +
      this.salary +
      ", startDate=" +
      endDate +
      ", note=" +
      this.note
    );
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      textError.textContent = '';
      return;
    }

    try {
      new EmployeePayrollData().name = name.value;
      textError.textContent = '';
    } catch (e) {
      textError.textContent = e.message;
    }
  });

  const salary = document.querySelector("#salary");

  const output = document.querySelector(".salary-output");
  output.textContent = salary.value;
  salary.addEventListener("input", function () {
    output.textContent = salary.value;
  });
});

function save() {
  try {
    const employee = new EmployeePayrollData();

    const name = document.getElementById("name").value;
    const profile = document.querySelector('input[name="profile"]:checked')
      .value;
    const gender = document.querySelector('input[name="gender"]:checked')
      .value;
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

const salaryRange = document.getElementById("salary");
const salaryOutput = document.querySelector(".salary-output");

salaryRange.addEventListener("input", function () {
  salaryOutput.textContent = salaryRange.value;
});

function setValue(id, value) {
  const element = document.querySelector(id);
  element.value = value;
}

function unsetSelectedValues(propertyValue) {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach((item) => {
    item.checked = false;
  });
}

function resetForm() {
  setValue("#name", "");
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue("#salary", "");
  setValue("#notes", "");
  setValue("#day", "1");
  setValue("#month", "January");
  setValue("#year", "2020");
}
