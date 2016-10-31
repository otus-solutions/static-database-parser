var fs = require('fs');
var jsonfile = require('jsonfile');

var RemodelJSonService = function() {
    var self = this;
    var _emitter = null;
    var _beginObjectPosition = 0;
    var _endObjectPosition = false;
    var _data = '';
    var _json = {};
    var _dest = {};
    var _newModel = {};
    var _separator = '';

    self.remodelJson = remodelJson;

    function remodelJson(src, dest) {
        _dest = dest;

        fs.appendFile(_dest, '{', 'utf8', function(err) {
            if (err) throw err;
            console.log('Iniciou nova base.');

            var readStream = fs.createReadStream(src);
            readStream.setEncoding('utf8');
            readStream.on('data', _readData);
            readStream.on('end', _readFinalData);
        });
    }


    function _readData(chunk) {
        if (chunk) {
            _prepareData(chunk);
        }

        _searchEndObjectPosition();

        if (_endObjectPosition) {
            _parseData();
            _separator = ',';
        }

    }


    function _readFinalData() {
        do {
            _searchEndObjectPosition();

            if (_endObjectPosition) {
                _parseData();
            }
        } while (_endObjectPosition);

        fs.appendFile(_dest, '}', 'utf8', function(err) {
            if (err) throw err;
            console.log('Fechou nova base.');
        });
    }

    function _prepareData(chunk) {
        _data += chunk.replace(/(\s|\r|\n|\t|\[|\])+/g, '').replace(/(\},)+/g, '}');
    }

    function _searchEndObjectPosition() {
        var position = _data.search(/}/);
        _endObjectPosition = (position > -1) ? position + 1 : false;
    }

    function _parseData() {
        _parseParticipantData(JSON.parse(_data.substr(_beginObjectPosition, _endObjectPosition)));
        _data = _data.substr(_endObjectPosition);
    }

    function _parseParticipantData(participantData) {
        var currentParticipant = participantData.IDELSA;
        _applyNewModel(participantData);

        fs.appendFile(_dest, _separator + '"' + currentParticipant + '":' + JSON.stringify(_newModel), 'utf8', function(err) {
            if (err) throw err;
        });

        console.log('Participante %s processado.', currentParticipant);
    }

    function _applyNewModel(participantData) {
        var participantValue = participantData.IDELSA;
        delete participantData.IDELSA;
        var variables = Object.keys(participantData);

        variables.map(function(variable) {
            _newModel[variable] = {
                valor: participantData[variable]
		// Remove to improve performance
                //,label: null
            };
        });
    }
};

module.exports = new RemodelJSonService();
