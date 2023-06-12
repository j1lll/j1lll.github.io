const photoPaths = [
    "../assets/images/logo.JPG",
    "../assets/images/gambling_gene.webp",
    "../assets/images/lecture_gene.jpeg"
];
    
const photoButtons = document.querySelectorAll(".photo-button");
const filterButtons = document.querySelectorAll(".filter-button");
const canvas = document.querySelector("#img-box");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
    
    
// Attach click event listeners to the photo buttons
photoButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const photoPath = photoPaths[index];
        selectPhoto(photoPath);
        applyFilter("remove");
    });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const filter = event.target.innerHTML;
    applyFilter(filter);
  });
});

const changeControl = {
    prevImage: null,
    currentImage: null,
    nextImage: null,
};

function remove()
{
    flag=true;
    document.getElementById("img-box").style.display='none';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.querySelector("div.uploaded-img-container").style.display = "block";
    flag=true;

}

function showParagraph(id) {
    const paragraph = document.getElementById(id);
    paragraph.style.display = "block";
}

function hideAllParagraphs() {
    const paragraphs = document.querySelectorAll("#left p");
    paragraphs.forEach((paragraph) => {
        paragraph.style.display = "none";
    });
}

//Function to call specific filters and do change control, add new cases for new filters
function applyFilter(filter){
    
    changeControl.nextImage = null;
    changeControl.prevImage = changeControl.currentImage;
    hideAllParagraphs();
    switch(filter){
        case "grey":
            doGreyScale();
            showParagraph("grey-text");
            break;
        case "sepia":
            doSepia();
            showParagraph("sepia-text");
            break;
        case "lark":
            doLark();
            showParagraph("lark-text");
            break;
        case "flip":
            showParagraph("flip-text");
            doFlip();
            break;
        case "crumble":
            doCrumble();
            showParagraph("crumble-text");
            break;
        case "blur":
            doBlur();
            showParagraph("blur-text");
            break;
        case "remove":
            remove();
            showParagraph("all-text");
            break;
        default:
            hideAllParagraphs();
            showParagraph("all-text");
            remove();
            
    }
    changeControl.currentImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

//Simple algorithm to convert image to GreyScale
function doGreyScale(){
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for(var i = 0; i < data.length; i += 4){
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
    ctx.putImageData(imageData, 0, 0);
}

//Simple algorithm to convert image to Sepia
function doSepia(){
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for(let i = 0; i < data.length; i += 4){
        data[i]*=1.07;
        data[i + 1]*=0.74;
        data[i + 2]*=0.43;
    }
    ctx.putImageData(imageData, 0, 0);
}

//Simple algorithm to convert image to Lark
function doLark(){
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    brightness(data,0.08);
    rgbAdjust(data,[1,1.03,1.05]);
    saturation(data,0.12);
    ctx.putImageData(imageData, 0, 0);
}

//simple algorithm to flip image
function doFlip(){
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for(let i = 0; i < data.length; i += 4){
        var d1=data[i];
        var d2= data[i+1];
        var d3=data[i+2];
        data[i]=d2;
        data[i + 1]=d3;
        data[i + 2]=d1;
    }
    ctx.putImageData(imageData, 0, 0);
}

function doCrumble() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
  
    var noiseMatrix = generateNoiseMatrix(canvas.width, canvas.height);
  
    // Apply crumbling effect by adding noise matrix to image matrix
    for (let i = 0; i < data.length; i += 4) {
      const noiseIndex = i / 4;
      const noiseValue = noiseMatrix[noiseIndex];
  
      data[i] += noiseValue;
      data[i + 1] += noiseValue;
      data[i + 2] += noiseValue;
    }
  
    ctx.putImageData(imageData, 0, 0);
  }
  
  // Generate a random noise matrix
  function generateNoiseMatrix(width, height) {
    var noiseMatrix = [];
  
    for (let i = 0; i < width * height; i++) {
      const noiseValue = Math.random() * 50;  // Adjust the range of noise values as desired
      noiseMatrix.push(noiseValue);
    }
  
    return noiseMatrix;
  }
  

// Define the blur matrix
const blurMatrix = [
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
  ];
  
  // Apply the blur filter to the image data
  function doBlur() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
  
    const resultData = new Uint8ClampedArray(data.length);
  
    const width = canvas.width;
    const height = canvas.height;
  
    // Apply the blur matrix convolution
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0;
        let g = 0;
        let b = 0;
  
        for (let row = -1; row <= 1; row++) {
          for (let col = -1; col <= 1; col++) {
            const currentX = x + col;
            const currentY = y + row;
  
            // Handle edge cases
            if (currentX >= 0 && currentX < width && currentY >= 0 && currentY < height) {
              const index = (currentY * width + currentX) * 4;
              const matrixValue = blurMatrix[row + 1][col + 1];
  
              r += data[index] * matrixValue;
              g += data[index + 1] * matrixValue;
              b += data[index + 2] * matrixValue;
            }
          }
        }
  
        const currentIndex = (y * width + x) * 4;
        resultData[currentIndex] = Math.round(r);
        resultData[currentIndex + 1] = Math.round(g);
        resultData[currentIndex + 2] = Math.round(b);
        resultData[currentIndex + 3] = data[currentIndex + 3];
      }
    }
  
    // Update the canvas with the blurred image data
    ctx.putImageData(new ImageData(resultData, width, height), 0, 0);
  }
  

//val should be from -1 to 1 and 0 for unchanged
function brightness(data,val){
    if(val<=-1){
        val=-1;
    }
    if(val>=1){
        val=1;
    }
    val=~~(255*val);
    for(let i=0;i<data.length;i+=1){
        data[i]+=val;
    }
}

//val should be -1 to positive number and 0 is for unchanged
function saturation(data,val){
    if(val<=-1){
        val=-1;
    }
    for(let i=0;i<data.length;i+=4){
        let gray=0.2989*data[i]+0.1140*data[i+2]+0.5870*data[i+1];
        data[i]= -gray*val+data[i]*(1+val);
        data[i+1]= -gray*val+data[i+1]*(1+val);
        data[i+2]= -gray*val+data[i+2]*(1+val);
    }
}

//RGB Adjust
function rgbAdjust(data,vals){
    for(let i=0;i<data.length;i+=4){
        data[i]*=vals[0];
        data[i+1]*=vals[1];
        data[i+2]*=vals[2];
    }
}

// Load and display the selected photo
function selectPhoto(photoPath) {
    const image = new Image();
    image.src = photoPath;
    image.onload = () => {
        document.querySelector("div.uploaded-img-container").style.display = "none";
        canvas.style.display = "block";
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        changeControl.currentImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
}