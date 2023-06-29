module.exports = function createClassNameContainsSelector(className) {
    // CSS class name contains
    return `[class*="${className}"]`
}
