/*
 * motion.js 0.1.0
 * http://usablica.github.com/motion.js
 * MIT licensed
 *
 * Copyright (C) 2012 usabli.ca - Afshin Mehrabani (afshin.meh@gmail.com)
 */
var MotionJs = motionjs = (function() {

    //Default motion.js configs
    var DEFAULT_ANIMATIONS_DURATION = 0;

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
            if(motion_item && motion_item.length > 0) {
                for (var j = 0, motion_item_objects_len = motion_item.length; j < motion_item_objects_len; j++) {
                    var actor_object = motion_item[j];
                    //first, add the motion.js css class to the item 
                    actor_object.className = "motion_js_transition_all";
                    //set the styles
                    _set_actor_styles(actor_object, item.style);
                    //set transition duration 
                    _set_transition_duration(actor_object, item.duration);
                }
            }
        }
    };
    
    /**
     * Used for setting transition duration
     *
     * @param {Object} actor_object
     * @api private
     */
    function _set_transition_duration(actor_object, duration) {
        actor_object.style["-webkit-transition-duration"] = duration || DEFAULT_ANIMATIONS_DURATION;
    }

    /**
     * Used for setting actor style
     *
     * @param {Object} actor_object
     * @api private
     */
    function _set_actor_styles(actor_object, styles) {
        actor_object.style.left = styles.left;
        actor_object.style.top = styles.top;
    }

    //API
    return {
        //Public API
        transition: transition
    };
})();
