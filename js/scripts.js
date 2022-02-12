/*!
* Start Bootstrap - Bare v5.0.7 (https://startbootstrap.com/template/bare)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
(function(){
    let stop = {};

    const downArrow = document.querySelector('.down_arrow');
    document.addEventListener('click', e => {
        if (e.srcElement && e.srcElement == downArrow) {
            try {
                scrollNext();
            } catch (e) {
                if (e !== stop) throw e;
            }
        }
    });
    
    function scrollNext() {
        const sections = document.querySelectorAll('.show-on-scroll');
        [].forEach.call(sections, (section) => {         
            if (offset(section) > window.scrollY + window.innerHeight / 2) {
                window.scrollTo(0, offset(section) - window.innerHeight / 3 );
                throw stop;
            }
        });
        window.scrollTo(0, 0);
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return rect.top + scrollTop
    }
})();