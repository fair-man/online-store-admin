const maskRegexp = {
    phone: new RegExp(/([()\s\-_])/, 'gi')
};

export const MaskReplace = {
    replace: (val, type) => {
        return val.replace(maskRegexp[type], '');
    }
};
