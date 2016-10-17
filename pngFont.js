 pngFont = {
  textDrawed : [],
  textUTF8Array : [],
  fontUrl : null,

  /** to start the pngFont writer
  */
  setup : function(drawingContext, fontImageUrl){
    this.ctx = drawingContext;
    this.fontImage = new Image();
    this.fontImage.onload = function() {
      var event = new Event('pngFontLoaded');
      document.dispatchEvent(event);
    }
    this.fontImage.src = fontImageUrl;
  },

  /** to convert str with possible unicode to array of unicode chars
  */
  toCharCodeArray: function(str) {
    var arrCharCode = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        arrCharCode.push(charcode)
    }
    return arrCharCode;
  },

  /** function to draw a single char
  */
  drawChr : function(ctx, img, chr,pos){
    // I assume that each char is a 16x16px square in a big 4096x4096px Image
    // Than I crop this image and draw in the canvas.
    var xchar = parseInt(16 * (chr % 256));
    var ychar = parseInt(16 * parseInt(chr/256));
    ctx.drawImage(img,
        xchar, ychar,
        16, 16,
        pos[0], pos[1],
        16, 16);
  },

  /** creates pixel art friendly canvas and return it
  *   it's going to be used to create intermediate buffers
  */
  createBufferCanvas: function(width,height){
    var buffer = document.createElement('canvas');
    buffer.style['image-rendering']='pixelated'
    buffer.width = width;
    buffer.height = height;
    var bx = buffer.getContext('2d');
    bx.mozImageSmoothingEnabled = false;
    bx.webkitImageSmoothingEnabled = false;
    bx.imageSmoothingEnabled = false;
    return buffer
  },

  /** function to draw text in a canvas.
  *    the user show access drawText as entry point though
  */
  drawTextCanvas : function(ctx,text,pos, color,size){
    if(this.textDrawed!==text){
      this.textUTF8Array = this.toCharCodeArray(text);
      this.textDrawed = text;
    }
    var width = 16*this.textUTF8Array.length;
    var height = 16;
    var buffer = this.createBufferCanvas(width,height);
    var bx = buffer.getContext('2d');

    var chrPos = [0,0];
    for(var i=0; i<this.textUTF8Array.length; i++){
      var char = this.textUTF8Array[i];
      this.drawChr(bx, this.fontImage,char,chrPos);
      chrPos[0]+=16;
    }

    if(typeof color !== 'undefined' || color !== null){
      bx.fillStyle = color
      bx.globalCompositeOperation = "source-in";
      bx.fillRect(0, 0, width, height);
    }

    //this will resize the image if needed by using an intermediate buffer
    if(typeof size === 'undefined' || size === null || size == 1 ){
      ctx.drawImage(buffer,pos[0],pos[1]);
    } else {
      var bufferSize = this.createBufferCanvas(width*size,
                                           height*size);
      var bSx = bufferSize.getContext('2d');

      bSx.drawImage(buffer, 0, 0, width*size , height*size);
      ctx.drawImage(bufferSize,pos[0],pos[1]);
    }
    return true
  },

  /** allows drawing text with shadows
  */
  drawTextShadow: function(text, color, size, shadowcolor){
    if(this.textDrawed!==text){
      this.textUTF8Array = this.toCharCodeArray(text);
      this.textDrawed = text;
    }
    if(typeof size === 'undefined' || size === null){
      size = 1
    }
    var width = 16*this.textUTF8Array.length*size;
    var height = 16*size;
    var buffer = this.createBufferCanvas(width+1,height+1);
    var bx = buffer.getContext('2d');
    this.drawTextCanvas(bx,text, [size,size], shadowcolor, size);
    this.drawTextCanvas(bx,text, [0,0], color, size);
    return buffer
  }
  ,

  /** How to draw texts in a canvas
  *
  * examples:
  *
  * pngFont.drawText("hello world!",[32,32])
  * pngFont.drawText("한국어!",[48,64],"#559")
  * pngFont.drawText("hello world!",[4,4],'blue',2,'red')
  */
  drawText: function(text, pos, color, size,shadow){
    if(typeof size === 'undefined' || size === null){
      size = 1
    }
    if(typeof shadow === 'undefined' || shadow === null || shadow == false){
      this.drawTextCanvas(this.ctx,text, pos, color, size);
    } else {

      this.ctx.drawImage(this.drawTextShadow(text, color, size,shadow),
                         pos[0],pos[1]);
    }
  }
};
