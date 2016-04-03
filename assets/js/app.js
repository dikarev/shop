(function($, env) {
    'use strict';

    // core module
    $.module({
        init: function() {
            $(env).on('load', this.ready.bind(this));

            this.em.on('iee', this.ifElementExists, this);
        },
        ready: function() {
            return this.em.fire('page:ready');
        },
        ifElementExists: function(selector, callback) {
            var $el = $(selector);

            if ($el.size()) {
                callback.call($el, this.em);
            }
        }
    });

    // carousel
    $.module({
        init: function() {
            this.em
                .on('page:ready', this.ready, this)
                .on('carousel:pagination', this.pagination, this)
                .on('carousel:control:prev', this.controlPrev, this)
                .on('carousel:control:next', this.controlNext, this);
        },
        ready: function() {
            this.em.fire('iee', '.carousel__inner', function(em) {
                this.jcarousel({wrap: 'circular'});

                em.fire('carousel:pagination', '.carousel__pagination');
                em.fire('carousel:control:prev', '.carousel__control-prev');
                em.fire('carousel:control:next', '.carousel__control-next');
            });
        },
        pagination: function(selector) {
            $(selector)
                .on('jcarouselpagination:active', 'a', function() {
                    $(this).addClass('active');
                })
                .on('jcarouselpagination:inactive', 'a', function() {
                    $(this).removeClass('active');
                })
                .jcarouselPagination();
        },
        controlPrev: function(selector) {
            $(selector)
                .on('jcarouselcontrol:active', function() {
                    $(this).removeClass('inactive');
                })
                .on('jcarouselcontrol:inactive', function() {
                    $(this).addClass('inactive');
                })
                .jcarouselControl({
                    target: '-=1'
                });
        },
        controlNext: function(selector) {
            $(selector)
                .on('jcarouselcontrol:active', function() {
                    $(this).removeClass('inactive');
                })
                .on('jcarouselcontrol:inactive', function() {
                    $(this).addClass('inactive');
                })
                .jcarouselControl({
                    target: '+=1'
                });
        }
    });
})(jQuery, window);
