/**
 * Utility function to normalize IDs by removing non-alphanumeric characters.
 */
const normalizeId = (id) => id.replace(/[^A-Za-z0-9]/g, "");

export { normalizeId };
