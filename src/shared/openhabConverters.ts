export function getLevelFromState(state: string | number | undefined) : number {
    if (state === "ON") {
        return 100;
    }
    if (state === "OFF") {
        return 0;
    }
    if (typeof state == "string") {
        const result = parseInt(state, 10);
        if (isNaN(result)) {
            return 0;
        }
        return result;
    }
    if (typeof state === "number") {
        return state;
    }
    return 0;
};

export function getSwitchStateFromOh(dimmerValue: number | undefined | string) :boolean {
    if (typeof dimmerValue === 'number' && dimmerValue > 0) {
        return true;
    }
    if (dimmerValue === "ON") {
        return true;
    }
    return false;
}
