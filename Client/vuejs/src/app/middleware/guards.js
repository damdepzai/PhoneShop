

const isUndefined = (value) => {
    return value === undefined;
}

const evaluateGuards = (guards, to, from, next) => {
    const guardsLeft = guards.slice(0);
    const nextGuard = guardsLeft.shift();

    if (isUndefined(nextGuard)) {
        next();
        return;
    }

    nextGuard(to, from, (nextArg) => {
        if (isUndefined(nextArg)) {
            evaluateGuards(guardsLeft, to, from, next);
            return;
        }

        next(nextArg);
    });
}

export default (guards) => {
    if (!Array.isArray(guards)) {
        throw new Error('You must specify an array of guards');
    }

    return (to, from, next) => {
        return evaluateGuards(guards, to, from, next);
    };
}
