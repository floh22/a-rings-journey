import { addHistoryElement } from "./history";
import { updateHistoryDisplay } from "./historyDisplay";
import { updateMetersWalkedBanner } from "./distanceWalkedBanner";

export function setupStepInput(element: HTMLInputElement, submitButton: HTMLButtonElement, dateInput: HTMLInputElement) {
    element.addEventListener('input', () => {
        submitButton.disabled = !element.checkValidity();
    });
    element.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            submitButton.click();
        }
    }
    );

    //default date to today with timezone
    const today = new Date();
    const offset = today.getTimezoneOffset();
    today.setMinutes(today.getMinutes() - offset);
    dateInput.valueAsDate = today;

    submitButton.addEventListener('click', () => {
        const steps = parseInt(element.value);
        if (!steps || steps < 0) {
            return;
        }
        const date = dateInput.valueAsDate!;
        addHistoryElement(steps, date);
        updateHistoryDisplay();
        updateMetersWalkedBanner();
        element.value = '';
        submitButton.disabled = true;
    }
    );
}