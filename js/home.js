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
  const headerHtml =
    "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
    "<th>Salary</th><th>Start Date</th><th>Actions</th>";
  if (employeePayrollList.length === 0) return;
  let innerHtml = `${headerHtml}`;
  for (const empPayrollData of employeePayrollList) {
    innerHtml = `${innerHtml}
      <tr>
        <td><img class="profile" src="${empPayrollData._profile}" alt=""></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDepartmentHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${stringifyDate(empPayrollData._startDate)}</td>
        <td>
          <img id="${empPayrollData._name}" onclick="removeEmployee(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
          <img id="${empPayrollData._name}" onclick="updateEmployee(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
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

const removeEmployee = (employee) => {
  let employeeIndex = employeePayrollList.findIndex(emp => emp._name === employee.id);
  if (employeeIndex === -1) return;
  employeePayrollList.splice(employeeIndex, 1);
  localStorage.setItem('EmployeePayrollList', JSON.stringify(employeePayrollList));
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
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