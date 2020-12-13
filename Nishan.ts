import axios from "axios";
import colors from "colors";

import NotionUser from "./api/NotionUser";
import Cache from "./api/Cache";
import { Logger, NishanArg, GetSpacesResult, INotionUser, FilterType, FilterTypes } from "./types";

export const error = (msg: string) => {
  console.log(colors.red.bold(msg));
  return msg;
};
export const warn = (msg: string) => {
  console.log(colors.yellow.bold(msg));
  return msg;
};


class Nishan extends Cache {
  token: string;
  interval: number;
  init_cache: boolean;
  logger: Logger;

  constructor(arg: Pick<NishanArg, "token" | "interval"> & { logger?: Logger }) {
    super();
    this.token = arg.token;
    this.interval = arg.interval || 500;
    this.init_cache = false;
    this.logger = arg.logger === undefined ? function (method, subject, id) {
      console.log(`${colors.red(method)} ${colors.green(subject)}:${colors.blue(id)}`);
    } : arg.logger;
  }

  #initializeCache = async () => {
    if (!this.init_cache) {
      try {
        const { data } = await axios.post(
          'https://www.notion.so/api/v3/getSpaces',
          {},
          {
            headers: {
              cookie: `token_v2=${this.token}`
            }
          }
        ) as { data: GetSpacesResult }
        Object.values(data).forEach(data => this.saveToCache(data));
        this.init_cache = true;
      } catch (err) {
        throw new Error(error(err.response.data))
      }
    }
  }

  /**
   * Get `INotionUser` and return `NotionUser` by the `args` param
   * @param args An string id, a predicate passed the INotionUser or undefined to indicate everything
   */
  async getNotionUser(arg?: FilterType<INotionUser>) {
    return (await this.getNotionUsers(typeof arg === "string" ? [arg] : arg, false))[0];
  }

  /**
   * Get `INotionUser[]` and return `NotionUser[]` by the `args` param
   * @param args An array of string ids, a predicate passed the INotionUser or undefined to indicate everything
   */
  async getNotionUsers(args?: FilterTypes<INotionUser>, multiple?: boolean) {
    multiple = multiple ?? true;
    await this.#initializeCache();
    const user_ids: string[] = [];
    const common_props = {
      token: this.token,
      cache: this.cache,
      interval: this.interval,
      logger: this.logger
    }

    const notion_user_ids: string[] = [];

    for (let [id] of this.cache.notion_user)
      notion_user_ids.push(id)

    if (Array.isArray(args)) {
      for (let index = 0; index < args.length; index++) {
        const id = args[index], block = this.cache.notion_user.get(id);
        const should_add = Boolean(block);
        if (should_add && block) user_ids.push(block.id);
        if (!multiple && user_ids.length === 1) break;
      }
    } else if (typeof args === "function" || args === undefined) {
      for (let index = 0; index < notion_user_ids.length; index++) {
        const id = notion_user_ids[index], block = this.cache.notion_user.get(id) as INotionUser;
        const should_add = typeof args === "function" ? await args(block, index) : true;
        if (should_add && block) user_ids.push(block.id);
        if (!multiple && user_ids.length === 1) break;
      }
    }
    return user_ids.map(user_id => {
      this.logger && this.logger(`READ`, 'NotionUser', user_id);
      return new NotionUser({ ...common_props, user_id: user_id, id: user_id, space_id: "0", shard_id: 0 })
    });
  }
}

export default Nishan;
export * from "./utils/index";
export * from "./api";
export * from "./types"