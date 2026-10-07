import * as migration_20260918_151419_initial from './20260918_151419_initial';
import * as migration_20261007_121544_add_news_and_tools from './20261007_121544_add_news_and_tools';

export const migrations = [
  {
    up: migration_20260918_151419_initial.up,
    down: migration_20260918_151419_initial.down,
    name: '20260918_151419_initial',
  },
  {
    up: migration_20261007_121544_add_news_and_tools.up,
    down: migration_20261007_121544_add_news_and_tools.down,
    name: '20261007_121544_add_news_and_tools'
  },
];
