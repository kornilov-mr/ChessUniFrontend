## CSS BackReport.

I have tried to use as many different CSS rules and scss features as possible to demonstrate various cases.

## Element for inspection.

&lt;div class="square light "data-piece="blackKn" is-under-check="false"><span class="piece" data-color="black">


The chosen element is the div, which represents the one light square, with a black king on it.

The most important CSS rule is the one with the class="square light ", because it is responsible for the color of the square, as well as for the layout.

## Properties
* ### First property:
*display* - display:flex.

In the generated CSS file its lines 57–59:
```css
.board, .board-row, .square {
display: flex
}
```
In the original that's:
```scss
@mixin flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
.square {
    @include flex-center;
}
```
@display:flex comes from the mixin expansion and might be hard to trace back automatically, because it's indirect, more about that in the next chapter.
* ### Second property:
*background-color* - center:
The case is almost identical to the first one,

In the generated CSS file its lines 61–71:
```css
.square {
    align-items: center;
    cursor: pointer;
    font-size: 40px;
    height: 60px;
    justify-content: center;
    transition: all .2s ease;
    -webkit-user-select: none;
    user-select: none;
    width: 60px
}
```
In the original that's:
```scss
@mixin flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
.square {
    @include flex-center;
}
```
Again generated from the flex-center mixin.

* ### Third property:
*background-color* - #ebecd3:

In the generated CSS file its lines 73–75:
```css
.square.light {
    background-color: #ebecd3;
}
```
In the original that's:
```scss
&.light {
  background-color: $square-light;
}
$square-light: #ebecd3;
```
So it comes from the variable $square-light.
the mapping chain is: Computed value → generated CSS → SCSS rule → SCSS variable

* ### Fourth property:
*transition* – all 0.2s ease

In the generated CSS file its lines 61–71:
```css
.square {
    align-items: center;
    cursor: pointer;
    font-size: 40px;
    height: 60px;
    justify-content: center;
    transition: all .2s ease;
    -webkit-user-select: none;
    user-select: none;
    width: 60px;
}
```
In the original that's:
```scss
.square {
  transition: all 0.2s ease;
}
```
This property maps directly to the authored source.

* ### Fifth property:
*transform (on hover)* - scale(1.02):
In the generated CSS file its lines 81–83:
```css
.square:hover {
    filter: brightness(1.1);
    transform: scale(1.02)
}
```
In the original that's:
```scss
&:hover {
  transform: scale(1.02);
}
```
This selector was generated from SCSS nesting


## Cases Where 1 to 1 mapping is not possible.

### SCSS Mixins.
Like in the second example with align-items.
When inspecting align-items, DevTools shows the generated CSS rule, but it is not obvious that the property came from a mixin.

So the mapping is indirect.

### SCSS Variables
Like in the third example with background-color.

DevTools only shows the final color value, not the variable.
So tracing the value back requires looking at the SCSS source manually.

### Nested Selectors
like in the fifth example with transform.

The selector did not exist in the source exactly like that.
It was constructed during compilation, so mapping is not 1-to-1.
    
## Conclusion
Most of the problems come from scss features, because is scss in compiled to the CSS. These transformations obviously can't be one by one. and requires more complex mapping based on the scss syntax and parsing, especially if we want to include trace backs to the IDEA.
