chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        'bounds': {
            'width': 960,
            'height': 600
        },
        'minWidth': 850,
        'minHeight': 550
    });
});
