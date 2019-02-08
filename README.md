# png-font.js

As tiny as possible (840kB) lib to support the majority of
languages glyphs in unicode for pixelart js games.

The js part is made by Érico Porto.

## how to use


Include it in your html.

    <script src="js/pngfont.js"></script>

Use a listener to know when the font image is loaded.

    document.addEventListener(
     'png_font_loaded',function(e){
      png_font.drawText("hello world!",[32,32]);
      png_font.drawText("한국어!",[48,64],"#559");
      png_font.drawText("日本語!",[64,96],"red",2);
      png_font.drawText("Café",[160,40],'orange',4,'blue');
    });

Then, use `png_font.setup` to pass the canvas 2d context and the font image.

    png_font.setup(
     document.getElementById(
      "target").getContext("2d"),
     "unifont.png"
    );

You can hide the `"unifont.png"` argument if it's located in `/img/`
folder with the html at the root folder.

## png_font.drawText

The `drawText` possible args are the following

    string png_font.drawText(text, pos, color, size, shadow,  wrap, tightenCanvas);

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
for word wrapping the text. You can also pass `null` or don't pass wrap for
using the canvas default wrapping box. Use `'nowrap'` or `false` to disable
wrapping.

- **`tightenCanvas` :** resize the canvas so it's just the size of the text.

`drawText` will return any text it was not able to print to the canvas,
because of wrapping limit.

## showcase

- https://arc0re.itch.io/ld42
- https://github.com/ericoporto/rocambolli

## which font is this?

The image font used here is the **GNU Unifont**!
Current version here is Unifont 9.0.02 .

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

## Licensing

I believe my way of embedding the GNU Unifont follows the below
portion of it's license:

>The license for the compiled fonts is covered by the above GPL terms
with the GNU font embedding exception, as follows:

    As a special exception, if you create a document which uses this font,
    and embed this font or unaltered portions of this font into the document,
    this font does not by itself cause the resulting document to be covered
    by the GNU General Public License. This exception does not however
    invalidate any other reasons why the document might be covered by the
    GNU General Public License. If you modify this font, you may extend
    this exception to your version of the font, but you are not obligated
    to do so. If you do not wish to do so, delete this exception statement
    from your version.

I believe with this, it's ok to release this code as MIT [`LICENSE`](LICENSE).
