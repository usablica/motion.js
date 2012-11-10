/*
 * motion.js 0.1.0
 * http://usablica.github.com/motion.js
 * MIT licensed
 *
 * Copyright (C) 2012 usabli.ca - Afshin Mehrabani (afshin.meh@gmail.com)
 */
var MotionJs = motionjs = (function() {
    
    //version
    var version = "0.1.0";

    //Default motion.js configs
    var DEFAULT_TRANSITION_DURATION = 0,
        DEFAULT_TRANSITION_PROPERTY = 'all',
        DEFAULT_TRANSITION_TIMING_FUNCTION = 'ease',
        VERBOSE_MODE = true;

    //Local variables
    var ANIMATION_SUPPORT = false,
        PROPERTY_PREFIX = '';

    /**
     * Do a transition with given parameters
     *
     * @param {Array} motion_obj
     * @api public
     */
    function transition(motion_obj) {
        for (var i = 0, motion_objects_len = motion_obj.length; i < motion_objects_len; i++) {
            var item = motion_obj[i];
            //get all objects with given selector from DOM
            var motion_item = document.querySelectorAll(item.select);

            //each motion object can select multiple item, so we have an array
            if (motion_item && motion_item.length > 0) {
                for (var j = 0, motion_item_objects_len = motion_item.length; j < motion_item_objects_len; j++) {
                    var actor_object = motion_item[j];
                    //first, add the transition
                    _set_transitionable(actor_object);
                    //set the styles
                    _set_style(actor_object, item.style);
                    //set transition duration
                    _set_transition_duration(actor_object, item.duration);
                }
                //set transition end callback
                if(item.end instanceof Function) {
                    _set_transition_end_callack(motion_item[0], item.end);
                }
            }
        }
    }
    
    /**
     * Set transition end callback
     *
     * @param {Object} actor_object
     * @param {Function} fn
     * @api private
     */
    function _set_transition_end_callack(actor_object, fn) {
        var transition_end_events = {
          '': 'transitionEnd',
          'O': 'otransitionend',
          'ms': 'msTransitionEnd',
          'Moz': 'transitionend',
          'Webkit': 'webkitTransitionEnd'
        };
        //in order to prevent firing callback for each css property, we use a flag and execute the callback one time
        var isCalled = false;
        actor_object.addEventListener(transition_end_events[PROPERTY_PREFIX], function(args) {
            //only one time
            if(!isCalled) {
                isCalled = true;
                fn.call(this, args);
            }
        }, false);
    }

    /**
     * Used for setting transition duration
     *
     * @param {Object} actor_object
     * @api private
     */
    function _set_transition_duration(actor_object, duration) {
        var transition_duration = {};
        transition_duration['TransitionDuration'] = duration || DEFAULT_ANIMATIONS_DURATION;
        _set_style(actor_object, transition_duration, true);
    }

    /**
     * Used for set transition ability to an element
     *
     * @param {Object} actor_object
     * @api private
     */
    function _set_transitionable(actor_object) {
        var actor_style = {};
        actor_style["TransitionProperty"] = DEFAULT_TRANSITION_PROPERTY;
        actor_style["TransitionTimingFunction"] = DEFAULT_TRANSITION_TIMING_FUNCTION;
        _set_style(actor_object, actor_style, true);
    }

    /**
     * Used for setting stylesheet to an object
     *
     * @param {Object} actor_object
     * @param {Object} styles
     * @api private
     */
    function _set_style(actor_object, styles, with_prefix) {
        var prefix = "";
        if (with_prefix) prefix = PROPERTY_PREFIX;
        for (var style_prop in styles) {
            actor_object.style[prefix + style_prop] = styles[style_prop];
        }
    }

    /**
     * Detect animation support and set necessary variables
     * Check CSS3 animation ability code by https://developer.mozilla.org/en-US/docs/CSS/CSS_animations/Detecting_CSS_animation_support
     *
     * @api private
     */
    function _check_animation_support() {
        var domPrefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'],
            test_element = document.querySelector("html");

        if (test_element.style.animationName) {
            ANIMATION_SUPPORT = true;
        } else {
            for (var i = 0, domPrefixLen = domPrefixes.length; i < domPrefixLen; i++) {
                if (test_element.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                    PROPERTY_PREFIX = domPrefixes[i];
                    ANIMATION_SUPPORT = true;
                    break;
                }
            }
        }
        if(!ANIMATION_SUPPORT && VERBOSE_MODE) {
            alert('Sorry, your browser doesn\'t support CSS3 animation. Upgrade your browser or use modern browsers such as Mozilla Firefox or Google Chrome.');
        }
    }

    //check for browser animation support and also set the local variables for creating animations
    _check_animation_support();
    //API
    return {
        //Public API
        transition: transition
    };
})();
