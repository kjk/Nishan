import { v4 as uuidv4 } from 'uuid';

import { blockSet, collectionListAfter, collectionSet } from '../utils/chunk';

import Getters from "./Getters";

import { ICollection, NishanArg, PageFormat, PageProps } from "../types";

class Collection extends Getters {
  collection_data: ICollection;

  constructor(arg: NishanArg & { collection_data: ICollection }) {
    super(arg);
    this.collection_data = arg.collection_data;
  }

  // ? FEAT:2:E Update cache and class state
  async updateProperties(properties: { name: string[][], icon: string, description: string[][] }) {
    await this.saveTransactions(
      [
        ...Object.entries(properties).map(([path, arg]) => collectionSet(this.collection_data.id, [path], arg)),
        collectionSet(this.collection_data.id, ['last_edited_time'], Date.now())
      ]
    )
  }

  async createTemplate(opts = {} as { properties: PageProps, format: PageFormat }) {
    const { properties = {}, format = {} } = opts;
    const $template_id = uuidv4();
    await this.saveTransactions([
      blockSet($template_id, [], {
        type: 'page',
        id: $template_id,
        version: 1,
        is_template: true,
        parent_id: this.collection_data.id,
        parent_table: 'collection',
        alive: true,
        properties,
        format
      }),
      collectionListAfter(this.collection_data.id, ['template_pages'], { id: $template_id })
    ]);
  }
}

export default Collection;
