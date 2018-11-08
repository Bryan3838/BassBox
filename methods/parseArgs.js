module.exports = async (command, args) => {
    let missingArgs = [];
    let parsed = {};

    let argsDefinitions = command.config.argsDefinitions
    for (let i = 0; i < argsDefinitions.length; i++) {
        if (!argsDefinitions[i].optional && !args[i]) {
            missingArgs.push(argsDefinitions[i].name);
        }
        parsed[argsDefinitions[i].name] = args[i];
    }
    
    if (missingArgs.length > 0) {
        parsed['missing'] = missingArgs;
    } else parsed['missing'] = false;

    return parsed;
}