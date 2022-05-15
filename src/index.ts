// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.
require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
const cocoSsd = require("@tensorflow-models/coco-ssd");

(async () => {
  // Dani Vicario - test experiment (canvas)- Sun 15 May 2022 22:02:48 CEST

  const canvasDOMEl: HTMLCanvasElement | null = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement;
  const ctx: RenderingContext | null = canvasDOMEl.getContext("2d");

  if (canvasDOMEl === null) return;
  if (ctx === null) return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  // eslint-disable-next-line no-unused-vars
  const w2 = w / 2;
  // eslint-disable-next-line no-unused-vars
  const h2 = h / 2;

  // eslint-disable-next-line no-unused-vars
  const { PI } = Math;
  // eslint-disable-next-line no-unused-vars
  const PI_DOUBLE = 2 * Math.PI;
  // eslint-disable-next-line no-unused-vars
  const PI_HALF = Math.PI / 2;

  function randomFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function shuffle(array: number[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  canvasDOMEl.setAttribute("height", window.innerHeight.toString());
  canvasDOMEl.setAttribute("width", window.innerWidth.toString());

  const ratio = 1;

  const imgCat = new Image();
  imgCat.src = "cats.jpg";

  imgCat.onload = async () => {
    ctx.drawImage(imgCat, 0, 0, imgCat.width / ratio, imgCat.height / ratio);

    // Load the model.
    const model = await cocoSsd.load();
    // Classify the image.
    const predictions = await model.detect(imgCat);
    console.log("Predictions: ");
    console.log(predictions);

    predictions.forEach((p: any) => {
      ctx.beginPath();
      ctx.rect(p.bbox[0] / ratio, p.bbox[1] / ratio, p.bbox[2] / ratio, p.bbox[3] / ratio);
      ctx.strokeStyle = `rgba(0, ${randomInt(0, 255)}, 0, 1)`;
      ctx.stroke();
      ctx.closePath();
    });
  };
})();