import {Line, getAngle} from './line';
import {i18n} from '../utils/i18n';

// doc imports
/* eslint-disable no-unused-vars */
import {Point2D} from '../math/point';
import {ViewController} from '../app/viewController';
/* eslint-enable no-unused-vars */

/**
 * Protractor shape: 3 points from which to calculate an angle.
 */
export class Protractor {

  /**
   * List of points.
   *
   * @type {Point2D[]}
   */
  #pointArray;

  /**
   * @param {Point2D[]} pointArray The list of Point2D that make
   *   the protractor.
   */
  constructor(pointArray) {
    if (pointArray.length > 3) {
      throw new Error('Too many points for a protractor');
    }
    this.#pointArray = pointArray.slice(0, 3);
  }

  /**
   * Get the point list.
   *
   * @returns {Point2D[]} The list.
   */
  getPointList() {
    return this.#pointArray;
  }

  /**
   * Get a point of the list.
   *
   * @param {number} index The index of the point
   *   to get (beware, no size check).
   * @returns {Point2D|undefined} The Point2D at the given index.
   */
  getPoint(index) {
    return this.#pointArray[index];
  }

  /**
   * Get the length of the path (should be 3).
   *
   * @returns {number} The length of the path.
   */
  getLength() {
    return this.#pointArray.length;
  }

  /**
   * Quantify a path according to view information.
   *
   * @param {ViewController} _viewController The associated view controller.
   * @param {string[]} _flags A list of stat values to calculate.
   * @returns {object} A quantification object.
   */
  quantify(_viewController, _flags) {
    const quant = {};
    if (this.#pointArray.length === 3) {
      const line0 = new Line(this.#pointArray[0], this.#pointArray[1]);
      const line1 = new Line(this.#pointArray[1], this.#pointArray[2]);
      let angle = getAngle(line0, line1);
      if (angle > 180) {
        angle = 360 - angle;
      }
      quant.angle = {
        value: angle,
        unit: i18n.t('unit.degree')
      };
    }
    return quant;
  }

} // Protractor class
