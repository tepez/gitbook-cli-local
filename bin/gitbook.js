'use strict';
// Based on https://github.com/GitbookIO/gitbook-cli/blob/2.3.2/bin/gitbook.js
const Gitbook = require('gitbook');
const parsedArgv = require('optimist').argv;
const _ = require('lodash');
const Commander = require('commander');

// Execute a command from a list
// with a specific set of args/kwargs
// https://github.com/GitbookIO/gitbook-cli/blob/2.3.2/lib/commands.js#L43
function exec(commands, command, args, kwargs) {
    const cmd = _.find(commands, function(_cmd) {
        return _.first(_cmd.name.split(" ")) === command;
    });

    // Command not found
    if (!cmd) throw new Error('Command '+command+' doesn\'t exist, run "gitbook help" to list commands.');

    // Apply defaults
    _.each(cmd.options || [], function(option) {
        kwargs[option.name] = (kwargs[option.name] === undefined)? option.defaults : kwargs[option.name];
        if (option.values && !_.includes(option.values, kwargs[option.name])) {
            throw new Error('Invalid value for option "'+option.name+'"');
        }
    });

    return cmd.exec(args, kwargs);
}

function runPromise(p) {
    return p
        .then(function() {
            process.exit(0);
        }, function(err) {
            console.log('');
            console.log(err.toString());
            if (Commander.debug || process.env.DEBUG) console.log(err.stack || '');
            process.exit(1);
        });
}

Commander
    .command('*')
    .description('run a command with a specific gitbook version')
    .action(function(commandName){
        const args = parsedArgv._.slice(1);
        const kwargs = _.omit(parsedArgv, '$0', '_');
        runPromise(exec(Gitbook.commands, commandName, args, kwargs));
    });

Commander.parse(process.argv);