export default (() => {
  const nothing = "<nothing>";

  const findInObject = (obj) => (placeholder) => {
    const delimiter = ".";
    if (!placeholder || placeholder === nothing)
      return nothing;

    let nextPlaceholder = placeholder.slice(placeholder.indexOf(delimiter) + 1);

    let currentKey = placeholder.indexOf(delimiter) > -1
      ? placeholder.slice(0, placeholder.indexOf(delimiter))
      : placeholder;

    let value = obj[currentKey];

    return currentKey && value
      ? typeof value === 'object'
        ? findInObject(value)(nextPlaceholder)
        : value
      : nothing;
  }

  return { nothing, findInObject };

})();