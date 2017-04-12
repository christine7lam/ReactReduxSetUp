/**
 * Screen Dimensions
 * 
 * @version 1.0
 */

export function getScreenWidth(extraWidth) {
    return (window.innerWidth - ((extraWidth !== undefined) ? extraWidth : 0));
}

export function getScreenHeight(extraHeight) {
    return (window.innerHeight - ((extraHeight !== undefined) ? extraHeight : 0));
}

export function getScreenCenterXPerDom(domWidth, extraWidth) {
    return (window.innerWidth - ((extraWidth !== undefined) ? extraWidth : 0))/2 - domWidth/2;
}

export function getScreenCenterYPerDom(domHeight, extraHeight) {
    return (window.innerHeight - ((extraHeight !== undefined) ? extraHeight : 0))/2 - domHeight/2;
}