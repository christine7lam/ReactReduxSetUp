/**
 * Carousel Navigation calculations
 *
 * @version 1.0
 */

'use strict';

import _ from 'lodash';
import * as dimension from './ScreenDimensions';


/**
 * Always center navigation and animation travel distance for Horizontal and Vertical Carousels
 *
 * @param widthHeight: with or height of an item depends on the orientation
 * @param itemMargin
 * @param focus: highlighted item index
 * @param orientation: landscape/portrait (X/Y)
 * @param extraWH: extra width of height outside the carousel
 * @returns {number}
 */

export function carouselCenterScroll(widthHeight, itemMargin, focus, orientation, extraWH) {

    if (widthHeight !== undefined && itemMargin !== undefined && focus !== undefined && orientation !== undefined) {
        var centerXY = (orientation === "X") ? dimension.getScreenCenterXPerDom(widthHeight, extraWH) :
            dimension.getScreenCenterYPerDom(widthHeight, extraWH) ;

        var activeItemX = (focus * (widthHeight + itemMargin)) + itemMargin;
        var movement = (activeItemX > centerXY) ? centerXY - activeItemX : 0;

        return movement;
    }
    return 0;
}

/**
 * Calculate navigation and animation travel distance for Horizontal and Vertical Carousels
 *
 * @param widthHeight: with or height of an item depends on the orientation
 * @param itemMargin
 * @param focus: highlighted item index
 * @param size: carousel item size
 * @param orientation: landscape/portrait (X/Y)
 * @param extraWH: extra width of height outside the carousel
 * @returns {number}
 */

export function carouselScroll(widthHeight, itemMargin, focus, size, orientation, extraWH) {

    if (widthHeight !== undefined && itemMargin !== undefined && focus !== undefined && size !== undefined && orientation !== undefined) {
        var centerXY = (orientation === "X") ? dimension.getScreenCenterXPerDom(widthHeight, extraWH) :
            dimension.getScreenCenterYPerDom(widthHeight, extraWH) ;

        var endCount = _.ceil(centerXY / (widthHeight + itemMargin));
        var lastStaticCount = parseInt(size) - endCount;
        var overflowWidth = endCount * (widthHeight + itemMargin) - centerXY - widthHeight;

        var scrollFocus = (focus > lastStaticCount) ? lastStaticCount : focus;
        var activeItemX = (scrollFocus * (widthHeight + itemMargin)) + itemMargin;
        var movement = (activeItemX > centerXY) ? centerXY - activeItemX : 0;

        if (focus >= lastStaticCount) {
            movement -= overflowWidth;
        }

        return movement;
    }
    return 0;
}

/**
 * Calculate navigation and animation travel distance for carousels with items of different widths
 * Once reached the center, always center the active poster
 *
 * @param cols: a list of cols in the active list
 * @param margin
 * @param orientation: landscape/portrait (X/Y)
 * @param focus: highlighted item index
 * @param singleWidth: width of column of unit 1
 * @param extraWH: extra width of height outside the carousel
 * @returns {{dist: number, pos: string}}
 */
export function carouselCenterMixScroll(cols, margin, orientation, focus, singleWidth, extraWH, actionCol) {
    var movement = 0;
    var mmt = {"dist": 0, "pos": "middle"};

    if (cols !== undefined && margin !== undefined && orientation !== undefined && focus !== undefined && singleWidth !== undefined && extraWH !== undefined) {
        var activeCol = (cols[focus] !== undefined) ? cols[focus].col : 0;
        var centerXY = (orientation === 'X') ? dimension.getScreenCenterXPerDom(activeCol * singleWidth, extraWH)
            : dimension.getScreenCenterYPerDom(activeCol * singleWidth, extraWH);

        if (actionCol !== undefined) {
            movement = actionCol;
        }

        _.each(cols, function (col, index) {
            if (index < focus) {
                movement += (col.col * singleWidth) + margin;
            } else {
                return false;
            }
        });

        mmt.dist = (movement > centerXY) ? (centerXY - movement) : 0;
        if (movement < centerXY) {
            mmt.pos = "right";
        }

        return mmt;
    }
    return mmt;
}

