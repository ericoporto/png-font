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

  drawText : function(text,pos, color){
    if(this.textDrawed!==text){
      this.textUTF8Array = this.toCharCodeArray(text);
      this.textDrawed = text;
    }

    var buffer = document.createElement('canvas');
    buffer.width = 16*this.textUTF8Array.length;
    buffer.height = 16;
    var bx = buffer.getContext('2d');

    var chrPos = [0,0];
    for(var i=0; i<this.textUTF8Array.length; i++){
      var char = this.textUTF8Array[i];
      this.drawChr(bx, this.fontImage,char,chrPos);
      chrPos[0]+=16;
    }

    if(typeof color !== 'undefined'){
      bx.fillStyle = color
      bx.globalCompositeOperation = "source-in";
      bx.fillRect(0, 0, buffer.width, buffer.height);
    }

    this.ctx.drawImage(buffer,pos[0],pos[1]);

    return true
  }

};
