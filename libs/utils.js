const { spawnSync } = require('child_process');
const assert = require('assert');

let spawnSyncWrapper = stringifiedCommand => {
    let commandOutput = '';
    const command = spawnSync(stringifiedCommand, {
        shell: true
    });
    if(command.status !== 0) {
        assert.fail(command.stderr.toString());
    }
    else {
        commandOutput = command.stdout.toString().trim();
        if(commandOutput !== '') {
            console.log(`spawnSyncWrapper command output ${commandOutput}`);
        }
        assert.strictEqual((commandOutput.includes('FAILED') || []).length, 0, commandOutput);
    }

    return commandOutput;
}

module.exports = {
    spawnSyncWrapper,
}