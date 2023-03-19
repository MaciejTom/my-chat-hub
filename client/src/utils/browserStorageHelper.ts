export const browserStorage = {
    get: (item: string) => sessionStorage.getItem(item),
    set: (item: string, value: string) => sessionStorage.setItem(item, value),
    remove: (item: string) => sessionStorage.removeItem(item),
    clear: () => sessionStorage.clear(),
  };