(function ($) {
    $.fn.smartTabs = function (options) {

        let settings = $.extend({
            activeClass: 'active',
            speed: 200,
            defaultTab: null
        }, options);

        return this.each(function () {

            let container = $(this);
            let tabs = container.find('.tab-menu li');
            let contents = container.find('.tab-content');

            function openTab(id) {
                contents.stop(true, true).hide();
                $('#' + id).fadeIn(settings.speed);

                tabs.removeClass(settings.activeClass);
                tabs.filter('[data-tab="' + id + '"]').addClass(settings.activeClass);

                window.location.hash = id;
            }

            let startTab = window.location.hash.replace('#', '') || settings.defaultTab || tabs.first().data('tab');
            openTab(startTab);

            tabs.on('click', function () {
                let tabId = $(this).data('tab');
                openTab(tabId);
            });

            $(document).on('keydown', function (e) {
                let current = tabs.filter('.' + settings.activeClass);
                let index = tabs.index(current);

                if (e.key === 'ArrowRight') {
                    let next = tabs.eq((index + 1) % tabs.length);
                    openTab(next.data('tab'));
                }

                if (e.key === 'ArrowLeft') {
                    let prev = tabs.eq((index - 1 + tabs.length) % tabs.length);
                    openTab(prev.data('tab'));
                }
            });

        });
    };
}(jQuery));