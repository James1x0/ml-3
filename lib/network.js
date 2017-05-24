const synaptic = require('synaptic'),
      winston = require('winston'),
      processTrainingSet = require('../process-trainer'),
      Trainer = synaptic.Trainer,
      Architect = synaptic.Architect;

function Network () {
  // Build network
  let network = new Architect.Perceptron(1, 4, 1);
  this.network = network;
  return this;
}

Network.prototype.train = function (set) {
  const trainer = new Trainer(this.network),
        trainingSet = processTrainingSet(set);

  winston.debug('Processing training set:', trainingSet);
  trainer.train(trainingSet);
};

Network.prototype.activate = function (inputs) {
  return this.network.activate(inputs);
};

module.exports = new Network();
