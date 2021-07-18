var registerSW = () => {

    window._loading = (() => {
        let timer = null;
        const WIN_LOADING = document.createElement("div"),
            IMG_LOAD = document.createElement("img"),
            DW = document.documentElement.clientWidth,
            DH = document.documentElement.clientHeight;

        let s = WIN_LOADING.style;
        s.position = "fixed";
        s.width = "150px";
        s.height = "150px";
        s.left = (DW - 150) / 2 + "px";
        s.top = (DH - 150) / 2 + "px";
        s.zIndex = 100000;
        //s.transform = `scale(${DW/1000})`;
        //document.body.appendChild(WIN_LOADING);

        s = IMG_LOAD.style;
        s.position = "absolute";
        s.width = "150px";
        s.height = "150px";
        s.left = "0px";
        s.top = "0px";
        s.opacity = "0.68";
        IMG_LOAD.src = "./pic/ball-triangle.svg";
        WIN_LOADING.appendChild(IMG_LOAD);

        return {
            open: (msg) => {
                if (!WIN_LOADING.parentNode) document.body.appendChild(WIN_LOADING);
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    if (WIN_LOADING.parentNode) WIN_LOADING.parentNode.removeChild(WIN_LOADING);
                }, 30 * 1000);
            },
            close: (msg) => {
                if (!WIN_LOADING.parentNode) document.body.appendChild(WIN_LOADING);
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    if (WIN_LOADING.parentNode) WIN_LOADING.parentNode.removeChild(WIN_LOADING);
                }, 250);
            }
        };
    })();

    if ('serviceWorker' in navigator) {

        navigator.serviceWorker.addEventListener('statechange', function(e) {
            console.log(' >>> ' + e.target.state);
        });

        navigator.serviceWorker.addEventListener("message", function(event) {
            const MSG = event.data;
            console.log(MSG);
            if (MSG.indexOf("load finish") + 1) {
                //closeMsg();
                window._loading.close(MSG);
            }
            else if (MSG.indexOf("loading...") + 1) {
                //showLabel("loading");
                window._loading.open(MSG);
            }
        });
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
                console.log(`serviceWorker.state=${serviceWorker.state}`)
                //swState.innerHTML = (serviceWorker.state);
            }

        }).catch(function(error) {

        });
    } else {

    }
}