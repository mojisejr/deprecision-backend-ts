"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleDriveImage = void 0;
var googleDriveImage = /** @class */ (function () {
    function googleDriveImage(url) {
        this._url = url;
        this._imageId = "";
    }
    googleDriveImage.build = function (url) {
        return new googleDriveImage(url);
    };
    Object.defineProperty(googleDriveImage.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (url) {
            this._url = url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(googleDriveImage.prototype, "imageId", {
        get: function () {
            return this._imageId;
        },
        enumerable: false,
        configurable: true
    });
    googleDriveImage.prototype.getImageIdFromSharedUrl = function (url) {
        var backSlashSplitedUrl = url.split("/");
        var imageId = backSlashSplitedUrl[5];
        return imageId;
    };
    googleDriveImage.prototype.toDisplay = function () {
        if (this._url === null) {
            throw new Error("image url cannot be null");
        }
        var mainUrl = "https://drive.google.com/uc?export=view&id=";
        this._imageId = this.getImageIdFromSharedUrl(this._url);
        var mergedUrl = mainUrl + this._imageId;
        return mergedUrl;
    };
    return googleDriveImage;
}());
exports.googleDriveImage = googleDriveImage;
