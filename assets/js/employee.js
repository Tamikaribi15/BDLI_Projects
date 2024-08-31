function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
  event.target.classList.add('dragging');
}

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
    // Change status based on the drop target
    element.querySelector("p#status").innerText = status;

    // Move the element to the new section
    event.target.appendChild(element);
  } else {
    console.error("Element not found:", data);
  }
}

// ===================== testing drag effect ====================
function resetEffect(event) {
    var data = event.dataTransfer.getData("text");
    var element = document.getElementById(data);
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