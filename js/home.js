window. addEventListener( 'DOMContentLoaded', (event) => {
    createInnerHtml();
    
});
const createInnerHtml = () => {
   const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+ "<th>Salary</th><th>Start Date</th><th>Actions</th>";
   const innerHtml = ` ${headerHtml}
   <tr>
        <td><img class="profile" alt="" src="../assets/profile-images/Ellipse -2.png"></td>
        <td>Sadiq Hussain</td>
        <td>Male</td>
        <td><div class='dept-label'>HR</div>
            <div class='dept-label'>Finance</div></td>
        <td>3000000</td>
        <td>1 Nov 2020</td>
        <td>
            <img id="1" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
            <img id="1" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
        </td>
   </tr>
   `;
   document.querySelector("#table-display").innerHTML = innerHtml;
   }

   const remove = (element) => {
    element.parentNode.parentNode.remove();
}

function update(element) {
    let row = element.parentNode.parentNode;
    let cells = row.getElementsByTagName("td");

    let name = cells[1].innerText;
    let gender = cells[2].innerText;
    let department = cells[3].innerText;
    let salary = cells[4].innerText;
    let startDate = cells[5].innerText;

    document.querySelector("#edit-name").value = name;
    document.querySelector("#edit-gender").value = gender;
    document.querySelector("#edit-department").value = department;
    document.querySelector("#edit-salary").value = salary;
    document.querySelector("#edit-startDate").value = startDate;
}
