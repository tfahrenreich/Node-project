/**
 * User: Tim
 * Date: 4/2/2016
 * Time: 10:07 AM
 *
 * AMLTranslator.js
 */

if(module.exports){
    module.exports = {
        translate : translate
    };
}

function translate(string){
    string = string.replace(/\^(?!!)(.)|\^!(?!!)(.)/g, tagParser);
    return string;
}

function tagParser(match, opening, closing, offset, original, dictionary){

    dictionary = dictionary || {
            "^~"    : ["<em>","</em>"],
            "^%"    : ["<strong>", "</strong>"],
            "^*"    : ["<i>", "</i>"]
        };

    switch (opening || closing){
        case (opening):

            /**
             * Case for opening is pretty simple. Easy match for key in dictionary
             */

            return dictionary[match][0];
            break;

        case (closing):

            /**
             * Case for closing is a little more complicated.
             * Turns closing tags to their key (opening tag)
             * Gets all open tags up to the current point in the string.
             * Checks them against closed tags; returned as an array from getRemainingTags()
             * Cycles through open tags, adding their closure until it reaches its match.
             * Appends tags that need to be reopened;
             */

            match = String(match).replace('!','');

            var remainingTags = getRemainingTags(original, offset);

            var response = '';
            var openTags = '';

            for(var i = remainingTags.length-1; i >= 0; i-- ){
                response += dictionary[remainingTags[i]][1];

                if(dictionary[match] == dictionary[remainingTags[i]]){
                    break;
                }else{
                    openTags += dictionary[remainingTags[i]][0];
                }
            }

            return response + openTags;
            break;
    }
}

function getRemainingTags(original, offset){
    var openingTags = original.substring(offset, -offset).match(/\^(?!!)(.)/g);
    var closingTags = original.substring(offset, -offset).match(/\^!(?!!)(.)/g) || [];

    for (var x = closingTags.length-1; x >= 0; x--){
        closingTags[x] = closingTags[x].replace('!', '');
    }

    return openingTags.filter(function(x){
        return closingTags.indexOf(x) < 0;
    });
}


