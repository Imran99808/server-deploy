'use strict';

/**
 * trending-product service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::trending-product.trending-product');
