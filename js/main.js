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
    get Profile() {
      return this._profile;
    }
  
    get Gender() {
      return this._gender;
    }
  
    get Departments() {
      return this._departments;
    }
  
    get Salary() {
      return this._salary;
    }
  
    get StartDate() {
      return this._startDate;
    }
  
    get Notes() {
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
    set Profile(profile) {
      this._profile = profile;
    }
  
    set Gender(gender) {
      this._gender = gender;
    }
  
    set Departments(departments) {
      this._departments = departments;
    }
  
    set Salary(salary) {
      this._salary = salary;
    }
  
    set StartDate(startDate) {
      let currentDate = new Date();
      let joinDate = new Date(startDate);
  
      if (joinDate > currentDate) {
        throw new Error("Start date cannot be a future date");
      }
  
      let thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
      if (joinDate < thirtyDaysAgo) {
        throw new Error("Start date should be within 30 days of joining");
      }
  
      this._startDate = startDate;
    }
  
    set Notes(notes) {
      this._notes = notes;
    }
    
    toString() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const empDate = !this.startDate ? "undefined":
      this.startDate. toLocaleDateString("en-US", options);
      return "id=" + this.id +", name='" + this.name +", gender='" + this.gender +
      ", profilePic='" + this.profilePic + ", department=" + this.department +
       ",salary=" + this.salary +", startDate=" + empDate + ", note="+ this.note; 
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
});
    
  const save = () => {
    try {
    let employeePayrollData = createEmployeePayroll();
    console.log("employeePayrollData",employeePayrollData);
    createAndUpdateStorage(employeePayrollData);
    console.log("All Data: ",JSON.parse(localStorage.getItem("EmployeePayrollList")));
    } catch (e) {
    return;
    }
  }

  function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined) {
    employeePayrollList.push(employeePayrollData) ;
    } else{
    employeePayrollList = [employeePayrollData]
    }
    alert (employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList) )
    }

const createEmployeePayroll = () => {
let employeePayrollData = new EmployeePayrollData();
try {
employeePayrollData.name = getInputValueById('#name');
} catch (e) {
setTextValue('.text-error', e);
throw e;
}
employeePayrollData.profilePic = getSelectedValues(' [name=profile]').pop();
employeePayrollData.gender = getSelectedValues(' [name=gender]').pop();
employeePayrollData.department = getSelectedValues(' [name=department] ');
employeePayrollData.salary = getInputValueById('#salary');
employeePayrollData.note = getInputValueById('#notes');
let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+
getInputValueById('#year') ;
employeePayrollData.date = Date.parse(date) ;
alert(employeePayrollData.toString());
return employeePayrollData;
}

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
    
  