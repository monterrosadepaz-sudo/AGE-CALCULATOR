document.getElementById("calculateButton").addEventListener("click", function () {
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    // Limpiar errores previos
    ["day", "month", "year"].forEach(id => {
        document.getElementById(id).classList.remove("error");
        document.getElementById("error-" + id).textContent = "";
    });

    let hasError = false;

    // Validación NOT NULL y tipo numérico
    if (isNaN(day)) {
        dayInput.classList.add("error");
        document.getElementById("error-day").textContent = "This field is required";
        hasError = true;
    }
    if (isNaN(month)) {
        monthInput.classList.add("error");
        document.getElementById("error-month").textContent = "This field is required";
        hasError = true;
    }
    if (isNaN(year)) {
        yearInput.classList.add("error");
        document.getElementById("error-year").textContent = "This field is required";
        hasError = true;
    }

    if (hasError) return;

    // Validación de fecha lógica
    if (isValidDate(day, month, year)) {
        calculateAge(day, month, year);
    } else {
        ["day", "month", "year"].forEach(id => {
            document.getElementById(id).classList.add("error");
            document.getElementById("error-" + id).textContent = "Must be a valid date";
        });
        document.getElementById("years").textContent = "Years: --"; 
        document.getElementById("months").textContent = "Months: --"; 
        document.getElementById("days").textContent = "Days: --"; 
    }
});

function isValidDate(day, month, year) {
    const fecha = new Date(year, month - 1, day);
    const hoy = new Date();

    if (
        fecha.getDate() !== day ||
        fecha.getMonth() !== month - 1 ||
        fecha.getFullYear() !== year ||
        fecha > hoy
    ) {
        return false;
    }

    return true;
}

function calculateAge(day, month, year) {
    const hoy = new Date();
    const nacimiento = new Date(year, month - 1, day);

    let año = hoy.getFullYear() - nacimiento.getFullYear();
    let mes = hoy.getMonth() - nacimiento.getMonth();
    let dia = hoy.getDate() - nacimiento.getDate();

    if (dia < 0) {
        mes--;
        dia += new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
    }

    if (mes < 0) {
        año--;
        mes += 12;
    }

    document.getElementById("years").textContent = "Years: " + año;
    document.getElementById("months").textContent = "Months: " + mes;
    document.getElementById("days").textContent = "Days: " + dia;
}


