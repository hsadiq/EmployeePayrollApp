const salaryRange = document.getElementById('salary');
const salaryOutput = document.querySelector('.salary-output');

salaryRange.addEventListener('input', function() {
  salaryOutput.textContent = salaryRange.value;
});