# pngFontJs

As tiny as possible (840kB) lib to support the majority of
languages glyphs in unicode for pixelart js games.

The js part is made by Érico Porto.

## how to use


Include it in your html.

    <script src="pngFont.js"></script>

Use a listener to know when the font image is loaded.

    document.addEventListener(
     'pngFontLoaded',function(e){
      pngFont.drawText("hello world!",[32,32]);
      pngFont.drawText("한국어!",[48,64],"#559");
      pngFont.drawText("日本語!",[64,96],"red",2);
      pngFont.drawText("Café",[160,40],'orange',4,'blue');
    });

Then, use `pngFont.setup` to pass the canvas 2d context and the font image.

    pngFont.setup(
     document.getElementById(
      "target").getContext("2d"),
     "unifont_9_0_02.png"
    );

## pngFont.drawText

The `drawText` possible args are the following

    string pngFont.drawText(text, pos, color, size, shadow,  wrap);

- **`text` :** a text string to write to canvas.

- **`pos` :** an array [X,Y], where X and Y are integers representing
drawing position.

- **`color` :** the color. Ex: red can be passed as `'red'`, `'#F00'` or
`'#FF0000'`. You can also pass `null` or don't pass color for black.

- **`size` :** a size multiplier. Please keep to integers. You can also
pass `null` or don't pass size for `1`.

- **`shadow` :** the shadow color. Ex: red can be passed as `'red'`,
`'#F00'` or `'#FF0000'`. You can also pass `null` or don't pass color
for no shadow.

- **`wrap` :** an array of the type `[box_width, box_height, line_spacing]`,
for wrapping the text. You can also pass `null` or don't pass wrap for using
the canvas default wrapping.

`drawText` will return any text it was not able to print to the canvas,
because of wrapping limit.

## which font is this?

The image font used here is the **GNU Unifont**!

You can read more about in the website, which is mantained
by the awesome Paul Hardy: http://unifoundry.com/unifont.html .

## unifont AUTHORS

Roman Czyborra created the original GNU Unifont, including the
.hex format.  For greater detail, see the HISTORY in the GNU
Unifont README.

David Starner aggregated many glyphs contributed by others and
incorporated these into pre-2004 Unifont releases.

Qianqian Fang began his Wen Quan Yi font in 2004, by which
time work on Unifont had stopped.  Most of the almost 30,000
CJK ideographs in Unifont versions 5.1 and later were taken
from Wen Quan Yi with permission of Qianqian Fang.  The glyphs
in "./font/plane00/wqy-cjk.hex" are for the most part Qianqian
Fang's Unibit and Wen Quan Yi glyphs.

Paul Hardy drew most of the newly-drawn glyphs added to the BMP
from the Unifont 5.1 release to the present release.  This includes
the 11,172 glyphs in the Hangul Syllables block, plus approximately
10,000 additional glyphs scattered throughout the BMP.

Andrew Miller drew the glyphs added to Unicode 6.3.0.

For higher planes and the Private Use Area glyphs, see the
unifont ChangeLog file.
