/**
 * Fake Captcha Redirect – script.js
 * Gerencia clique, animação e redirecionamento.
 */
(function () {
    'use strict';

    function initCaptchas() {
        var wrappers = document.querySelectorAll('.fcr-wrapper');

        wrappers.forEach(function (wrapper) {
            var box      = wrapper.querySelector('.fcr-box');
            var checkbox = wrapper.querySelector('.fcr-checkbox');

            if (!box || !checkbox) return;

            var url     = wrapper.dataset.url    || '';
            var delay   = parseInt(wrapper.dataset.delay, 10);
            var newTab  = wrapper.dataset.newtab === 'true';
            var clicked = false;

            // Clique no box inteiro
            box.addEventListener('click', handleClick);

            // Acessibilidade: Enter/Espaço no checkbox
            checkbox.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            });

            function handleClick() {
                if (clicked || !url) return;
                clicked = true;

                // 1. Mostra spinner
                wrapper.classList.add('is-loading');
                checkbox.setAttribute('aria-checked', 'true');

                // Delay pode ser 0
                var checkDelay = delay > 200 ? delay - 200 : 0;

                // 2. Após (delay - 200ms): mostra checkmark
                setTimeout(function () {
                    wrapper.classList.remove('is-loading');
                    wrapper.classList.add('is-checked');
                }, checkDelay);

                // 3. Após delay total: redireciona
                setTimeout(function () {
                    if (newTab) {
                        window.open(url, '_blank', 'noopener,noreferrer');
                        // Permite clicar novamente se abriu em nova aba
                        clicked = false;
                        wrapper.classList.remove('is-checked');
                        checkbox.setAttribute('aria-checked', 'false');
                    } else {
                        window.location.href = url;
                    }
                }, delay);
            }
        });
    }

    // Inicializa após o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCaptchas);
    } else {
        initCaptchas();
    }
})();
