const makeServiceCall = (method, url, async = true, data = null) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 201) {
            resolve(xhr.responseText);
          } else {
            reject(xhr.statusText);
          }
        }
      };
      xhr.onerror = function () {
        reject("Network Error");
      };
      xhr.open(method, url, async);
      if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send();
      }
    });
  };
  
  let isUpdate = false;
  let employeePayrollObj = {};
  
  window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input', function () {
      if (name.value.length == 0) {
        setTextValue('.text-error', "");
        return;
      }
      try {
        checkName(name.value);
        setTextValue('.text-error', "");
      } catch (e) {
        setTextValue('.text-error', e);
      }
    });
  
    const date = document.querySelector('#date');
    date.addEventListener('input', function () {
      let startDate = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
        getInputValueById('#year');
      try {
        checkStartDate(new Date(Date.parse(startDate)));
        setTextValue('.date-error', "");
      } catch (e) {
        setTextValue('.date-error', e);
      }
    });
  
    const salary = document.querySelector('#salary');
    setTextValue('.salary-output', salary.value);
    salary.addEventListener('input', function () {
      setTextValue('.salary-output', salary.value);
    });
  
    document.querySelector('#cancelButton').href = site_properties.home_page;
    checkForUpdate();
  });
  
  const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      setEmployeePayrollObject();
      if (site_properties.use_local_storage.match("true")) {
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
      } else {
        createOrUpdateEmployeePayroll();
      }
    } catch (e) {
      return;
    }
  };
  
  const createOrUpdateEmployeePayroll = () => {
    let postURL = site_properties.server_url;
    let methodCall = "POST";
    if (isUpdate) {
      methodCall = "PUT";
      postURL = postURL + "/EmployeePayrollDB/" + employeePayrollObj.id.toString();
    }
    makeServiceCall(methodCall, postURL, true, employeePayrollObj)
      .then(responseText => {
        resetForm();
        window.location.replace(site_properties.home_page);
      })
      .catch(error => {
        throw error;
      });
  };
  
  
  const setEmployeePayrollObject = () => {
    if (!isUpdate && site_properties.use_local_storage.match("true")) {
      employeePayrollObj.id = createNewEmployeeId();
    }
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
      getInputValueById('#year');
    employeePayrollObj._startDate = date;
  };
  
  const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];
    let empPayrollData = employeePayrollList.find(empData => empData.id == employeePayrollObj.id);
    if (!empPayrollData) {
      employeePayrollList.push(employeePayrollObj);
    } else {
      const index = employeePayrollList.map(empData => empData.id).indexOf(empPayrollData.id);
      employeePayrollList.splice(index, 1, employeePayrollObj);
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
  }
  
  const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
  }
  
  const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
      if (item.checked) selItems.push(item.value);
    });
    return selItems;
  }
  
  const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
  }
  
  const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
  }
  
  const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
      if (Array.isArray(value)) {
        if (value.includes(item.value)) {
          item.checked = true;
        }
      } else if (item.value === value) {
        item.checked = true;
      }
    });
  }
  
  const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setSelectedIndex('#day', 0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year', 0);
  }
  
  const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
      item.checked = false;
    });
  }
  
  const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
  }
  
  const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
  }
  
  const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
  }
  
  const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
  }
  
  const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
      employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
      setTextValue('.text-error', e);
      throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
      getInputValueById('#year');
    employeePayrollData.startDate = date;
    alert(employeePayrollData.toString());
    return employeePayrollData;
  }
  