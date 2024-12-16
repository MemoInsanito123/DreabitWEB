document.addEventListener('DOMContentLoaded', () => {
    // Validación de los caracteres
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            const Invalidar = /[^a-zA-Z0-9ñÑ\s]/g;
            input.value = input.value.replace(Invalidar, '');
        });
});

    // Validación para las horas
    const timeInputs = document.querySelectorAll('input[type="time"]');
    timeInputs.forEach(input => {
        input.addEventListener('input', () => {
            validateTimeFormat(input);
        });
    });

    // Validación para enviar las tareas
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (event) => {
            if (form.id.includes('task')) {
                const startTimeInput = form.querySelector('input[id*="start_time"]');
                const endTimeInput = form.querySelector('input[id*="end_time"]');

                if (!validateTimeOrder(startTimeInput.value, endTimeInput.value)) {
                    event.preventDefault();
                    alert('La hora de inicio no puede ser mayor o igual a la hora de fin.');
                }
            }
        });
    });
});

// validación para que no sea una hora de inicio mayor o igual a la del final
function validateTimeOrder(startTime, endTime) {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
        return false;
    }
    return true;
}