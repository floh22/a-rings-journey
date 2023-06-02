export class StepMilestone {
    steps: number;
    milestone: string;

    constructor(steps: number, milestone: string) {
        this.steps = steps;
        this.milestone = milestone;
    }
}

export function getCurrentMilestone(steps: number): StepMilestone {
    const milestones = Milestones;
    let currentMilestone = milestones[0];
    milestones.forEach(element => {
        if (element.steps <= steps) {
            currentMilestone = element;
        }
    });
    return currentMilestone;
}

export function getNextMilestone(steps: number): StepMilestone {
    var sorted = Milestones.sort((a, b) => a.steps - b.steps);
    let nextMilestone = sorted[0];
    sorted = sorted.filter(element => element.steps > steps);
    if (sorted.length > 0) {
        nextMilestone = sorted[0];
    }
    return nextMilestone;
}

export const Milestones = [ 
    new StepMilestone(200000, "TomsHouse"),
    new StepMilestone(300000, "Bree"),
    new StepMilestone(500000, "Weathertop"),
    new StepMilestone(1500000, "Rivendell"),
    new StepMilestone(2000000, "Moria"),
    new StepMilestone(2500000, "Lothlorien"),
    new StepMilestone(3200000, "Rohan"),
    new StepMilestone(3800000, "BlackGate"),
    new StepMilestone(4663500, "MountDoom"),
    new StepMilestone(0, "DoorstepOfBagEnd")
];