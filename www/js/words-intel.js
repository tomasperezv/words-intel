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
