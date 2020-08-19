'use strict';

let _global = {
    options : {
        observer : {
            attributes : true,
            attributeOldValue : true,
            characterData : true,
            characterDataOldValue : true,
            childList : true,
            subtree : true
        }
    }
}

console.log(_global);