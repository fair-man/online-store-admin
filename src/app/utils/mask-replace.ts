const maskRegexp = {
    phone: new RegExp(/(\+7\s)|([\s\-_])/, 'gi')
};

export const MaskReplace = {
    replace: (val, type) => {
        return val.replace(maskRegexp[type], '');
    }
};
