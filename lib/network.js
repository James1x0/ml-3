const synaptic = require('synaptic'),
      winston = require('winston'),
      // processTrainingSet = require('../process-trainer'),
      Trainer = synaptic.Trainer,
      Architect = synaptic.Architect;

function Network () {
  // Build network
  let network = new Architect.Perceptron(1, 2, 1);
  this.network = network;
  return this;
}

Network.prototype.train = function (set) {
  const trainer = new Trainer(this.network);
  winston.info(`Training skynet with ${set.length} datum...`);
  trainer.train(set, {
    iterations: 10000,
    log: 1000
  });
};

Network.prototype.activate = function (inputs) {
  return this.network.activate(inputs);
};

module.exports = Network;
