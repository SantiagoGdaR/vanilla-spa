new Module(
    document.currentScript,
    function(el) {
        console.log('I\'ve been correctly installed\n' + el.tagName + '\n'+el.textContent);
    },
    function(el) {
        console.log('I\'m uninstalling things');
    }
);
