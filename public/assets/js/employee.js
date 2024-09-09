
// =============== function for allowing drop
function allowDrop(event) {
  event.preventDefault();
}

// ================= function for item drag
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
  event.target.classList.add('dragging');
}

// =============== function for item drop
function drop(event, status) {
  event.preventDefault();
  event.target.style.minHeight = '';
  if (event.target.id !== "todos" && event.target.id !== "completed") {
    return;
  }
  let data = event.dataTransfer.getData("text");
  let element = document.getElementById(data);

  if (element) {
    element.classList.remove('dragging');
    // ======= change status
    element.querySelector("p#status").innerText = status;

    // Get values from the dragged element
    const taskId = element.querySelector('p#taskId').innerText;

    // Populate hidden form fields
    document.getElementById('formStatus').value = status;
    document.getElementById('formId').value = taskId;

    // Submit the form to reload the page
    document.getElementById('taskForm').submit();



    // Move the element to the new section
    event.target.appendChild(element);
  } else {
    console.error("Element not found:", data);
  }
}

// ===================== testing drag effect ====================
function resetEffect(event) {
  let data = event.dataTransfer.getData("text");
  let element = document.getElementById(data);
  if (element) {
    element.classList.remove('dragging');
  }
}

// notification group and haamburger group should not display together
const notification = document.querySelector('.notification');
const dropdown = document.querySelector('.dropdown');
notification.addEventListener('change', function () {
  if (this.checked) {
    dropdown.checked = false;
  }
});
dropdown.addEventListener('change', function () {
  if (this.checked) {
    notification.checked = false;
  }
});