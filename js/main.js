class EmployeePayrollData {
  constructor(name, profile, gender, departments, salary, startDate, notes) {
    this._name = name;
    this._profile = profile;
    this._gender = gender;
    this._departments = departments;
    this._salary = salary;
    this._startDate = startDate;
    this._notes = notes;
  }
  get name() {
      return this._name;
    }
    get profile() {
      return this._profile;
    }
  
    get gender() {
      return this._gender;
    }
  
    get departments() {
      return this._departments;
    }
  
    get salary() {
      return this._salary;
    }
  
    get startDate() {
      return this._startDate;
    }
  
    get notes() {
      return this._notes;
    }
  
    set name(name) {
      let nameRegex = RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}$");
      if (nameRegex.test(name)) {
        this._name = name;
      } else {
        throw "Name is incorrect!";
      }
    }
    set profile(profile) {
      this._profile = profile;
    }
  
    set gender(gender) {
      this._gender = gender;
    }
  
    set departments(departments) {
      this._departments = departments;
    }
  
    set salary(salary) {
      this._salary = salary;
    }
  
    set startDate(startDate) {
      let currentDate = new Date();
      let joinDate = new Date(startDate);
    
      if (joinDate > currentDate) {
        throw new Error("Start date cannot be a future date");
      }
    
      let thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
      this._startDate = joinDate;
    }
    
  
    set notes(notes) {
      this._notes = notes;
    }
    
    toString() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const empDate = this._startDate ? this._startDate.toLocaleDateString("en-US", options) : "undefined";
      return "name='" + this._name + ", gender='" + this._gender +
        ", profilePic='" + this._profile + ", department=" + this._departments +
        ",salary=" + this._salary + ", startDate=" + empDate + ", note=" + this._notes;
    }    
  }

  window.addEventListener( "DOMContentLoaded", (event) => {
    const name = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener('input', function() {
    if (name. value. length == 0) {
    textError.textContent = "";
    return;
    }
    try {
    new EmployeePayrollData().name = name.value;
    textError.textContent = '';
    } catch (e) {
    textError.textContent = e;
    }
  });
  const salary = document.querySelector("#salary");
  const output = document. querySelector(".salary-output");
  output.textContent = salary.value;
  salary.addEventListener("input", function() {
  output.textContent = salary.value;
  });

  const submitButton = document.querySelector("#submit");
  submitButton.addEventListener("click", save);
});
    
const save = () => {
  try {
    let employeePayrollData = createEmployeePayroll();
    console.log("employeePayrollData", employeePayrollData);
    createAndUpdateStorage(employeePayrollData);
  } catch (e) {
    console.error("Error while saving employee payroll data: ", e);
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
  let employeePayrollData = new EmployeePayrollData();
  try {
    employeePayrollData.name = getInputValueById('#name');
    employeePayrollData.profile = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.departments = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.startDate = date;
    alert(employeePayrollData.toString());
    return employeePayrollData;
  } catch (e) {
    console.error("Error while creating employee payroll data: ", e);
    throw e;
  }
};


const getSelectedValues = (propertyValue) => {
let allItems = document.querySelectorAll(propertyValue) ;
let selItems = [];
allItems.forEach(item => {
if(item.checked) selItems.push(item. value) ;
});
return selItems;
}

const getInputValueById = (id) => {
  let value = document. querySelector(id).value;
  return value;
}

const getInputElementValue = (id) => {
  let value = document.getElementById(id).value;
  return value;
}


function populateEmployeeData() {
  let name = document.getElementById("name").value;
  let profile = document.querySelector("input[name='profile']:checked").value;
  let gender = document.querySelector("input[name='gender']:checked").value;
  let departments = [];
  let departmentCheckboxes = document.querySelectorAll("input[name='department']:checked");
  departmentCheckboxes.forEach(function(checkbox) {
    departments.push(checkbox.value);
  });
  let salary = document.getElementById("salary").value;
  let startDate = document.getElementById("day").value + "-" + document.getElementById("month").value + "-" + document.getElementById("year").value;
  let notes = document.getElementById("notes").value;
  let employeeData = new EmployeePayrollData(name, profile, gender, departments, salary, startDate, notes);
  if (employeeData.validateData()) {
    console.log("Employee Data:", employeeData);
  } else {
    console.log("Validation Error: Invalid employee data");
  }
}

const resetForm = () => {
console.log("reset form");
setValue( '#name','');
unsetSelectedValues( ' [name=profilel]');
unsetSelectedValues( ' [name=gender] ');
unsetSelectedValues ( ' [name=department] ');
setValue('#salary','');
setValue('#notes','');
setValue('#day','1');
setValue('#month', 'January');
setValue('#year', '2020');
}

const unsetSelectedValues = (propertyValue) => {
let allItems = document. querySelectorAll(propertyValue) ;
allItems. forEach(item => {
item. checked = false;
});
}

const setTextValue = (id, value) => {
const element = document. querySelector( id);
element. textContent = value;
}

const setValue = (id, value) => {
const element = document. querySelector (id) ;
element. value = value;
}
