// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  // your code here
	var	result = [];

	(function walk( node ) {
		if (node === null) return;
		if ( _.toArray(node.classList).indexOf(className) > -1 ) {
			result.push(node);
		}
		_.forEach( node.childNodes, function(childNode) {
			walk(childNode);
		})
	})(document.body);

	return result;
};
