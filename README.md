## easy-react-carousel

<br/>

<h1 align="center">
    <img src="https://media.giphy.com/media/JOPdLZ3tvQY5H1ZqcP/giphy.gif" alt="" width="800"/>
</h1>

<p align="center">
 An easy, simple and light react carousel 
</p>

## Why?
Bored of installing heavy components full of stuff that you don't need that sometimes are not even made in react ?
If you are looking for a light carousel component, fully made in react this is the right solution for you

## Installation
### Basic

```
npm i easy-react-carousel
```

## Usage
By default, the component does not need anything except for an array of object (slides) passed by the prop ```slides```.

```javascript
import React from 'react';
import Carousel from 'test-react-library-component'

const slides = [
{
  title: // title ,
  description: // description,
  id: // every slide must have a unique id,
  image: // the image url,
  url: // this is used to redirect to the url page when you click on the slide
},
{},
// ...
]

const Carousel = () => (
      <Carousel
        slides={slides}
      />
);

export default Carousel;
```


## Props

### Carousel props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| **slides** | *Array* | `undefined` | You must pass an array of object with the property you see above |
| **onChange** | *Function* | `undefined` | Handler triggered when current slide change  |
| **onClick** | *Array* | `undefined` | Triggered when you click on a slide |
| **showSelectMenu** | *Boolean* | `true` | Shows or not the corousel "buttons" that allows you to switch between slides |
| **disableRedirect** | *Boolean* | `true` | By default if the ```url``` property it's present, when you click on a slide you are redirected to that url, you can disable that option setting this to ```false``` |
| **speed** | *Number* | `5000` | This is the speed of the transition between one slide and another |
| **rtl** | *Boolean* | `true` | Determines in which direction the slider "slide", if it's true it go from right to left (that's why rtl) otherwise from left to right |
| **borderRadius** | *Number* | `4px` | This is the border-radius of the carousel |
| **height** | *Number* | `180px` | The height of the carousel |
| **alignment** | *String* | `left` | You can change the alignment of the text and description to `left`, `center`, `right` |

## Support 💻

Any Issue, contribution or idea are welcome 😃

## Donation 💰

- If you want to support the me consider donating:


[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WJWDBJENVNGHE)

or 

[Donate](https://ko-fi.com/ladvace)



## Authors ❤️

- **Gianmarco Cavallo** (ladvace) - [Github Profile](https://github.com/Ladvace)

### If you have any problems or question open an issue or feel free to contact me! 🔧😃
