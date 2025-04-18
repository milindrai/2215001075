
/**
 * @typedef {Object} AuthResponse
 * @property {string} email
 * @property {string} name
 * @property {string} rollNo
 * @property {string} accessCode
 * @property {string} clientID
 * @property {string} clientSecret
 */

/**
 * @typedef {Object} TokenResponse
 * @property {string} token_type
 * @property {string} access_token
 * @property {number} expires_in
 */

/**
 * @typedef {Object} NumberResponse
 * @property {number[]} windowPrevState
 * @property {number[]} windowCurrState
 * @property {number[]} numbers
 * @property {number} avg
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {number} userid
 * @property {string} content
 */

/**
 * @typedef {Object} Comment
 * @property {number} id
 * @property {number} postid
 * @property {string} content
 */

/**
 * @typedef {Object} TopUser
 * @property {string} userId
 * @property {string} name
 * @property {number} commentCount
 */

/**
 * @typedef {Object} TopPost
 * @property {number} id
 * @property {string} content
 * @property {number} commentCount
 */
