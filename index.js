/**
 * Created by Tim on 2/24/2016.
 */
global.__base = __dirname + '/';

var hello = require('./modules/hello');
var chat = require('./modules/chat');
var AML = require('./modules/AMLTranslator');


console.log(AML.translate("Hello, ^%World!^!%"));
