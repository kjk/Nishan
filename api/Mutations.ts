import axios from "axios";
import { Request, RemoveUsersFromSpaceResult, RemoveUsersFromSpaceParams, IOperation, NishanArg, SetPageNotificationsAsReadParams, SetSpaceNotificationsAsReadParams, CreateSpaceParams, CreateSpaceResult, EnqueueTaskResult, InviteGuestsToSpaceParams, RecordMap, SetBookmarkMetadataParams, TEnqueueTaskParams } from "../types";
import { createTransaction } from "../utils";
import Queries from "./Queries";

// TODO: remove
const error = (msg: string) => {
  return msg;
};

export default class Mutations extends Queries {
  protected space_id: string;
  protected shard_id: number;
  protected createTransaction: (operations: IOperation[]) => Request

  constructor({ cache, token, interval, logger, user_id, shard_id, space_id }: NishanArg) {
    super({ logger, token, interval, user_id, cache });
    this.shard_id = shard_id;
    this.space_id = space_id;
    this.createTransaction = createTransaction.bind(this, shard_id, space_id);
  }

  protected getProps() {
    return {
      token: this.token,
      interval: this.interval,
      user_id: this.user_id,
      shard_id: this.shard_id,
      space_id: this.space_id,
      cache: this.cache,
      logger: this.logger
    }
  }

  protected async setPageNotificationsAsRead(arg: SetPageNotificationsAsReadParams) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await axios.post(
            `${this.BASE_NOTION_URL}/setPageNotificationsAsRead`,
            arg,
            this.headers
          );
        } catch (err) {
          reject(error(err.response.data))
        }
      }, this.interval)
    });
  }

  protected async setSpaceNotificationsAsRead(arg: SetSpaceNotificationsAsReadParams) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await axios.post(
            `${this.BASE_NOTION_URL}/setSpaceNotificationsAsRead`,
            arg,
            this.headers
          );
        } catch (err) {
          reject(error(err.response.data))
        }
      }, this.interval)
    });
  }

  protected async removeUsersFromSpace(arg: RemoveUsersFromSpaceParams): Promise<RemoveUsersFromSpaceResult> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const { data } = await axios.post(
            `${this.BASE_NOTION_URL}/removeUsersFromSpace`,
            arg,
            this.headers
          ) as { data: RemoveUsersFromSpaceResult };
          this.saveToCache(data.recordMap);
          resolve(data);
        } catch (err) {
          reject(error(err.response.data))
        }
      }, this.interval)
    });
  }

  protected async inviteGuestsToSpace(arg: InviteGuestsToSpaceParams): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await axios.post(
            `${this.BASE_NOTION_URL}/inviteGuestsToSpace`,
            arg,
            this.headers
          );
          resolve()
        } catch (err) {
          reject(error(err.response.data))
        }
      }, this.interval)
    })
  }

  protected async createSpace(params: Partial<CreateSpaceParams>): Promise<CreateSpaceResult> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const { data, data: { recordMap } } = await axios.post(
            `${this.BASE_NOTION_URL}/createSpace`,
            {
              ...params,
              planType: "personal",
              initialUseCases: []
            },
            {
              headers: {
                cookie: `token_v2=${this.token};notion_user_id=${this.user_id};`
              }
            }
          ) as { data: CreateSpaceResult };
          this.saveToCache(recordMap);
          resolve(data);
        } catch (err) {
          reject(error(err.response.data))
        }
      }, this.interval)
    })
  }

  protected async saveTransactions(Operations: IOperation[]): Promise<RecordMap> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await axios.post("https://www.notion.so/api/v3/saveTransactions", this.createTransaction(Operations), this.headers);
          resolve(res.data.recordMap);
        } catch (err) {
          reject(error(err.response.data));
        }
      }, this.interval)
    })
  }

  // ? TD:2:M Add task typedef
  // ? TD:2:M Add EnqueueTaskResult interface
  protected async enqueueTask(task: TEnqueueTaskParams): Promise<EnqueueTaskResult> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await axios.post(
            `${this.BASE_NOTION_URL}/enqueueTask`, {
            task
          }, this.headers);
          resolve(res.data);
        } catch (err) {
          reject(error(err.response.data));
        }
      }, this.interval)
    })
  }

  protected async setBookmarkMetadata(arg: SetBookmarkMetadataParams): Promise<undefined> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await axios.post(
            `${this.BASE_NOTION_URL}/setBookmarkMetadata`,
            arg,
            this.headers
          );
          resolve(undefined);
        } catch (err) {
          reject(error(err.response.data))
        }
      })
    })
  }

}