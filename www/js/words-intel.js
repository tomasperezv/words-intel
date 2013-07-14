"use strict"

/**
 * @class WordsIntel 
 * @param {String} text
 */
var WordsIntel = function(text) {

	this._text = text;

	/**
	 * Characters to remove
	 */
	this._filter = [
		',', '"', '-', '`', "'",
		';', '\\*', '´', ':', "\\.",
		'!', "''", '/', "\\\\", "\\(",
		"\\)", "\\?", ">", '\/'
	];

	/**
	 * Excluded words
	 */
	this._excluded = [
		'i', 'the', 'is', 'of', 'in', 
		'you', 'that', 'what', 'from', 
		'there', 'here', 'this', 'also', 
		'with', 'which', 'each', 'been', 
		'because', 'have'
	];

};

/**
 * @method isExcluded
 * @param {String} word
 * @return {Boolean}
 * @public
 */
WordsIntel.prototype.isExcluded = function(word) {
	return (word.length <= 3 || this._excluded.indexOf(word) > -1);
};

/**
 * @method _applyFilters
 * @private
 */
WordsIntel.prototype._applyFilters = function() {
	for (var i = 0; i < this._filter.length; i++) {
		var regex = new RegExp(this._filter[i], 'g');
		this._text = this._text.replace(regex, ' ');
	}
};

/**
 * @param {Object} obj
 * @method _getSortedKeys
 * @return {Object}
 * @private
 */
WordsIntel.prototype._getSortedKeys = function(obj) {

	var keys = []; 
	for(var key in obj) {
		keys.push(key);
	}

	return keys.sort(function(a,b){
		return obj[a]-obj[b]
	});

};

/**
 * @return {Array}
 * @method getCloudsMapData
 * @public
 */
WordsIntel.prototype.getCloudsMapData = function() {

	// Generating data for the cloud map
	var limit = 75,
			current = 1,
			data = [];

	for (var i = (this.sortedWords.length - 1); i >= 0; i--) {

		var value = (parseInt(this.stats[this.sortedWords[i]], 10)*2);
		if (value > 200) {
			value = 150;
		}

		if (value < 10) {
			value = value * 10;
		}

		data.push({text: this.sortedWords[i], size: value});

		current++;
		if (current >= limit) {
			break;
		}

	}

	return data;

};

/**
 * @method init
 * @public
 */
WordsIntel.prototype.init = function() {

	// Case insensitive
	var content = this._text.toLowerCase();

	this._applyFilters();
	
	// Split by words
	var words = content.split(/\s+/);
	
	// Gather information
	this.stats = {};


	for (var i = 0; i < words.length; i++) {
		var currentWord = words[i];
		
		if (!this.isExcluded(currentWord)) {
			if (typeof this.stats[currentWord] === 'undefined') {
				this.stats[currentWord] = 1;
			} else {
				this.stats[currentWord]++;
			}
		}
	}
	
	this.sortedWords = this._getSortedKeys(this.stats);
	
};
