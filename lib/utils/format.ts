export const formatTitle = () => {
  let titles: any = {};
  return function (str = '') {
    let slug = `_${str.toString().replace(/\s/g, '-')}`;
    while (titles[slug]) {
      slug += '_';
    }
    titles[slug] = true;
    return slug;
  };
};

export const throttle = (func: any, limit: any) => {
  let lastFunc: any;
  let lastRan: any;
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
