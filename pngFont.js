 pngFont = {
  textDrawed : [],
  textUTF8Array : [],
  fontUrl : null,

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
        console.log(charcode)
    }
    return arrCharCode;
  },

  /** function to draw a single char
  */
  drawChr : function(img, chr,pos){
    // I assume that each char is a 16x16px square in a big 4096x4096px Image
    // Than I crop this image and draw in the canvas.
    var xchar = parseInt(16 * (chr % 256))
    var ychar = parseInt(16 * parseInt(chr/256))
    console.log("x="+xchar)
    console.log("y="+ychar)
    this.ctx.drawImage(img,
        xchar, ychar,
        16, 16,
        pos[0], pos[1],
        16, 16);
  },

  drawText : function(text,pos){
    if(this.textDrawed!==text){
      this.textUTF8Array = this.toCharCodeArray(text);
      this.textDrawed = text;
    }

    var chrPos = [0,0];
    var posx = pos[0]
    var posy = pos[1]
    chrPos[0]+=posx;
    chrPos[1]+=posy;
    for(var i=0; i<this.textUTF8Array.length; i++){
      var char = this.textUTF8Array[i];
      this.drawChr(this.fontImage,char,chrPos);
      chrPos[0]+=16;
    }
    return true
  }

};
