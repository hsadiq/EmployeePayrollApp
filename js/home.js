window.addEventListener( 'DOMContentLoaded', (event) => {
    createInnerHtml();
    
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" + "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
  
    employeePayrollList.forEach((employee) => {
      innerHtml += `
        <tr>
          <td><img class="profile" alt="" src="../assets/profile-images/Ellipse -2.png"></td>
          <td>${employee.name}</td>
          <td>${employee.gender}</td>
          <td>${getDepartmentHtml(employee.department)}</td>
          <td>${employee.salary}</td>
          <td>${employee.startDate}</td>
          <td>
            <img id="${employee.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
            <img id="${employee.id}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
          </td>
        </tr>
      `;
    });
  
    document.querySelector("#table-display").innerHTML = innerHtml;
  };


  const getDepartmentHtml = (departmentList) => {
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

const employeePayrollList = [];

const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        console.log("employeePayrollData", employeePayrollData);
        createAndUpdateStorage(employeePayrollData);
        console.log("All Data: ", JSON.parse(localStorage.getItem("EmployeePayrollList")));
        const dbData = JSON.stringify(employeePayrollData);
        fs.writeFileSync('db.json', dbData);
        console.log('Data saved to db.json successfully!');
    } catch (e) {
        return;
    }

    function createAndUpdateStorage(employeePayrollData) {
        let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
        if (employeePayrollList != undefined) {
            employeePayrollList.push(employeePayrollData);
        } else {
            employeePayrollList = [employeePayrollData]
        }
        alert(employeePayrollList.toString());
        localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
    }

    employeePayrollList.push(employeePayrollData);
    alert("Employee added successfully!");
    resetForm();
};

// Function to populate employee payroll details in table format
const createEmployeePayrollJSON = () => {
    const tableDataContainer = document.getElementById("tableData");

    tableDataContainer.innerHTML = "";

    const departments = ["HR", "Sales", "Finance", "Engineer", "Others"];
    departments.forEach((department) => {
        const departmentEmployees = employeePayrollList.filter(
            (employee) => employee.department === department
        );

        if (departmentEmployees.length > 0) {
            const table = document.createElement("table");
            table.innerHTML = `
            <caption>${department} Department</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Salary</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          `;
            const tbody = table.querySelector("tbody");
            departmentEmployees.forEach((employee) => {
                const row = document.createElement("tr");
                row.innerHTML = `
              <td>${employee.name}</td>
              <td>${employee.gender}</td>
              <td>${employee.salary}</td>
              <td>${employee.startDate}</td>
            `;
                tbody.appendChild(row);
            });


            const dbData = JSON.stringify(employeePayrollList);
            fs.writeFileSync('db.json', dbData);

            console.log('Data saved to db.json successfully!');

            tableDataContainer.appendChild(table);
        }
    });
};

const resetForm = () => {
    console.log("reset form");
    setValue('#name', '');
    unsetSelectedValues(' [name=profilel]');
    unsetSelectedValues(' [name=gender] ');
    unsetSelectedValues(' [name=department] ');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2020');
    createEmployeePayrollJSON();
};