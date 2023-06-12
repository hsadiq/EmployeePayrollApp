class EmployeePayrollData {
  constructor(name, profile, gender, department, salary, startDate, notes) {
    this._name = name;
    this._profile = profile;
    this._gender = gender;
    this._department = department;
    this._salary = salary;
    this._startDate = startDate;
    this._notes = notes;
  }
}
window.addEventListener('DOMContentLoaded', (event) => {
  employeePayrollList = getEmployeePayrollDataFromStorage();
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
  return localStorage.getItem('EmployeePayrollList') ?
    JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
};

const createInnerHtml = () => {
  const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
    "<th>Salary</th><th>Start Date</th><th>Actions</th>";
  if (employeePayrollList.length == 0) return;
  let innerHtml = `${headerHtml}`;
  for (const empPayrollData of employeePayrollList) {
    innerHtml = `${innerHtml}
      <tr>
        <td><img class="profile" src="${empPayrollData._profilePic}" alt=""></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDepartmentHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${stringifyDate(empPayrollData._startDate)}</td>
        <td>
          <img id="${empPayrollData._id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
          <img id="${empPayrollData._id}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
        </td>
      </tr>`;
  }
  document.querySelector('#table-display').innerHTML = innerHtml;
};

const getDepartmentHtml = (departmentList) => {
  if (!departmentList || departmentList.length === 0) return '';
  let departmentHtml = '';
  departmentList.forEach((department) => {
    departmentHtml += `<div class='dept-label'>${department}</div>`;
  });
  return departmentHtml;
};

const remove = (element) => {
  const employeeIndex = employeePayrollList.findIndex((employee) => employee.id === element.id);
  if (employeeIndex !== -1) {
    employeePayrollList.splice(employeeIndex, 1);
    createInnerHtml();
  }
};

const save = () => {
  try {
    let employeePayrollData = createEmployeePayroll();
    console.log("employeePayrollData", employeePayrollData);
    createAndUpdateStorage(employeePayrollData);
    console.log("All Data: ", JSON.parse(localStorage.getItem("EmployeePayrollList")));
    const dbData = JSON.stringify(employeePayrollData);
  } catch (e) {
    return;
  }
};

function createAndUpdateStorage(employeePayrollData) {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if (employeePayrollList != undefined) {
    employeePayrollList.push(employeePayrollData);
  } else {
    employeePayrollList = [employeePayrollData];
  }
  alert(employeePayrollList.toString());
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
  resetForm();
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
}

const createEmployeePayroll = () => {
  let name = document.getElementById("name").value;
  let profile = getSelectedValue("[name=profile]");
  let gender = getSelectedValue("[name=gender]");
  let departments = getSelectedValues("[name=department]");
  let salary = document.getElementById("salary").value;
  let startDate = getDateValue();
  let notes = document.getElementById("notes").value;

  return new EmployeePayrollData(name, profile, gender, departments, salary, startDate, notes);
};

const getSelectedValue = (name) => {
  const element = document.querySelector(name + ":checked");
  if (element) {
    return element.value;
  }
  return "";
};

const getSelectedValues = (name) => {
  const elements = document.querySelectorAll(name + ":checked");
  const values = [];
  elements.forEach((element) => {
    values.push(element.value);
  });
  return values;
};

const getDateValue = () => {
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;
  return `${day}-${month}-${year}`;
};

const resetForm = () => {
  console.log("reset form");
  setValue('#name', '');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary', '');
  setValue('#notes', '');
  setValue('#day', '1');
  setValue('#month', 'January');
  setValue('#year', '2020');
};

// Helper function to set the value of an element
const setValue = (id, value) => {
  const element = document.querySelector(id);
  if (element) {
    element.value = value;
  }
};

// Helper function to unset the selected values of radio buttons or checkboxes
const unsetSelectedValues = (name) => {
  const elements = document.querySelectorAll(name);
  elements.forEach((element) => {
    element.checked = false;
  });
};

// Helper function to stringify a date object in "dd-mm-yyyy" format
const stringifyDate = (date) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-IN', options);
  return newDate;
};