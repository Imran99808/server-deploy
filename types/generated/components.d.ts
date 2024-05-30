import type { Schema, Attribute } from '@strapi/strapi';

export interface ColorProductColor extends Schema.Component {
  collectionName: 'components_color_product_colors';
  info: {
    displayName: 'Product-color';
    description: '';
  };
  attributes: {
    color: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'color.product-color': ColorProductColor;
    }
  }
}
