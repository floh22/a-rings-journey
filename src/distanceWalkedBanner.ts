import { getHistory } from './history.ts';
import { getCurrentMilestone, getNextMilestone } from './milestone.ts';
import { stepToMeter } from './stepToMeter.ts';

export function getMetersWalked(): number {
    const history = getHistory();
    let meters = 0;
    history.forEach(element => {
      meters += stepToMeter(element.steps);
    });
    return meters;
}

export function getStepsWalked(): number {
    const history = getHistory();
    let steps = 0;
    history.forEach(element => {
      steps += element.steps;
    });
    return steps;
}


export function getMetersWalkedToday(): number {
    const history = getHistory();
    const today = new Date();
    const todayHistory = history.find(element => element.date && element.date.toDateString() === today.toDateString());
    if (todayHistory) {
        return stepToMeter(todayHistory.steps);
    }
    return 0;
}

export function getStepsWalkedToday(): number {
    const history = getHistory();
    const today = new Date();
    const todayHistory = history.find(element => element.date && element.date.toDateString() === today.toDateString());
    if (todayHistory) {
        return todayHistory.steps;
    }
    return 0;
}

var allElement: HTMLElement;
var todayElement: HTMLElement;
var allStepsElement: HTMLElement;
var todayStepsElement: HTMLElement;
var distanceFillElement: HTMLElement;
var headerElement: HTMLElement;


export function setupDistanceWalkedBanner(hElement: HTMLElement, aElement: HTMLElement, tElement: HTMLElement, aStepsElement: HTMLElement, tStepsElement: HTMLElement, dfElement: HTMLElement) {
    headerElement = hElement;
    allElement = aElement;
    todayElement = tElement;
    allStepsElement = aStepsElement;
    todayStepsElement = tStepsElement;
    distanceFillElement = dfElement;
    const metersWalked = getMetersWalked();
    const metersWalkedToday = getMetersWalkedToday();
    const stepsWalked = getStepsWalked();
    const stepsWalkedToday = getStepsWalkedToday();

    allElement.innerHTML = `${(metersWalked / 1000).toFixed(2)}km`;
    allStepsElement.innerHTML = `${stepsWalked}`;

    if (metersWalkedToday >= 1000) {
        todayElement.innerHTML = `${(metersWalkedToday / 1000).toFixed(2)}km`;
    }
    else {
        todayElement.innerHTML = `${metersWalkedToday.toFixed(0)}m`;
    }
    todayStepsElement.innerHTML = `${stepsWalkedToday}`;

    var totalStepsToCurrentMilestone = getCurrentMilestone(stepsWalked).steps;
    var totalStepsToNextMilestone = getNextMilestone(stepsWalked).steps;

    var stepsInNextMilestone = totalStepsToNextMilestone - totalStepsToCurrentMilestone;
    var stepsTakenInMilestone = stepsWalked - totalStepsToCurrentMilestone;
    var percentage = stepsTakenInMilestone / stepsInNextMilestone;

    distanceFillElement.style.width = `${percentage * 100}%`;

    headerElement.style.backgroundImage = `url(./assets/${getCurrentMilestone(stepsWalked).milestone}.png)`;
}

export function updateMetersWalkedBanner() {
    allElement.innerHTML = '';
    todayElement.innerHTML = '';
    setupDistanceWalkedBanner(headerElement, allElement, todayElement, allStepsElement, todayStepsElement, distanceFillElement);
}