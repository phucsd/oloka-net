import * as migration_20260918_151419_initial from './20260918_151419_initial';
import * as migration_20261007_121544_add_news_and_tools from './20261007_121544_add_news_and_tools';
import * as migration_20261010_030721_update_schema_seo_redirects_search from './20261010_030721_update_schema_seo_redirects_search';

export const migrations = [
  {
    up: migration_20260918_151419_initial.up,
    down: migration_20260918_151419_initial.down,
    name: '20260918_151419_initial',
  },
  {
    up: migration_20261007_121544_add_news_and_tools.up,
    down: migration_20261007_121544_add_news_and_tools.down,
    name: '20261007_121544_add_news_and_tools',
  },
  {
    up: migration_20261010_030721_update_schema_seo_redirects_search.up,
    down: migration_20261010_030721_update_schema_seo_redirects_search.down,
    name: '20261010_030721_update_schema_seo_redirects_search'
  },
];