/**
 * Calculate navigation and animation travel distance for carousels with items of fixed widths
 * Once reached the center, always center the active poster
 *
 * @param numOfItems
 * @param margin
 * @param orientation
 * @param focus
 * @param singleWidth
 * @param extraWH
 * @param actionCol
 * @param width
 * @returns {{dist: number, pos: string}}
 */
export function carouselCenterFixedScroll(numOfItems, margin, orientation, focus, singleWidth, extraWH, actionCol, width) {
    var movement = 0;
    var mmt = {"dist": 0, "pos": "middle"};

    if (numOfItems !== undefined && margin !== undefined && orientation !== undefined && focus !== undefined && singleWidth !== undefined && extraWH !== undefined) {
        var activeCol = width;
        var centerXY = (orientation === 'X') ? dimension.getScreenCenterXPerDom(activeCol * singleWidth, extraWH)
            : dimension.getScreenCenterYPerDom(activeCol * singleWidth, extraWH);

        if (actionCol !== undefined) {
            movement = actionCol;
        }

        for (let index = 0; index < focus; index++) {
            movement += ((width * singleWidth) + margin);
        }

        mmt.dist = (movement > centerXY) ? (centerXY - movement) : 0;
        if (movement < centerXY) {
            mmt.pos = "right";
        }

        return mmt;
    }
    return mmt;
}

/**
 * Calculate navigation and animation travel distance for carousels with items of variable widths
 * Once reached the center, always center the active poster
 *
 * @param numOfItems
 * @param margin
 * @param orientation
 * @param focus
 * @param singleWidth
 * @param extraWH
 * @param actionCol
 * @param widths
 * @returns {{dist: number, pos: string}}
 */
export function carouselCenterVariableScroll(numOfItems, margin, orientation, focus, singleWidth, extraWH, actionCol, widths) {
    var movement = 0;
    var mmt = {"dist": 0, "pos": "middle"};

    if (numOfItems !== undefined && margin !== undefined && orientation !== undefined && focus !== undefined && singleWidth !== undefined && extraWH !== undefined) {
        var activeCol = widths[focus];
        var centerXY = (orientation === 'X') ? dimension.getScreenCenterXPerDom(activeCol * singleWidth, extraWH)
            : dimension.getScreenCenterYPerDom(activeCol * singleWidth, extraWH);

        if (actionCol !== undefined) {
            movement = actionCol;
        }

        for (let index = 0; index < focus; index++) {
            movement += ((widths[index] * singleWidth) + margin);
        }

        mmt.dist = (movement > centerXY) ? (centerXY - movement) : 0;
        if (movement < centerXY) {
            mmt.pos = "right";
        }

        return mmt;
    }
    return mmt;
}

/**
 * Calculate navigation and animation travel distance for carousels with items of different widths
 *
 * @param cols: a list of cols in the active list
 * @param margin
 * @param orientation: landscape/portrait (X/Y)
 * @param focus: highlighted item index
 * @param singleWidth: width of column of unit 1
 * @param extraWH: extra width of height outside the carousel
 * @returns {{dist: number, pos: string}}
 */

export function carouselMixScroll(cols, margin, orientation, focus, singleWidth, extraWH, actionCol) {
    var movement = 0;
    var mmt = {"dist": 0, "pos": "middle"};


    if (cols !== undefined && margin !== undefined && orientation !== undefined && focus !== undefined && singleWidth !== undefined && extraWH !== undefined) {
        var activeCol = (cols[focus] !== undefined) ? cols[focus].col : 0;
        var centerXY = (orientation === 'X') ? dimension.getScreenCenterXPerDom(activeCol * singleWidth, extraWH)
            : dimension.getScreenCenterYPerDom(activeCol * singleWidth, extraWH);

        var screenWH = (orientation === 'X') ? dimension.getScreenWidth(extraWH) : dimension.getScreenHeight(extraWH);
        var endScreenWH = screenWH - centerXY;
        var endLen = 0;
        var lastStaticCount = 0;
        if (actionCol !== undefined) {
            movement = actionCol;
        }

        _.forEachRight(cols, function(col, index) {
            if (endLen <= endScreenWH) {
               endLen += parseInt(col.col * singleWidth + margin);
                lastStaticCount = index + 1;
            } else {
                return false;
            }
        });

        endLen = 0;
        _.forEachRight(cols, function(col, index) {
            if (index >= lastStaticCount) {
                endLen += parseInt(col.col * singleWidth + margin);
            } else {
                return false;
            }
        });

        var overflowWH = endScreenWH - endLen;
        var lastFocus = (focus > lastStaticCount) ? lastStaticCount: focus;
        _.each(cols, function (col, index) {
            if (index < lastFocus) {
                movement += (col.col * singleWidth) + margin;
            } else {
                return false;
            }
        });

        mmt.dist = (movement > centerXY) ? (centerXY - movement) : 0;
        if (movement < centerXY) {
            mmt.pos = "right";
        }

        if (focus >= lastStaticCount) {
            mmt.dist += overflowWH;
            mmt.pos = "left";
        }

        if (focus > 0 ) {
            mmt.dist -= margin;
        }

        return mmt;

    }
    return mmt;
}

