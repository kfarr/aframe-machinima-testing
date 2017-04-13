window.debug = true;
var AFRAME = require('aframe');
require('aframe-physics-system').registerAll(AFRAME);
AFRAME.registerComponent('sphere-collider', require('aframe-extras').misc['sphere-collider']);
require('aframe-motion-capture-components');
require('super-hands');
require('../index.js');