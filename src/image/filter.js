/**
 * Threshold an image between an input minimum and maximum.
 *
 * @class
 */
export class Threshold {
  /**
   * Threshold minimum.
   *
   * @private
   * @type {number}
   */
  #min = 0;

  /**
   * Threshold maximum.
   *
   * @private
   * @type {number}
   */
  #max = 0;

  /**
   * Get the threshold minimum.
   *
   * @returns {number} The threshold minimum.
   */
  getMin() {
    return this.#min;
  }

  /**
   * Set the threshold minimum.
   *
   * @param {number} val The threshold minimum.
   */
  setMin(val) {
    this.#min = val;
  }

  /**
   * Get the threshold maximum.
   *
   * @returns {number} The threshold maximum.
   */
  getMax() {
    return this.#max;
  }

  /**
   * Set the threshold maximum.
   *
   * @param {number} val The threshold maximum.
   */
  setMax(val) {
    this.#max = val;
  }

  /**
   * Get the name of the filter.
   *
   * @returns {string} The name of the filter.
   */
  getName() {
    return 'Threshold';
  }

  /**
   * Original image.
   *
   * @private
   * @type {Image}
   */
  #originalImage = null;

  /**
   * Set the original image.
   *
   * @param {Image} image The original image.
   */
  setOriginalImage(image) {
    this.#originalImage = image;
  }

  /**
   * Get the original image.
   *
   * @returns {Image} image The original image.
   */
  getOriginalImage() {
    return this.#originalImage;
  }

  /**
   * Transform the main image using this filter.
   *
   * @returns {Image} The transformed image.
   */
  update() {
    var image = this.getOriginalImage();
    var imageMin = image.getDataRange().min;
    var self = this;
    var threshFunction = function (value) {
      if (value < self.getMin() || value > self.getMax()) {
        return imageMin;
      } else {
        return value;
      }
    };
    return image.transform(threshFunction);
  }

} // class Threshold

/**
 * Sharpen an image using a sharpen convolution matrix.
 *
 * @class
 */
export class Sharpen {
  /**
   * Get the name of the filter.
   *
   * @returns {string} The name of the filter.
   */
  getName() {
    return 'Sharpen';
  }

  /**
   * Original image.
   *
   * @private
   * @type {Image}
   */
  #originalImage = null;

  /**
   * Set the original image.
   *
   * @param {Image} image The original image.
   */
  setOriginalImage(image) {
    this.#originalImage = image;
  }

  /**
   * Get the original image.
   *
   * @returns {Image} image The original image.
   */
  getOriginalImage() {
    return this.#originalImage;
  }

  /**
   * Transform the main image using this filter.
   *
   * @returns {Image} The transformed image.
   */
  update() {
    var image = this.getOriginalImage();
    /* eslint-disable array-element-newline */
    return image.convolute2D([
      0, -1, 0,
      -1, 5, -1,
      0, -1, 0
    ]);
    /* eslint-enable array-element-newline */
  }

} // class Sharpen

/**
 * Apply a Sobel filter to an image.
 *
 * @class
 */
export class Sobel {
  /**
   * Get the name of the filter.
   *
   * @returns {string} The name of the filter.
   */
  getName() {
    return 'Sobel';
  }

  /**
   * Original image.
   *
   * @private
   * @type {Image}
   */
  #originalImage = null;

  /**
   * Set the original image.
   *
   * @param {Image} image The original image.
   */
  setOriginalImage(image) {
    this.#originalImage = image;
  }

  /**
   * Get the original image.
   *
   * @returns {Image} image The original image.
   */
  getOriginalImage() {
    return this.#originalImage;
  }

  /**
   * Transform the main image using this filter.
   *
   * @returns {Image} The transformed image.
   */
  update() {
    var image = this.getOriginalImage();
    /* eslint-disable array-element-newline */
    var gradX = image.convolute2D([
      1, 0, -1,
      2, 0, -2,
      1, 0, -1
    ]);
    var gradY = image.convolute2D([
      1, 2, 1,
      0, 0, 0,
      -1, -2, -1
    ]);
    /* eslint-enable array-element-newline */
    return gradX.compose(gradY, function (x, y) {
      return Math.sqrt(x * x + y * y);
    });
  }

} // class Sobel
