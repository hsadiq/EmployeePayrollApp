// Define the makeServiceCall function for making HTTP requests
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
  
  let empPayrollList;
  window.addEventListener('DOMContentLoaded', (event) => {
      if (site_properties.use_local_storage.match("true")) {
          getEmployeePayrollDataFromStorage();
      } else {
          getEmployeePayrollDataFromServer();
      }
  });
  
  const processEmployeePayrollDataResponse = () => {
      document.querySelector(".emp-count").textContent = empPayrollList.length;
      createInnerHtml();
      localStorage.removeItem('editEmp');
  }
  
  const getEmployeePayrollDataFromStorage = () => {
      empPayrollList = localStorage.getItem('EmployeePayrollList') ?
          JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
      processEmployeePayrollDataResponse();
  }
  
  const getEmployeePayrollDataFromServer = () => {
      makeServiceCall("GET", site_properties.server_url, true)
          .then(responseText => {
              empPayrollList = JSON.parse(responseText);
              processEmployeePayrollDataResponse();
          })
          .catch(error => {
              console.log("GET Error Status: " + JSON.stringify(error));
              empPayrollList = [];
              processEmployeePayrollDataResponse();
          });
  }
  
  /* Template Literal ES6 feature */
  const createInnerHtml = () => {
      if (empPayrollList.length == 0) return;
      const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
      let innerHtml = `${headerHtml}`;
      for (const empPayrollData of empPayrollList) {
          innerHtml = `${innerHtml}  
      <tr>
      <td><img class="profile" src="${empPayrollData._profilePic}" alt=""></td>
      <td>${empPayrollData._name}</td>
      <td>${empPayrollData._gender}</td>
      <td>${getDeptHtml(empPayrollData._department)}</td> 
      <td>${empPayrollData._salary}</td>
      <td>${stringifyDate(empPayrollData._startDate)}</td>
      <td>
         <img id="${empPayrollData.id}"  onclick="remove(this)" 
              src="../Assets/icons/delete-black-18dp.svg" alt="delete">
         <img id="${empPayrollData.id}"  onclick="update(this)" 
              src="../Assets/icons/create-black-18dp.svg" alt="edit">  
      </td>
      </tr>
      `;
      }
      document.querySelector('#table-display').innerHTML = innerHtml;
  }
  
  const getDeptHtml = (deptList) => {
      let deptHtml = '';
      for (const dept of deptList) {
          deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
      }
      return deptHtml;
  }
  
  //D46UC1
  const remove = (node) => {
      let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
      if (!empPayrollData) return;
      const index = empPayrollList
          .map(empData => empData.id)
          .indexOf(empPayrollData.id);
      empPayrollList.splice(index, 1);
      localStorage.setItem('EmployeePayrollList', JSON.stringify(empPayrollList));
      document.querySelector('.emp-count').textContent = empPayrollList.length;
      createInnerHtml();
  }
  