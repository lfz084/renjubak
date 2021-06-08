var registerSW = () => {
    
    const isSupport = document.getElementById("isSupport");
    const isSuccess = document.getElementById("isSuccess");
    const state = document.getElementById("state");
    const swState = document.getElementById("swState");
    
    if ('serviceWorker' in navigator) {

        // 开始注册service workers
        navigator.serviceWorker.register('./sw.js', {
            scope: './'
        }).then(function(registration) {
        
            var serviceWorker;
            if (registration.installing) {
                serviceWorker = registration.installing;
                
            } else if (registration.waiting) {
                serviceWorker = registration.waiting;
                
            } else if (registration.active) {
                serviceWorker = registration.active;
    
            }
            if (serviceWorker) {
                swState.innerHTML=(serviceWorker.state);
                serviceWorker.addEventListener('statechange', function(e) {
                    //showLabel(' >>> ' + e.target.state);
                });
            }
        }).catch(function(error) {
        
        });
    } else {
        
    }
}