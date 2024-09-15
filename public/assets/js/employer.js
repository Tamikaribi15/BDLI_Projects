// the create task modal
document.addEventListener("DOMContentLoaded", (event) => {
    const modalOverlay = document.getElementById("modalOverlay");
    const openModalButton = document.getElementById("openModal");
    const closeModalButton = document.getElementById("closeModal");
    try {
        openModalButton.addEventListener("click", () => {
            modalOverlay.classList.add("show");
        });

        closeModalButton.addEventListener("click", () => {
            modalOverlay.classList.remove("show");
        });


    } catch (error) {
        console.log(error);
    }


    // =============== notification group and haamburger group should not display together
    const notification = document.querySelector('#notification');
    const dropdown = document.querySelector('#dropdown');
    notification.addEventListener('click', function () {
        if (this.checked) {
            dropdown.checked = false;
        }

    });
    dropdown.addEventListener('click', function () {
        if (this.checked) {
            notification.checked = false;
        }
    });
});
