/**
 * utils
 */
/**
 * router:
 * /boss
 * /expert
 * /bossInfo
 * /expertInfo
 *
 * check if info done? user.header hold value or not
 * check the type of user? user.type
 */

export function getRedirectTo(type, header) {
    let path = '';
    if (type === 'boss') {
        path = '/boss'
    } else {
        path = '/expert'
    }
    if (!header) {
        path += 'Info'
    }
    return path;
}