/**
 * Scrolling carousel by page
 *
 * @param cols: a list of cols in the active list
 * @param margin
 * @param orientation: landscape/portrait (X/Y)
 * @param focus: highlighted item index
 * @param singleWidth: width of column of unit 1
 * @param extraWH: extra width of height outside the carousel
 * @returns {number}
 */
export function pageScroll(cols, margin, orientation, focus, singleWidth, extraWH, actionCol) {
    var movement = 0;
    var mmt = 0;

    if (cols !== undefined && margin !== undefined && orientation !== undefined && focus !== undefined && singleWidth !== undefined && extraWH !== undefined) {

        var screenWH = (orientation === 'X') ? dimension.getScreenWidth(extraWH) : dimension.getScreenHeight(extraWH);
        var endLen = 0;
        var lastStaticCount = 0;
        if (actionCol !== undefined) {
            movement = actionCol;
        }

        _.forEachRight(cols, function(col, index) {
            if (endLen <= screenWH) {
                endLen += parseInt(col.col * singleWidth + margin);
                lastStaticCount = index + 1;
            } else {
                return false;
            }
        });

        endLen = 0;
        _.forEachRight(cols, function(col, index) {
            if (index >= lastStaticCount) {
                endLen += parseInt(col.col * singleWidth + margin);
            } else {
                return false;
            }
        });

        var overflowWH = screenWH - endLen;
        var lastFocus = (focus > lastStaticCount) ? lastStaticCount: focus;
        _.each(cols, function (col, index) {
            if (index < lastFocus) {
                movement += (col.col * singleWidth) + margin;
            } else {
                return false;
            }
        });

        mmt = (movement > margin) ? (margin - movement) : 0;

        if (focus >= lastStaticCount) {
            mmt += overflowWH;
        }

        if (focus > 0) {
            mmt -= margin;
        }
        return mmt;

    }
    return mmt;
}

export function pageScrollFixed(numOfItems, margin, orientation, focus, singleWidth, extraWH, actionCol, fixedWidth) {
    var movement = 0;
    var mmt = 0;

    if (numOfItems !== undefined && margin !== undefined && orientation !== undefined && focus !== undefined && singleWidth !== undefined && extraWH !== undefined) {

        var screenWH = (orientation === 'X') ? dimension.getScreenWidth(extraWH) : dimension.getScreenHeight(extraWH);
        var endLen = 0;
        var lastStaticCount = 0;
        if (actionCol !== undefined) {
            movement = actionCol;
        }

        for (let index = numOfItems - 1; index >= 0; index--) {
            if (endLen <= screenWH) {
                endLen += ((fixedWidth * singleWidth) + margin);
                lastStaticCount = index + 1;
            }
        }

        endLen = 0;

        for (let index = numOfItems - 1; index >= 0; index--) {
            if (index >= lastStaticCount) {
                endLen += ((fixedWidth * singleWidth) + margin);
            }
        }

        var overflowWH = screenWH - endLen;
        var lastFocus = (focus > lastStaticCount) ? lastStaticCount: focus;
        for (let index = 0; index < lastFocus; index++) {
            movement += ((fixedWidth * singleWidth) + margin);
        }

        mmt = (movement > margin) ? (margin - movement) : 0;

        if (focus >= lastStaticCount) {
            mmt += overflowWH;
        }

        if (focus > 0) {
            mmt -= margin;
        }
        return mmt;

    }
    return mmt;
}

