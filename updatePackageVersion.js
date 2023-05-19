"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = require("fs/promises");
var path_1 = require("path");
var libraryPackageJsonPath = process.argv[2];
if (libraryPackageJsonPath === null || libraryPackageJsonPath === undefined) {
    throw new Error('Не передан путь к файлу package.json, который требуется обновить.');
}
else {
    if (typeof libraryPackageJsonPath !== 'string') {
        throw new Error('Путь к обновляемому файлу package.json должен быть строкой.');
    }
    else {
        if ((0, path_1.extname)(libraryPackageJsonPath) !== '.json') {
            throw new Error('Указанный файл - не json.');
        }
    }
}
var mainPackageJsonPath = (0, path_1.join)(process.cwd(), 'package.json');
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var libraryPackageJson, _b, _c, mainPackageJson_1, _d, _e, versionArray, libraryDependencies_1, haveChanges_1, checkDep_1, message_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 6, , 7]);
                    _c = (_b = JSON).parse;
                    return [4 /*yield*/, (0, promises_1.readFile)(libraryPackageJsonPath, { encoding: 'utf-8' })];
                case 1:
                    libraryPackageJson = _c.apply(_b, [_f.sent()]);
                    _e = (_d = JSON).parse;
                    return [4 /*yield*/, (0, promises_1.readFile)(mainPackageJsonPath, { encoding: 'utf-8' })];
                case 2:
                    mainPackageJson_1 = _e.apply(_d, [_f.sent()]);
                    versionArray = (_a = libraryPackageJson === null || libraryPackageJson === void 0 ? void 0 : libraryPackageJson.version) === null || _a === void 0 ? void 0 : _a.split('.');
                    libraryDependencies_1 = libraryPackageJson.peerDependencies;
                    haveChanges_1 = false;
                    checkDep_1 = function (main, library) {
                        return main && !library.includes('>=') && main !== library;
                    };
                    Object.keys(libraryDependencies_1).forEach(function (key) {
                        if (checkDep_1(mainPackageJson_1.dependencies[key], libraryDependencies_1[key])) {
                            libraryDependencies_1[key] = mainPackageJson_1.dependencies[key];
                            if (!haveChanges_1) {
                                haveChanges_1 = true;
                            }
                        }
                        else {
                            if (checkDep_1(mainPackageJson_1.devDependencies[key], libraryDependencies_1[key])) {
                                libraryDependencies_1[key] = mainPackageJson_1.devDependencies[key];
                                if (!haveChanges_1) {
                                    haveChanges_1 = true;
                                }
                            }
                        }
                    });
                    if (!(haveChanges_1 || (versionArray && (versionArray === null || versionArray === void 0 ? void 0 : versionArray[2])))) return [3 /*break*/, 4];
                    if (versionArray && (versionArray === null || versionArray === void 0 ? void 0 : versionArray[2])) {
                        versionArray[2] = String(+versionArray[2] + 1);
                        libraryPackageJson.version = versionArray.join('.');
                    }
                    return [4 /*yield*/, (0, promises_1.writeFile)(libraryPackageJsonPath, JSON.stringify(libraryPackageJson, null, 2))];
                case 3:
                    _f.sent();
                    console.log("Successfully update library package.json file!.");
                    return [3 /*break*/, 5];
                case 4: throw new Error("Error on update version in package.json file!. Current value (need fix) = ".concat(libraryPackageJson.version, "."));
                case 5: return [3 /*break*/, 7];
                case 6:
                    message_1 = _f.sent();
                    console.log(message_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
main();
