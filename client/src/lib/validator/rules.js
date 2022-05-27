"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.validator = void 0;
// 룰 설정 ####################################
var extend = {
    min: {
        regExp: function (value, compValue) {
            if (Number.isNaN(+value))
                return true;
            return compValue !== undefined ? +value < +compValue : false;
        },
        message: function (value, compValue, max) {
            if (Number.isNaN(+value))
                return "숫자만 입력 가능합니다.";
            return max
                ? "".concat(compValue, " ~ ").concat(max, " \uC0AC\uC774\uC758 \uC22B\uC790\uB9CC \uC785\uB825 \uAC00\uB2A5\uD569\uB2C8\uB2E4.")
                : "".concat(compValue, " \uC774\uC0C1\uC758 \uAC12\uB9CC \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
        }
    },
    max: {
        regExp: function (value, compValue) {
            if (Number.isNaN(+value))
                return true;
            return compValue !== undefined ? +value > +compValue : false;
        },
        message: function (value, compValue, min) {
            if (Number.isNaN(+value))
                return "숫자만 입력 가능합니다.";
            return min
                ? "".concat(min, " ~ ").concat(compValue, " \uC0AC\uC774\uC758 \uC22B\uC790\uB9CC \uC785\uB825 \uAC00\uB2A5\uD569\uB2C8\uB2E4.")
                : "".concat(compValue, " \uC774\uD558\uC758 \uAC12\uB9CC \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
        }
    },
    minLength: {
        regExp: function (value, compValue) {
            return compValue !== undefined ? value.length < +compValue : false;
        },
        message: function (value, compValue, max) {
            return max
                ? "".concat(compValue, " ~ ").concat(max, " \uC790 \uC774\uB0B4\uB85C \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.")
                : "".concat(compValue, " \uC790 \uC774\uC0C1\uC73C\uB85C \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
        }
    },
    maxLength: {
        regExp: function (value, compValue) {
            return compValue !== undefined ? value.length > +compValue : false;
        },
        message: function (value, compValue, min) {
            return min ? "".concat(min, " ~ ").concat(compValue, " \uC790 \uC774\uB0B4\uB85C \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.") : "".concat(compValue, " \uC790 \uC774\uB0B4\uB85C \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
        }
    }
};
exports.validator = {
    excute: function (rules, value) {
        var validError = "";
        var returnRule = "";
        rules.some(function (rule) {
            if (typeof rule === "undefined")
                return false;
            if (typeof rule === "object") {
                var objArr_1 = Object.entries(rule);
                // console.log(objArr);
                objArr_1.forEach(function (_a) {
                    var key = _a[0], compValue = _a[1];
                    // console.log({ key, compValue, value });
                    if (typeof compValue === "function") {
                        validError = compValue(value);
                        returnRule = key;
                        return true;
                    }
                    if (typeof compValue !== "function" && extend[key].regExp(value, compValue)) {
                        var message = extend[key].message;
                        if (key === "min") {
                            var max = objArr_1.find(function (_a) {
                                var key = _a[0];
                                return key === "max";
                            });
                            var maxValue = max && typeof max[1] === "number" ? max[1] : undefined;
                            validError = message(value, compValue, maxValue);
                        }
                        else if (key === "max") {
                            var min = objArr_1.find(function (_a) {
                                var key = _a[0];
                                return key === "min";
                            });
                            var minValue = min && typeof min[1] === "number" ? min[1] : undefined;
                            validError = message(value, compValue, minValue);
                        }
                        else if (key === "minLength") {
                            var maxLength = objArr_1.find(function (_a) {
                                var key = _a[0];
                                return key === "maxLength";
                            });
                            var maxLengthValue = maxLength && typeof maxLength[1] === "number" ? maxLength[1] : undefined;
                            validError = message(value, compValue, maxLengthValue);
                        }
                        else if (key === "maxLength") {
                            var minLength = objArr_1.find(function (_a) {
                                var key = _a[0];
                                return key === "minLength";
                            });
                            var minLengthValue = minLength && typeof minLength[1] === "number" ? minLength[1] : undefined;
                            validError = message(value, compValue, minLengthValue);
                        }
                        else {
                            validError = message(value, compValue);
                            returnRule = "".concat(key).concat(compValue);
                            return true;
                        }
                    }
                    return false;
                });
                if (validError)
                    return true;
            }
            if (typeof rule !== "object" && extend[rule].regExp(value)) {
                validError = extend[rule].message;
                returnRule = rule;
                return true;
            }
            return false;
        });
        return { validError: validError, rule: returnRule };
    },
    extensions: function (propExtend) {
        extend = __assign(__assign({}, extend), propExtend);
    }
};
