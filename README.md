# MATH 104: Applied Matrix Theory & Linear Algebra

This project demonstrates how basic principles of linear algebra are applied in order to transform images when photos are filtered and edited. Matrix operations, such as multiplication, addition, convolution, and averaging, are utilized to modify pixel values and create the desired visual effects. By leveraging the mathematical foundations of linear algebra, photo editors can achieve a wide range of creative enhancements and artistic transformations in their images.


## Description

Photo editing and photo storage is directly linked to linear algebra since images can be represented as matrices of pixels. Each pixel has an RGB value that is represented by a vector with an entry for each of the pixel's red, green, blue, and alpha (transparency) values. This webapp allows users to select one of three different photos to be displayed in the center of the page. This selection transfers the image data onto the canvas. From there, users can add filters to the image by clicking the buttons that are on the right side of the screen. When a filter is clicked, information regarding the link between the changes appearing on the canvas and linear algebra show up on the left side of the screen. 

### Grey Scale
- the function performs a basic linear transformation on the pixel data array to convert the image to grayscale by setting the red, green, and blue components of each pixel to the average intensity.

### Sepia / Lark
- these functions apply scalar multiplication and addition to each pixel vector in the image's matrix of pixels in order to acheive the desired effect on the photo.

### Flip
- this filter flips the RGB values of each pixel, setting the new red value to the green value, the new green value to the blue value, and the new blue value to the red value
- this is an example of performing a permutation operation on the color vectors since the colors' corresponding rows are being swapped around

### Crumble

## Help



## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details

## Acknowledgments

Based off of gdscjgec's Image Editor framework
https://gdscjgec.github.io/Image-Editor/