export function pageScrollVariable(numOfItems, margin, orientation, focus, singleWidth, extraWH, actionCol, widths) {
    var movement = 0;
    var mmt = 0;

    if (numOfItems !== undefined && margin !== undefined && orientation !== undefined && focus !== undefined && singleWidth !== undefined && extraWH !== undefined) {

        var screenWH = (orientation === 'X') ? dimension.getScreenWidth(extraWH) : dimension.getScreenHeight(extraWH);
        var endLen = 0;
        var lastStaticCount = 0;
        if (actionCol !== undefined) {
            movement = actionCol;
        }

        for (let index = numOfItems - 1; index >= 0; index--) {
            if (endLen <= screenWH) {
                endLen += ((widths[index] * singleWidth) + margin);
                lastStaticCount = index + 1;
            }
        }

        endLen = 0;

        for (let index = numOfItems - 1; index >= 0; index--) {
            if (index >= lastStaticCount) {
                endLen += ((widths[index] * singleWidth) + margin);
            }
        }

        var overflowWH = screenWH - endLen;
        var lastFocus = (focus > lastStaticCount) ? lastStaticCount: focus;
        for (let index = 0; index < lastFocus; index++) {
            movement += ((widths[index] * singleWidth) + margin);
        }

        mmt = (movement > margin) ? (margin - movement) : 0;

        if (focus >= lastStaticCount) {
            mmt += overflowWH;
        }

        if (focus > 0) {
            mmt -= margin;
        }
        return mmt;

    }
    return mmt;
}

/**
 * Support page navigation to locate the next focus
 *
 * @param cols
 * @param currFocus
 * @param direction
 * @returns {number}
 */
export function nextFocus(cols, currFocus, direction) {
    var pageCols = 12;
    var nextCol = 0;
    var nextIndex = 0;

    if (cols !== undefined && currFocus !== undefined && direction !== undefined) {
        if (direction === 'right') {
            _.each(cols, function (col, index) {
                if (index >= currFocus) {
                    if (nextCol < pageCols) {
                        nextCol += parseInt(col.col);
                        nextIndex ++;
                    } else {
                        return false;
                    }
                }
            });
        } else if (direction === 'left') {
            _.forEachRight(cols, function (col, index) {
                if (index <= currFocus) {
                    if (nextCol < pageCols) {
                        nextCol += parseInt(col.col);
                        nextIndex ++;
                    } else {
                        return false;
                    }
                }

            });
        }
    }
    return nextIndex;
}

/**
 * Support page navigation to locate the next focus (fixed column width)
 *
 * @param numOfCols
 * @param currCol
 * @param direction
 * @param width
 * @returns {number}
 */
export function nextFocusFixed(numOfCols, currCol, direction, fixedWidth) {
    var pageCols = 12;
    var nextCol = 0;
    var nextIndex = 0;

    if (numOfCols !== undefined && currCol !== undefined && direction !== undefined) {
        if (direction === 'right') {
            for (let index = currCol; index < numOfCols; index++) {
                if (index < pageCols) {
                    nextCol += fixedWidth;
                    nextIndex++;
                } else {
                    break;
                }
            }
        } else if (direction === 'left') {
            for (let index = 0; index <= currCol; index++) {
                if (index < pageCols) {
                    nextCol += fixedWidth;
                    nextIndex++;
                } else {
                    break;
                }
            }
        }
    }
    return nextIndex;
}

/**
 * Support page navigation to locate the next focus (variable column widths)
 *
 * @param numOfCols
 * @param currCol
 * @param direction
 * @param widths
 * @returns {number}
 */
export function nextFocusVariable(numOfCols, currCol, direction, widths) {
    var pageCols = 12;
    var nextCol = 0;
    var nextIndex = 0;

    if (numOfCols !== undefined && currCol !== undefined && direction !== undefined) {
        if (direction === 'right') {
            for (let index = currCol; index < numOfCols; index++) {
                if (index < pageCols) {
                    nextCol += widths[index];
                    nextIndex++;
                } else {
                    break;
                }
            }
        } else if (direction === 'left') {
            for (let index = 0; index <= currCol; index++) {
                if (index < pageCols) {
                    nextCol += widths[index];
                    nextIndex++;
                } else {
                    break;
                }
            }
        }
    }
    return nextIndex;
}