export const environment = {
  production: true,
  enablePurge: true,
  STRAPI_SECTION_URL: 'https://sections.esn-germany.de/website-', // e.g. https://sections.esn-germany.de/esnfreiburg-
  STRAPI_SECTION_URL_IMAGE: 'https://sections.esn-germany.de',
  SECTION_NAME: REPLACE_SECTION_NAME,
  DIRECTUS_URL_IMAGE: 'https://directus.esn-germany-testing.de/assets/',
  DIRECTUS_URL_FILES: 'https://directus.esn-germany-testing.de/files/',
  DIRECTUS_URL: 'https://directus.esn-germany-testing.de/items/website_',
  DIRECTUS_SECTION_FILTER: `?filter[section][name]=`,
  timeStamp: '2023-04-06 16:20:38',
};
