'use strict';

/**
 * add-card service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::add-card.add-card');
