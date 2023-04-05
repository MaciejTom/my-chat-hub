export const getAddressToAsset = (name: string) => {
    return import.meta.env.VITE_PUBLIC_URL + '/uploads/' + name;
};
