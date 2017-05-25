const cli = require('commander'),
      winston = require('winston'),
      chalk = require('chalk'),
      moment = require('moment'),
      Promise = require('bluebird'),
      Network = require('./lib/network'),
      fs = require('fs');

cli
  .version('0.0.1')
  .option('-t, --training-set [path]', 'Training set')
  .option('-i, --input [input]', 'Network input')
  .parse(process.argv);

winston.info(chalk.red('Booting skynet.'));

const network = new Network();

if (cli.trainingSet) {
  winston.info(chalk.bgGreen(chalk.white(`Detected training set path. Importing data from "${cli.trainingSet}"`)));

  const rawTrainingData = fs.readFileSync(cli.trainingSet, {
    encoding: 'utf8'
  });
  /*
    [
      [ seconds, gasprice ]
    ]
   */
  const trainingData = rawTrainingData.split('\n').map(d => {
    const data = d.split(',').map(s => parseFloat(s));
    // console.log(data[0], `${data[0]}`, data[0] / Math.pow(10, 10));
    return {
      input: [ data[0] ],
      output: [ data[1] / 10 ]
    };
  })
  .filter(d => d.output[0] && d.input[0]);

  /*
    [{
      input: [seconds],
      output: [gasprice]
    }]
   */

  console.dir(trainingData);

  network.train(trainingData);

  winston.info(chalk.yellow('TRAINED BITCHES!'));
}

if (cli.input) {
  winston.info(chalk.blue(`Activating skynet with ${cli.input}...`));
  let i = moment(cli.input, 'M/D/YYYY').unix();
  // i = i / Math.pow(10, 10);
  console.log('i is', i);
  let output = network.activate([ i ]);
  console.log(i, output);
  winston.info(chalk.blue(`Got output: $${output * 10}.`));
}
