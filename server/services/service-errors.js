/** Service layer.
 * @module services/serviceErrors
 */

/**
 * Service layer related on errors.
 * @type { object }
 * @const
 * @namespace serviceErrors
 */

/**
 * An object with errors.
 * @type { object }
 * @memberof module:services/serviceErrors~serviceErrors
 */
export default {
  /** Such a record does not exist (when it is expected to exist). */
  RESOURCE_NOT_FOUND: 1,
  /** The requirements do not allow more than one of that resource. */
  DUPLICATE_RESOURCE: 2,
  /** The requirements do not allow such an operation. */
  BAD_REQUEST: 3,
  /** The user is not authorized. */
  UNAUTHORIZED: 4,
  /** The time has ran out. */
  TIMEOUT: 5,
};
