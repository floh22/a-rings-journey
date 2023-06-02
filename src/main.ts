import './style.css'
import { setupDistanceWalkedBanner } from './distanceWalkedBanner.ts';
import { setupHistoryDisplay } from './historyDisplay.ts';
import { setupStepInput } from './stepInput.ts';


setupDistanceWalkedBanner(document.querySelector<HTMLElement>('#headerCard')! ,document.querySelector<HTMLElement>('#totalMeters')!, document.querySelector<HTMLElement>('#todayMeters')!, document.querySelector<HTMLElement>('#totalSteps')!, document.querySelector<HTMLElement>('#todaySteps')!, document.querySelector<HTMLElement>('#distance-fill')!);

setupHistoryDisplay(document.querySelector<HTMLElement>('#history')!);

setupStepInput(document.querySelector<HTMLInputElement>('#stepInput')!, document.querySelector<HTMLButtonElement>('#submitButton')!, document.querySelector<HTMLInputElement>('#dateInput')!);