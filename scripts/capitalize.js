
function capitalize(string) {
    if (typeof string !== 'string') {
      return ''; // or handle the non-string case accordingly
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export { capitalize };