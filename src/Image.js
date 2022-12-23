import UPNG from './libs/UPNG';
import gifFrames from './libs/gifFrames';

var signatures = {
    JVBERi0: "application/pdf",
    R0lGODdh: "image/gif",
    R0lGODlh: "image/gif",
    iVBORw0KGgo: "image/png",
    "/9j/": "image/jpeg"
};

function isUrlValid(str) {
    if (typeof str === "string") 
    {
        var pattern = new RegExp('^(https?:\\/\\/)?'+
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
            '(\\#[-a-z\\d_]*)?$','i'); 

        return !!pattern.test(str);
    }

    return false;
}

function getBlobFromImage() 
{

}

function getMimeFromImage() 
{
    return "image/png";
}

function downloadFileFromXML(url, success) {
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', url, true); 
    xhr.responseType = "arraybuffer";
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.anonymous = true;
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4) 
        {
            success && success(xhr.response);
        }
    };
    xhr.send(null);
}

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

function loadImageFromFile(file, cb) 
{
    var img = document.createElement('img');
    img.onload = function() {
        cb(img)
    }

    img.file = file;

    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
}


const ImageUtils = {
    loadImage: function(data, cb) 
    {
        if (data instanceof FileList)
        {
            if (data[0]) 
            {
                loadImageFromFile(data[0], cb);
            }
        }
        else if (data instanceof File) 
        {
            loadImageFromFile(data, cb);
        }
        else if (isUrlValid(data) || this.checkIfBase64(data)) 
        {
            var img = document.createElement('img');
            img.onload = function() {
                cb(img)
            }
            img.src = data;
        }
    },

    checkIfGif: function(image) 
    {
        return (this.getMime(image) === "image/gif");
    },

    checkIfBase64: function(data) 
    {
        return (typeof data === "string" && data.indexOf("data:image") > -1);
    },

    checkIfClearBase64: function(data) 
    {
        if (typeof data === "string" && !this.checkIfBase64(data)) 
        {
            for (var s in signatures) 
            {
                if (data.indexOf(s) === 0) 
                {
                    return true;
                }
            }
        }

        return false;
    },

    getClearBase64: function(image) 
    {
        if (image instanceof Image) 
        {
            return getBlobFromImage();
        }
        else if (this.checkIfBase64(image)) 
        {
            var block = image.split(";");

            // var contentType = block[0].split(":")[1];

            return block[1].split(",")[1];
        }
        else if (this.checkIfClearBase64(image)) 
        {
            return image;
        }
    },

    getMime: function(image) 
    {
        var result = null;

        if (image instanceof Image) 
        {
            result = getMimeFromImage();
        }
        else if (this.checkIfBase64(image)) 
        {
            var mime = image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

            if (mime && mime.length) 
            {
                result = mime[1];
            }
        }
        else if (this.checkIfClearBase64(image)) 
        {
            for (var s in signatures) 
            {
                if (image.indexOf(s) === 0) 
                {
                    result = signatures[s];
                    break;
                }
            }
        }

        return result
    },

    getFormat: function(image) 
    {
        return this.getMime(image).replace("image/", "");
    },

    getBlob: function(image) 
    {
        if (image instanceof Image) 
        {
            return getBlobFromImage();
        }
        else if (this.checkIfBase64(image) || this.checkIfClearBase64(image)) 
        {
            return b64toBlob(this.getClearBase64(image), this.getMime(image));
        }
    },

    getInfo: function(image) 
    {
        return {
            mime: this.getMime(image),
            format: this.getFormat(image),
            clearBase64: this.getClearBase64(image)
        };
    },
    getSpritesheetFromGIF: function(gifImg, info, cb) {
        if (info === void 0) 
        {

            info = {
                duration: 10000,
                frames_count: 100,
                delays: []
            }

            for (var i = 0; i < 100; i++) 
            {
                info.delays.push(80)
            }
        }

        var frames = [];

        function convertFrameDataToBase64( frameData ) {

            var oCanvas = document.createElement('canvas');
            var oCtx = oCanvas.getContext('2d');
            var x_offset = 0

            if (frameData.length > 0) 
            {
                var o_img = frameData[0].getImage();
                var oWidth = o_img.width;
                var oHeight = o_img.height;
                oCanvas.width = oWidth * frameData.length;
                oCanvas.height = oHeight;

                frameData.forEach(function (frame, index) {
                    var img = frame.getImage();

                    oCtx.drawImage(img, x_offset, 0, oWidth, oHeight)

                    frames.push({
                        x: x_offset,
                        y: 0,
                        width: oWidth,
                        height: oHeight,
                        duration: info.delays[index]
                    })

                    x_offset += oWidth

                });

                cb && cb(oCanvas.toDataURL(), frames);

                oCanvas = void 0;
            }
        }

        gifFrames(

            {
                url: gifImg,
                frames: '0-' + (info.frames_count + 2),
                outputType: 'canvas',
                cumulative: false
            },

            function (err, frameData) {
                if (err) 
                {
                    throw err;
                }

                convertFrameDataToBase64(frameData)
            }

        );
    },

    getGifInfo: function(url, cb) 
    {

        downloadFileFromXML(url, function(data) {
            var d = new Uint8Array(data);
            // var bin = '' 
            // var duration = 0
            // var frames_count = 0
            var to_return = {
                duration: 0,
                frames_count: 0,
                delays: []
            }
            for (var i = 0; i < d.length; i++) {
                // bin += String.fromCharCode( d[i] )
            
                if (d[i] === 0x21 
                    && d[i + 1] === 0xF9 
                    && d[i + 2] === 0x04 
                    && d[i + 7] === 0x00) {

                        var delay = (d[i + 5] << 8) | (d[i + 4] & 0xFF) * 10

                        to_return.delays.push(Math.max(delay - 10, 5))
                        to_return.frames_count += 1
              
                        to_return.duration += delay < 2 ? 10 : delay
                    }
            }
            cb(to_return)
        });
    },

    fileSize: function(src) 
    {
        var base64Length = src.length - (src.indexOf(',') + 1);
        var padding = (src.charAt(src.length - 2) === '=') ? 2 : ((src.charAt(src.length - 1) === '=') ? 1 : 0);
        return base64Length * 0.75 - padding;
    },

    size: function(image, isBytes, isFileSize) 
    {
        var length = 0;

        if (image instanceof Image) 
        {
            return getBlobFromImage();
        }
        else if (typeof image === "number") 
        {
            length = image;
        }
        else if (this.checkIfBase64(image) || this.checkIfClearBase64(image)) 
        {
            length = image.length;
        }
        else 
        {
            return 0;
        }

        var sizeInBytes = length;

        if (isFileSize !== false) 
        {
            sizeInBytes = this.fileSize(image);
        }

        if (isBytes === true) 
        {
            return sizeInBytes;
        }

        return sizeInBytes / 1000;
    },

    convert: function( options, cb ) 
    {
        options = options || {};

        var image = options.image || options.src;
        cb = cb || (() => {});


        const { type, scale, quality } = options;

        var optionsToReturn = {
            type: type,
            scale: scale,
            quality: quality,
        }

        var oCanvas = document.createElement('canvas');
        var oCtx = oCanvas.getContext('2d');

        if (image.width > 0) 
        {
            var width =  Math.floor(image.width * scale)
            var height = Math.floor(image.height * scale)

            var oWidth = width;
            var oHeight = height;     

            var x = width/2;
            var y = height/2;

            oCanvas.width = width;
            oCanvas.height = height;

            oCtx.translate(x, y);
            oCtx.drawImage(image, -oWidth /2, -oHeight /2,  oWidth, oHeight);
            
      

            var quality_for_jpeg = quality / 300
            if (type === "image/png") 
            {
                var dta = oCtx.getImageData(0, 0, oCanvas.width, oCanvas.height).data;
                var png_o = UPNG.encode([dta.buffer], oCanvas.width, oCanvas.height, 0);
                var png = UPNG.encode([dta.buffer], oCanvas.width, oCanvas.height, quality);
                if (png.byteLength > png_o.byteLength)
                    png = png_o
                var data = new Uint8Array(png);
                var blob = new Blob([data], {type: 'image/png'});
                var reader = new FileReader();
                reader.onloadend = function() {              
                    cb(reader.result, optionsToReturn)
                }

                reader.readAsDataURL(blob); 
            } 
            else 
            {
                cb(oCanvas.toDataURL(type, quality_for_jpeg), optionsToReturn)
            }
            oCanvas = void 0;
        }
    }
}

export default ImageUtils;