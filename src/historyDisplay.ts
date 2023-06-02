//Get the ul element history. Populate the ul with elements containing the history in order by date. Each element should contain the date and the number of steps taken on that date. The date should be formatted as YYYY-MM-DD. The number of steps should be formatted as a number with a thousands separator. The ul should be sorted by date, with the most recent date at the top. The ul should be empty if there is no history.

import { updateMetersWalkedBanner } from "./distanceWalkedBanner";
import { editHistoryElement, getHistory, removeHistoryElement } from "./history";

var historyElement: HTMLElement;

export function setupHistoryDisplay(hElement: HTMLElement) {
    historyElement = hElement;

    const history = getHistory().sort((a, b) => b.date.getTime() - a.date.getTime());
    history.reverse();

    const touchSupported = ('ontouchstart' in window);
    const pointerSupported = ('pointerdown' in window);

    var skipClickDelay = function (e: any) {
        e.preventDefault();
        e.target.click();
    }

    var setAriaAttr = function (el: any, ariaType: any, newProperty: any) {
        el.setAttribute(ariaType, newProperty);
    };

    var setAccordionAria = function (el1: any, el2: any, expanded: any) {
        switch (expanded) {
            case "true":
                setAriaAttr(el1, 'aria-expanded', 'true');
                setAriaAttr(el2, 'aria-hidden', 'false');
                break;
            case "false":
                setAriaAttr(el1, 'aria-expanded', 'false');
                setAriaAttr(el2, 'aria-hidden', 'true');
                break;
            default:
                break;
        }
    };

    var switchAccordion = function (e: any) {
        e.preventDefault();
        var thisAnswer = e.target.parentNode.nextElementSibling;
        var thisQuestion = e.target;
        if (thisAnswer.classList.contains('is-collapsed')) {
            setAccordionAria(thisQuestion, thisAnswer, 'true');
        } else {
            setAccordionAria(thisQuestion, thisAnswer, 'false');
        }
        thisQuestion.classList.toggle('is-collapsed');
        thisQuestion.classList.toggle('is-expanded');
        thisAnswer.classList.toggle('is-collapsed');
        thisAnswer.classList.toggle('is-expanded');

        thisAnswer.classList.toggle('animateIn');
    };

    history.forEach(element => {
        if (!element.date) {
            return;
        }
        if (!element.steps) {
            return;
        }

        const dt = document.createElement('dt');
        const a = document.createElement('a');
        const name = `history-${element.date.toISOString().slice(0, 10)}`;
        a.href = name;
        a.ariaExpanded = 'false';
        a.classList.add('accordion-title');
        a.classList.add('accordinon-trigger');
        a.classList.add('accordionTitle');
        a.innerHTML = `${element.date.toISOString().slice(0, 10)}: ${element.steps.toLocaleString()}`;

        dt.appendChild(a);

        const dd = document.createElement('dd');
        dd.classList.add('accordion-content');
        dd.classList.add('is-collapsed');
        dd.classList.add('accordionItem');
        dd.ariaHidden = 'true';
        dd.id = name;

        //add edit and delete button as child of dd
        const editButton = document.createElement('button');
        editButton.classList.add('button');
        editButton.classList.add('is-small');
        editButton.classList.add('is-primary');
        editButton.innerHTML = 'Edit';
        editButton.addEventListener('click', () => {
            const steps = parseInt(prompt('Enter new steps', element.steps.toString())!);
            if (steps) {
                editHistoryElement(steps, element.date);
                updateHistoryDisplay();
                updateMetersWalkedBanner();
            }
        }
        );
        dd.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('button');
        deleteButton.classList.add('is-small');
        deleteButton.classList.add('is-danger');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () => {
            removeHistoryElement(element.date);
            updateHistoryDisplay();
            updateMetersWalkedBanner();
        }
        );
        dd.appendChild(deleteButton);

        historyElement.appendChild(dt);
        historyElement.appendChild(dd);

        if (touchSupported) {
            a.addEventListener('touchstart', skipClickDelay, false);
        }
        if (pointerSupported) {
            a.addEventListener('pointerdown', skipClickDelay, false);
        }
        a.addEventListener('click', switchAccordion, false);
    });
}

export function updateHistoryDisplay() {
    historyElement.innerHTML = '';
    setupHistoryDisplay(historyElement);
}