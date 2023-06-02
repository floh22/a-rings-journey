import { getCookie, setMaxAgeCookie } from "./cookies";

export function getHistory(): HistoryElement[] {
    const history = getCookie('history');
    //map json to HistoryElement
    if (history) {
        const historyElement = JSON.parse(history);
        return historyElement.map((element: any) => new HistoryElement(element.steps, new Date(element.date)));
    }
    return [];
}

export function addHistoryElement(steps: number, date: Date) {
    const history = getHistory();
    const historyElement = history.find(element => element.date.toDateString() === date.toDateString());
    if (historyElement) {
        historyElement.steps += steps;
        setHistory(history);
        return;
    }

    const newHistoryElement = new HistoryElement(steps, date);
    history.push(newHistoryElement);
    setHistory(history);
}

export function setHistory(history: HistoryElement[]) {
    setMaxAgeCookie('history', JSON.stringify(history));
}

export function editHistoryElement(steps: number, date: Date) {
    const history = getHistory();
    const historyElement = history.find(element => element.date.toDateString() === date.toDateString());
    if (historyElement) {
        historyElement.steps = steps;
        setHistory(history);
    }
}

export function removeHistoryElement(date: Date) {
    const history = getHistory();
    const historyElement = history.find(element => element.date.toDateString() === date.toDateString());
    if (historyElement) {
        const index = history.indexOf(historyElement);
        history.splice(index, 1);
        setHistory(history);
    }
}

export class HistoryElement {
    steps: number;
    date: Date;

    constructor(steps: number, date: Date) {
        this.steps = steps;
        this.date = date;
    }
}