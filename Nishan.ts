import axios from "axios";

// inline uuidv4 package

let rnds8 = new Uint8Array(16);
function rng(): Uint8Array {
    return crypto.getRandomValues(rnds8);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex: string[] = [];

for (var i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).substr(1));
}

function validateUID(uuid: string): boolean {
    const REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    return typeof uuid === 'string' && REGEX.test(uuid);
}

function stringifyUID(arr: Uint8Array): string {
    const offset = 0;
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!validateUID(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}

function uuidv4() {
    let rnds = rng(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

    return stringifyUID(rnds);
}

// file: utils/chunk.ts

const tables = ["space", "space_view", "collection", "block", "collection_view", "collection_view_page", "notion_user", "user_settings", "user_root"] as TOperationTable[];
const commands = ["setPermissionItem", "listRemove", "listBefore", "listAfter", "update", "set"] as TOperationCommand[];
const Operations: Record<TOperationTable, Record<TOperationCommand, ((id: string, path: string[], args: Args) => IOperation)>> = {} as any;

tables.forEach(table => {
    Operations[table] = {} as any;
    commands.forEach(command => {
        Operations[table][command] = (id: string, path: string[], args: Args): IOperation => {
            return {
                path,
                table,
                command,
                args,
                id
            }
        }
    })
});

// TODO: use Operations instead
const Operation = Operations;

// file: utils/createTransaction.ts

export function createTransaction(shardId: number, spaceId: string, operations: IOperation[]) {
    return {
        requestId: uuidv4(),
        transactions: [{
            id: uuidv4(),
            shardId,
            spaceId,
            operations
        }]
    } as Request;
}

// file: utils/inlineBlocks.ts
export function inlineDate(arg: InlineDateArg) {
    const text: [[string, any[][]]] = [["‣", [["d", arg]]]];
    return {
        text,
        add(title: string) {
            text.push([title, [[""]]]);
            return new chunk(text);
        }
    }
}

export function inlineMention(id: string) {
    const mod_title: [[string, string[][]]] = [["‣", [["u", id]]]];
    return new chunk(mod_title);
}

export function inlinePage(id: string) {
    const mod_title: [[string, string[][]]] = [["‣", [["p", id]]]];
    return new chunk(mod_title);
}

export function inlineEquation(equation: string) {
    const mod_title: [[string, string[][]]] = [["⁍", [["e", equation]]]];
    return new chunk(mod_title);
}

class Colors {
    text: [[string, string[][]]];

    constructor(text: [[string, string[][]]]) {
        this.text = text;
    }

    get default() {
        this.text[this.text.length - 1][1].push(["h", "default"]);
        return new chunk(this.text);
    }

    get gray() {
        this.text[this.text.length - 1][1].push(["h", "gray"]);
        return new chunk(this.text);
    }

    get brown() {
        this.text[this.text.length - 1][1].push(["h", "brown"]);
        return new chunk(this.text);
    }

    get orange() {
        this.text[this.text.length - 1][1].push(["h", "orange"]);
        return new chunk(this.text);
    }

    get yellow() {
        this.text[this.text.length - 1][1].push(["h", "yellow"]);
        return new chunk(this.text);
    }

    get teal() {
        this.text[this.text.length - 1][1].push(["h", "teal"]);
        return new chunk(this.text);
    }

    get blue() {
        this.text[this.text.length - 1][1].push(["h", "blue"]);
        return new chunk(this.text);
    }

    get purple() {
        this.text[this.text.length - 1][1].push(["h", "purple"]);
        return new chunk(this.text);
    }

    get pink() {
        this.text[this.text.length - 1][1].push(["h", "pink"]);
        return new chunk(this.text);
    }

    get red() {
        this.text[this.text.length - 1][1].push(["h", "red"]);
        return new chunk(this.text);
    }

    get defaultbg() {
        this.text[this.text.length - 1][1].push(["h", "default_background"]);
        return new chunk(this.text);
    }

    get graybg() {
        this.text[this.text.length - 1][1].push(["h", "gray_background"]);
        return new chunk(this.text);
    }

    get brownbg() {
        this.text[this.text.length - 1][1].push(["h", "brown_background"]);
        return new chunk(this.text);
    }

    get orangebg() {
        this.text[this.text.length - 1][1].push(["h", "orange_background"]);
        return new chunk(this.text);
    }

    get yellowbg() {
        this.text[this.text.length - 1][1].push(["h", "yellow_background"]);
        return new chunk(this.text);
    }

    get tealbg() {
        this.text[this.text.length - 1][1].push(["h", "teal_background"]);
        return new chunk(this.text);
    }

    get bluebg() {
        this.text[this.text.length - 1][1].push(["h", "blue_background"]);
        return new chunk(this.text);
    }

    get purplebg() {
        this.text[this.text.length - 1][1].push(["h", "purple_background"]);
        return new chunk(this.text);
    }

    get pinkbg() {
        this.text[this.text.length - 1][1].push(["h", "pink_background"]);
        return new chunk(this.text);
    }

    get redbg() {
        this.text[this.text.length - 1][1].push(["h", "red_background"]);
        return new chunk(this.text);
    }
}

class chunk extends Colors {
    constructor(text: [[string, string[][]]]) {
        super(text)
    }

    add(title: string) {
        this.text.push([title, [[""]]]);
        return new chunk(this.text);
    }

    get strikeThrough() {
        this.text[this.text.length - 1][1].push(["s"]);
        return new chunk(this.text);
    }

    get code() {
        this.text[this.text.length - 1][1].push(["c"]);
        return new chunk(this.text);
    }

    get bold() {
        this.text[this.text.length - 1][1].push(["b"]);
        return new chunk(this.text);
    }

    get italic() {
        this.text[this.text.length - 1][1].push(["i"]);
        return new chunk(this.text);
    }

    get underline() {
        this.text[this.text.length - 1][1].push(["_"]);
        return new chunk(this.text);
    }

    highlight(color: TFormatBlockColor) {
        this.text[this.text.length - 1][1].push(["h", color]);
        return new chunk(this.text);
    }

    linkTo(url: string) {
        this.text[this.text.length - 1][1].push(["a", url]);
        return new chunk(this.text);
    }
}

export function inlineText(title: string) {
    const mod_title: [[string, string[][]]] = [[title, [[""]]]];
    return new chunk(mod_title);
}

// file: utils/shortid.ts

export function shortid(length: number = 5) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++)
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    return result;
}

// file: types/aggregator.ts

export type StringViewAggregationsAggregator = "none" | "count" | "count_values" | "unique" | "empty" | "not_empty" | "percent_empty" | "percent_not_empty";

export interface ViewAggregations {
    property: string,
    aggregator: TViewAggregationsAggregators
}

export type TitleViewAggregationsAggregator = StringViewAggregationsAggregator;
export type TextViewAggregationsAggregator = StringViewAggregationsAggregator;
export type NumericViewAggregationsAggregator = StringViewAggregationsAggregator | "sum" | "average" | "median" | "min" | "max" | "range";
export type EnumViewAggregationsAggregator = StringViewAggregationsAggregator;
export type EnumsViewAggregationsAggregator = StringViewAggregationsAggregator;
export type DateViewAggregationsAggregator = StringViewAggregationsAggregator | "earliest_date" | "latest_date" | "date_range";
export type PersonViewAggregationsAggregator = StringViewAggregationsAggregator;
export type FileViewAggregationsAggregator = StringViewAggregationsAggregator;
export type CheckboxViewAggregationsAggregator = "none" | "count_all" | "checked" | "unchecked" | "percent_checked" | "percent_unchecked";;
export type UrlViewAggregationsAggregator = StringViewAggregationsAggregator;
export type EmailViewAggregationsAggregator = StringViewAggregationsAggregator;
export type PhoneViewAggregationsAggregator = StringViewAggregationsAggregator;

export type TViewBasicAggregationsAggregators =
    TitleViewAggregationsAggregator |
    TextViewAggregationsAggregator |
    NumericViewAggregationsAggregator |
    EnumViewAggregationsAggregator |
    EnumsViewAggregationsAggregator |
    DateViewAggregationsAggregator |
    PersonViewAggregationsAggregator |
    FileViewAggregationsAggregator |
    CheckboxViewAggregationsAggregator |
    UrlViewAggregationsAggregator |
    EmailViewAggregationsAggregator |
    PhoneViewAggregationsAggregator;

export type FormulaViewAggregationsAggregator = NumericViewAggregationsAggregator | StringViewAggregationsAggregator | CheckboxViewAggregationsAggregator | DateViewAggregationsAggregator;
export type RelationViewAggregationsAggregator = StringViewAggregationsAggregator;
export type RollupViewAggregationsAggregator = NumericViewAggregationsAggregator;
export type CreatedTimeViewAggregationsAggregator = DateViewAggregationsAggregator;
export type CreatedByViewAggregationsAggregator = StringViewAggregationsAggregator;
export type LastEditedTimeViewAggregationsAggregator = DateViewAggregationsAggregator;
export type LastEditedByViewAggregationsAggregator = StringViewAggregationsAggregator;

export type TViewAdvancedAggregationsAggregators =
    FormulaViewAggregationsAggregator |
    RelationViewAggregationsAggregator |
    RollupViewAggregationsAggregator |
    CreatedTimeViewAggregationsAggregator |
    CreatedByViewAggregationsAggregator |
    LastEditedTimeViewAggregationsAggregator |
    LastEditedByViewAggregationsAggregator;

export type TViewAggregationsAggregators = TViewBasicAggregationsAggregators | TViewAdvancedAggregationsAggregators;


// file: types/permissions.ts

export type TPermissionType = 'user_permission' | 'space_permission' | 'public_permission';

export type TPublicPermissionRole = 'read_and_write' | 'comment_only' | 'reader' | 'none'
export type TUserPermissionRole = 'editor' | TPublicPermissionRole;
export type TSpacePermissionRole = 'editor' | TPublicPermissionRole;

export type TPermissionRole =
    TPublicPermissionRole |
    TUserPermissionRole |
    TSpacePermissionRole;

export type IPermission = IUserPermission | IPublicPermission | ISpacePermission;

export interface IUserPermission {
    role: TUserPermissionRole,
    type: 'user_permission',
    user_id: string,
}

export interface IPublicPermissionOptions {
    allow_search_engine_indexing: boolean
    allow_duplicate: boolean
}
export interface IPublicPermission extends IPublicPermissionOptions {
    type: 'public_permission',
    role: TPublicPermissionRole,
}

export interface ISpacePermission {
    role: TSpacePermissionRole,
    type: 'space_permission',
    user_id: string,
}

// file: types/date.ts

export type TDateType = "date" | "datetimerange" | "datetime" | "daterange";
export type TDateFormat = "YYYY/MM/DD" | "ll" | "MM/DD/YYYY" | "DD/MM/YYYY" | "relative";
export type TTimeFormat = "H:mm" | "LT";
export type TDateReminderUnit = "day" | "hour" | "minute";

export interface IDateReminder {
    time?: string,
    unit: TDateReminderUnit,
    value: number
}

export interface Date {
    date_format: TDateFormat,
    type: TDateType,
    start_date: string,
    time_format: TTimeFormat,
    reminder: IDateReminder
}

export interface IDate extends Date {
    type: "date",
}

export interface IDateTime extends Date {
    type: "datetime",
    start_time: string,
    time_zone: string,
}

export interface IDateTimeRange extends Date {
    type: "datetimerange",
    end_date: string,
    start_time: string,
    end_time: string,
    time_zone: string,
}

export interface IDateRange extends Date {
    type: "daterange",
    end_date: string
}

// file: types/api.ts

export interface SetPageNotificationsAsReadParams {
    navigableBlockId: string,
    spaceId: string,
    timestamp: number
}

export interface SetSpaceNotificationsAsReadParams {
    spaceId: string,
    timestamp: number
}

export interface GetPageVisitsParams {
    blockId: string,
    limit: number
}


export interface GetPageVisitsResult {
    recordMap: {
        page_visits: BlockData
    }
}

export interface GetUserSharedPagesResult {
    includeDeleted: boolean
}

export interface GetUserSharedPagesParams {
    pages: { id: string, spaceId: string }[],
    recordMap: {
        block: BlockData,
        space: SpaceData
    }
}

export interface GetPublicPageDataParams {
    // Id of the block
    blockId: string,
    name: "page",
    saveParent: boolean
    showMoveTo: boolean
    type: "block-space"
}

export interface GetPublicPageDataResult {
    betaEnabled: boolean
    canJoinSpace: boolean
    canRequestAccess: boolean
    hasPublicAccess: boolean
    icon: string
    ownerUserId: string
    spaceId: string
    spaceName: string
    userHasExplicitAccess: boolean
}

export interface GetPublicSpaceDataParams {
    type: 'space-ids',
    spaceIds: string[]
}

export interface GetPublicSpaceDataResult {
    results: SpaceDataResult[]
}

export interface SpaceDataResult {
    createdTime: number
    disableExport: boolean
    disableGuests: boolean
    disableMoveToSpace: boolean
    disablePublicAccess: boolean
    icon: string
    id: string
    inviteLinkEnabled: boolean
    memberCount: number
    name: string
    planType: TPlanType
    shardId: number
}

export interface GetSubscriptionDataParams {
    spaceId: string
}

export interface GetSubscriptionDataResult {
    accountBalance: number,
    availableCredit: number
    blockUsage: number
    bots: string[]
    creditEnabled: boolean,
    hasPaidNonzero: boolean
    isDelinquent: boolean
    isSubscribed: boolean
    joinedMemberIds: string[]
    credits: ICredit[]
    members: IMember[]
    spaceUsers: string[]
    totalCredit: number
    type: "unsubscribed_admin"
}

export interface RemoveUsersFromSpaceParams {
    removePagePermissions: boolean
    revokeUserTokens: boolean
    spaceId: string
    userIds: string[]
}

export interface RemoveUsersFromSpaceResult {
    recordMap: {
        block: BlockData,
        space: SpaceData
    }
}

export interface InitializePageTemplateParams {
    recordMap: {}
    sourceBlockId: string,
    spaceId: string,
    targetBlockId: string
}

export interface InitializePageTemplateResult {
    recordMap: {
        block: BlockData
    }
}

export interface LoadBlockSubtreeParams {
    blockId: string,
    shallow: boolean
}

export interface LoadBlockSubtreeResult {
    subtreeRecordMap: {
        block: BlockData
    }
}

export interface GetSpacesResult {
    [k: string]: RecordMap
}

export interface GetGenericEmbedBlockDataParams {
    pageWidth: number,
    source: string,
    type: TGenericEmbedBlockType
}

export interface GetGenericEmbedBlockDataResult {
    format: MediaFormat,
    properties: {
        source: string[][]
    },
    type: TGenericEmbedBlockType
}

export interface GetUploadFileUrlParams {
    bucket: "secure",
    contentType: string,
    name: string
}

export interface GetUploadFileUrlResult {
    signedGetUrl: string,
    signedPutUrl: string,
    url: string
}

export interface SetBookmarkMetadataParams {
    blockId: string,
    url: string
}

export interface QueryCollectionParams {
    collectionId: string,
    collectionViewId: string,
    query: {
        filter?: IViewFilter,
        sort?: ViewSorts[],
        aggregations?: ViewAggregations[]
    },
    loader: {
        limit?: number,
        searchQuery?: string,
        type: 'table',
        loadContentCover: boolean
    }
}

export interface GetGoogleDriveAccountsResult {
    accounts: Account[]
}

export interface InitializeGoogleDriveBlockParams {
    blockId: string,
    fileId: string,
    token: Token
}

export interface InitializeGoogleDriveBlockResult {
    file: GoogleDriveFile,
    recordMap: {
        block: BlockData
    }
}

export interface SyncRecordValuesParams {
    id: string,
    table: TOperationTable,
    version: number
}

export interface InviteGuestsToSpaceParams {
    blockId: string,
    permissionItems: IPermission[],
    spaceId: string
}
export interface FindUserResult {
    value: {
        role: "reader",
        value: INotionUser
    }
}

export interface CreateSpaceParams {
    icon: string,
    initialUseCases: string[],
    name: string,
    planType: "personal"
}

export interface CreateSpaceResult {
    recordMap: {
        space: SpaceData
    },
    spaceId: string
}

export interface QueryCollectionResult {
    result: {
        aggregationResults: {
            type: "number",
            value: number
        }[],
        blockIds: string[],
        total: number,
        type: "table"
    }
    recordMap: Pick<RecordMap, "collection" | "space" | "collection_view" | "block">
}

export interface LoadUserContentResult {
    recordMap: RecordMap
}

export interface GetUserSharePagesResult {
    pages: { id: string, spaceId: string }[],
    recordMap: {
        block: BlockData,
        space: SpaceData,
    }
}

export interface EnqueueTaskResult {
    taskId: string
}

export interface SyncRecordValuesResult {
    recordMap: RecordMap
}

export interface EnqueueTaskParams {
    eventName: TTaskType
}

export interface DuplicateBlockTaskParams extends EnqueueTaskParams {
    eventName: "duplicateBlock",
    request: {
        sourceBlockId: string,
        targetBlockId: string,
        addCopyName: boolean
    }
}

export interface ExportBlockTaskParams extends EnqueueTaskParams {
    eventName: "exportBlock",
    request: {
        blockId: string,
        exportOptions: {
            exportType: TExportType,
            locale: "en",
            timeZone: string
        },
        recursive: boolean
    }
}

export interface DeleteSpaceTaskParams extends EnqueueTaskParams {
    eventName: "deleteSpace",
    request: {
        spaceId: string
    }
}

export type TEnqueueTaskParams = DuplicateBlockTaskParams | ExportBlockTaskParams | DeleteSpaceTaskParams;

export interface LoadPageChunkParams {
    chunkNumber: number,
    cursor: Cursor,
    limit: number,
    pageId: string,
    verticalColumns: boolean
}

export interface LoadPageChunkResult {
    cursor: Cursor,
    recordMap: RecordMap
}

export interface GetBackLinksForBlockResult {
    recordMap: {
        block: BlockData,
    }
}

export interface GetUserTasksResult {
    taskIds: string[]
}

export interface CollectionViewData {
    [key: string]: {
        role: TPermissionRole,
        value: ICollectionView
    }
};

export interface CollectionViewPageData {
    [key: string]: {
        role: TPermissionRole,
        value: ICollectionViewPage
    }
};

export interface BlockData {
    [key: string]: {
        role: TPermissionRole,
        value: TBlock
    }
}

export interface SpaceData {
    [key: string]: {
        role: TPermissionRole,
        value: ISpace
    }
}

export interface SpaceViewData {
    [key: string]: {
        role: TPermissionRole,
        value: ISpaceView
    }
}

export interface CollectionData {
    [key: string]: {
        role: TPermissionRole,
        value: ICollection
    }
}

export interface ViewData {
    [key: string]: {
        role: TPermissionRole,
        value: ITableView | IListView | IBoardView | ICalendarView | IGalleryView
    }
}

export interface NotionUserData {
    [key: string]: {
        role: TPermissionRole,
        value: INotionUser
    }
}

export interface UserRootData {
    [key: string]: {
        role: TPermissionRole,
        value: IUserRoot
    }
}

export interface UserSettingsData {
    [key: string]: {
        role: TPermissionRole,
        value: IUserSettings
    }
}

export interface ISpace extends CreateProps, LastEditedProps {
    beta_enabled: boolean,
    icon: string,
    id: string,
    invite_link_code: string,
    invite_link_enabled: boolean,
    name: string,
    pages: string[],
    permissions: ISpacePermission[],
    plan_type: TPlanType,
    shard_id: number,
    version: number,
    disable_public_access: boolean,
    disable_guests: boolean,
    disable_move_to_space: boolean,
    disable_export: boolean,
    domain: string,
}

export interface ISpaceView extends Node {
    created_getting_started: true,
    created_onboarding_templates: true,
    joined: boolean,
    notify_desktop: true,
    notify_email: true,
    notify_mobile: true,
    sidebar_hidden_templates: string[],
    space_id: string,
    visited_templates: string[],
    bookmarked_pages: string[],
}

export interface INotionUser {
    email: string,
    family_name: string,
    given_name: string,
    id: string,
    onboarding_completed: boolean,
    profile_photo: string,
    version: number
}

export interface IUserRoot {
    id: string,
    space_views: string[],
    version: number,
    left_spaces: string[]
}

export interface IUserSettings {
    id: string,
    version: number,
    settings: IUserSettingsSettings,
    time_zone: string,
    locale: TLocale
    preferred_locale: TLocale,
    preferred_locale_origin: string,
    start_day_of_week: number
}

export interface IUserSettingsSettings {
    locale: TLocale,
    persona: 'personal',
    preferred_locale: TLocale,
    preferred_locale_origin: "autodetect",
    signup_time: number,
    start_day_of_week: number,
    time_zone: string,
    type: "personal",
    used_desktop_web_app: boolean
}

export interface RecordMap {
    block: BlockData,
    collection: CollectionData,
    collection_view: ViewData,
    space: SpaceData,
    notion_user: NotionUserData,
    space_view: SpaceViewData,
    user_root: UserRootData,
    user_settings: UserSettingsData,
}

// file: types/block.ts

export interface PageProps {
    title: string[][],
    [k: string]: string[][]
}

export interface PageFormat {
    page_icon: string,
    page_font: string,
    page_full_width: boolean,
    page_small_text: boolean,
    block_locked_by: string,
    block_locked: boolean,
    page_cover: string,
    page_cover_position: number,
    block_color?: TFormatBlockColor,
    page_section_visibility: {
        backlinks: "section_show" | "section_hide" | "section_collapsed",
        comments: "section_hide" | "section_show"
    }
}

export interface MediaProps {
    source: string[][],
    caption?: string[][]
}

export interface MediaFormat {
    block_aspect_ratio?: number,
    block_full_width?: boolean,
    block_page_width?: boolean,
    block_preserve_scale?: boolean,
    block_width?: number,
    block_height?: number,
    display_source: string
}

export interface WebBookmarkFormat {
    bookmark_cover: string,
    bookmark_icon: string,
    block_color?: TFormatBlockColor
}

export interface WebBookmarkProps {
    link: string[][],
    description: string[][],
    title: string[][],
    caption?: string[][]
}

export interface CodeFormat {
    code_wrap: boolean
}

export interface CodeProps {
    title: string[][],
    language: TCodeLanguage
}

export interface FileProps {
    title: string[][],
    source: string[][],
    caption?: string[][]
}

export interface FileFormat {
    block_color?: TFormatBlockColor
}

export interface TodoProps {
    title: string[][],
    checked: ("Yes" | "No")[][]
}

export interface ICollectionBlockInput {
    views: [TSearchManipViewParam, ...TSearchManipViewParam[]],
    schema: TSchemaUnit[],
    properties: PageProps,
    format?: Partial<PageFormat>,
    rows?: Omit<IPageInput, "type">[]
}

export interface ICollectionViewInput extends ICollectionBlockInput {
    type: "collection_view",
}

export interface ICollectionViewPageInput extends ICollectionBlockInput {
    type: "collection_view_page",
    isPrivate?: boolean
}

export interface ILinkedDBInput {
    type: "linked_db",
    collection_id: string,
    properties?: {},
    format?: {},
    views: TSearchManipViewParam[],
}

export type TCollectionBlockInput = ICollectionViewInput | ICollectionViewPageInput | ILinkedDBInput;

// -----------------

// Media IBlock Input
export interface IMediaInput {
    properties: MediaProps,
    format?: MediaFormat,
    file_ids: string[]
}

export interface IVideoInput extends IMediaInput {
    type: 'video',
}

export interface IImageInput extends IMediaInput {
    type: 'image',
}

export interface IAudioInput extends IMediaInput {
    type: 'audio',
}

export interface IWebBookmarkInput {
    type: 'bookmark',
    properties: WebBookmarkProps,
    format?: WebBookmarkFormat
}

// Basic block input
export interface ICodeInput {
    type: 'code',
    properties: CodeProps,
    format?: CodeFormat
}

export interface IFileInput {
    type: 'file',
    properties: FileProps,
    format?: FileFormat
}

export type TMediaBlockInput = IVideoInput | IImageInput | IAudioInput | IWebBookmarkInput | ICodeInput | IFileInput;

// Basic IBlock Input

export interface IPageInput {
    type: 'page',
    properties: PageProps,
    format?: Partial<PageFormat>,
    isPrivate?: boolean,
    contents?: TBlockInput[]
}

export interface ICommonTextInput {
    properties: {
        title: string[][]
    },
    format?: {
        block_color?: TFormatBlockColor
    }
}

export interface ILinkToPageInput {
    type: "link_to_page",
    page_id: string,
    format?: {},
    properties?: {}
}

export interface ITextInput extends ICommonTextInput {
    type: 'text'
}

export interface IHeaderInput extends ICommonTextInput {
    type: 'header'
}

export interface ISubHeaderInput extends ICommonTextInput {
    type: 'sub_header'
}

export interface ISubSubHeaderInput extends ICommonTextInput {
    type: 'sub_sub_header'
}

export interface INumberedListInput extends ICommonTextInput {
    type: 'numbered_list'
}

export interface IBulletedListInput extends ICommonTextInput {
    type: 'bulleted_list'
}

export interface IToggleInput extends ICommonTextInput {
    type: 'toggle'
}

export interface IQuoteInput extends ICommonTextInput {
    type: 'quote'
}

export interface IDividerInput {
    type: 'divider',
    properties?: {},
    format?: {}
}

export interface ICalloutInput extends ICommonTextInput {
    type: 'callout',
    format?: {
        page_icon: string,
        block_color?: TFormatBlockColor
    }
}

export interface ITodoInput {
    type: 'to_do',
    properties: TodoProps,
    format?: {
        block_color?: TFormatBlockColor
    }
}
// ? TD:2:M Add td for TCollectionBlockInput

export type TBasicBlockInput = ILinkToPageInput | IPageInput | ITodoInput | ICalloutInput | IDividerInput | IQuoteInput | IToggleInput | IBulletedListInput | INumberedListInput | ISubSubHeaderInput | ISubHeaderInput | IHeaderInput | ITextInput;
// Advanced block input
export interface ITOCInput {
    type: 'table_of_contents',
    format?: {
        block_color?: TFormatBlockColor
    },
    properties?: {}
}

export interface IEquationInput {
    type: 'equation',
    properties: {
        title: string[][]
    },
    format?: {
        block_color?: TFormatBlockColor
    }
}

export interface IFactoryInput {
    type: 'factory',
    properties: {
        title: string[][]
    },
    format?: {
        block_color?: TFormatBlockColor
    },
    contents: TBlockInput[]
}

export interface IBreadcrumbInput {
    type: 'breadcrumb',
    properties?: {},
    format?: {},
}

export type TAdvancedBlockInput = IBreadcrumbInput | IFactoryInput | IEquationInput | ITOCInput;

// Embed block input
export interface IEmbedInput {
    type: "embed",
    properties: MediaProps,
    format?: MediaFormat,
}

export interface IDriveInput {
    type: 'drive',
    properties?: {},
    format?: {
        drive_properties: {
            file_id: string,
            icon: string,
            modified_time: number,
            title: string,
            trashed: boolean,
            url: string,
            user_name: string,
        },
        drive_status: {
            authed: boolean,
            last_fetched: number
        }
    },
    file_id: string
}

export interface ITweetInput {
    type: 'tweet',
    properties: {
        source: string[][]
    },
    format?: {},
}

export interface ICodepenInput {
    type: 'codepen',
    properties: {
        source: string[][]
    },
    format?: MediaFormat,
}

export interface IMapsInput {
    type: 'maps',
    properties: {
        source: string[][]
    },
    format?: MediaFormat,
}

export interface IGistInput {
    type: 'gist',
    properties: {
        source: string[][]
    },
    format?: {
        block_color?: TFormatBlockColor,
        display_source: null
    },
}

export interface IFigmaInput {
    type: 'figma',
    properties: {
        source: string[][]
    },
    format?: MediaFormat,
}

export type TEmbedBlockInput = IEmbedInput | IFigmaInput | IMapsInput | ICodepenInput | IDriveInput | IGistInput | ITweetInput;

export type TBlockInput = TMediaBlockInput | TBasicBlockInput | TAdvancedBlockInput | TEmbedBlockInput | TCollectionBlockInput;
// -----------------

// Media IBlock Types
export interface IVideo extends IBlock, IVideoInput { };
export interface IAudio extends IBlock, IAudioInput { };
export interface IImage extends IBlock, IImageInput { };
export interface IWebBookmark extends IBlock, IWebBookmarkInput { };
export interface ICode extends IBlock, ICodeInput { };
export interface IFile extends IBlock, IFileInput { };

export type TMediaBlock = IVideo | IAudio | IImage | IWebBookmark | ICode | IFile;

// Basic IBlock Types
export interface IPage extends IBlock {
    properties: PageProps,
    type: 'page',
    content: string[],
    format?: PageFormat,
    is_template?: boolean,
    file_ids?: string[],
    permissions: IPermission[]
}

export interface ICollectionBlock extends IBlock {
    view_ids: string[],
    collection_id: string,
    type: 'collection_view' | 'collection_view_page',
    properties?: {},
    format?: {},
}

export interface ICollectionView extends ICollectionBlock {
    type: 'collection_view',
}

export interface ICollectionViewPage extends ICollectionBlock {
    type: 'collection_view_page',
    permissions: IPermission[]
}

export type TCollectionBlock = ICollectionView | ICollectionViewPage;

export interface IText extends ITextInput, IBlock { }
export interface ITodo extends ITodoInput, IBlock { }
export interface IHeader extends IHeaderInput, IBlock { }
export interface ISubHeader extends ISubHeaderInput, IBlock { }
export interface ISubSubHeader extends ISubSubHeaderInput, IBlock { }
export interface IBulletedList extends IBulletedListInput, IBlock { }
export interface INumberedList extends INumberedListInput, IBlock { }
export interface IToggle extends IToggleInput, IBlock { }
export interface IQuote extends IQuoteInput, IBlock { }
export interface IDivider extends IDividerInput, IBlock { }
export interface ICallout extends ICalloutInput, IBlock { }

export type TBasicBlock = IText | ITodo | IHeader | ISubHeader | ISubSubHeader | IBulletedList | INumberedList | IToggle | IQuote | IDivider | ICallout | IPage | TCollectionBlock;

// Advanced block types
export interface ITOC extends ITOCInput, IBlock { };
export interface IEquation extends IEquationInput, IBlock { };
export interface IBreadcrumb extends IBreadcrumbInput, IBlock { };
export interface IFactory extends IBlock {
    type: 'factory',
    properties: {
        title: string[][]
    },
    format?: {
        block_color?: TFormatBlockColor
    },
    contents: string[]
}

export type TAdvancedBlock = ITOC | IEquation | IBreadcrumb | IFactory;

// Embeds Type
export interface IGist extends IBlock, IGistInput { }
export interface IDrive extends IBlock, IDriveInput {

}

export interface ITweet extends IBlock, ITweetInput { }
export interface IEmbed extends IBlock, IEmbedInput { }
export interface ICodepen extends IBlock, ICodepenInput { }
export interface IMaps extends IBlock, IMapsInput { }
export interface IFigma extends IBlock, IFigmaInput { }

export type TEmbedBlock = IEmbed | ITweet | ICodepen | IMaps | IFigma | IDrive | IGist;

export type TBlock = TBasicBlock | TMediaBlock | TAdvancedBlock | TEmbedBlock;

export type TParentType = IPage | ISpace | ICollectionViewPage;

export interface ICollection extends Node, ParentProps {
    description: string[][],
    icon?: string,
    migrated: boolean,
    name: string[][],
    schema: Schema,
    template_pages?: string[]
}

export interface IMember {
    userId: string,
    role: TPermissionRole,
    guestPageIds: string[]
}

export interface ICredit {
    activated: boolean
    amount: number
    created_timestamp: string
    id: string
    type: TCreditType
    user_id: string
    version: number
}

export const error = (msg: string) => {
    console.log(msg);
    return msg;
};
export const warn = (msg: string) => {
    console.log(msg);
    return msg;
};

// file: types/types.ts

export type TGenericEmbedBlockType = "figma" | "tweet" | "codepen" | "gist" | "maps";
export type Entity = BlockData | SpaceData | CollectionData;
export type Args = any /* string | { value: ValueArg } | { schema: Schema } | string[][] | number */;
export type TOperationCommand = 'set' | 'update' | 'keyedObjectListAfter' | 'keyedObjectListUpdate' | 'listAfter' | 'listRemove' | 'listBefore' | 'setPermissionItem'
export type TOperationTable = 'space' | 'collection_view' | 'collection' | 'collection_view_page' | 'page' | 'block' | 'space_view' | 'notion_user' | 'user_settings' | 'user_root';
export type TViewType = 'table' | 'list' | 'board' | 'gallery' | 'calendar' | 'timeline';
export type TViewFormatCover = { type: 'page_content' | 'page_cover' } | { type: 'property', property: string };
export type TMediaBlockType = 'code' | 'image' | 'video' | 'bookmark' | 'audio' | 'file';
export type TBasicBlockType = 'text' | 'header' | 'sub_header' | 'sub_sub_header' | 'to_do' | 'bulleted_list' | 'numbered_list' | 'toggle' | 'quote' | 'divider' | 'callout';
export type TAdvancedBlockType = 'table_of_contents' | 'equation' | 'factory' | 'breadcrumb';
export type TEmbedsBlockType = 'embed' | 'drive' | TGenericEmbedBlockType;
export type TBlockType = TEmbedsBlockType | TMediaBlockType | TBasicBlockType | TAdvancedBlockType | 'page' | 'collection_view_page' | 'collection_view' | 'link_to_page';
export type TTextColor = 'default' | 'gray' | 'brown' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | "pink" | 'red';
export type TBGColor = 'default_background' | 'gray_background' | 'brown_background' | 'orange_background' | 'yellow_background' | 'teal_background' | 'blue_background' | 'purple_background' | "pink_background" | 'red_background';
export type TFormatBlockColor = TTextColor | TBGColor;
export type TExportType = "markdown" | "pdf" | "html";
export type TTaskType = "deleteSpace" | "exportBlock" | "duplicateBlock";
export type TLocale = 'en-US' | 'ko-KR';
export type TPage = IPage | ICollectionViewPage;
export type TCodeLanguage = "ABAP" | "Arduino" | "Bash" | "BASIC" | "C" | "Clojure" | "CoffeeScript" | "C++" | "C#" | "CSS" | "Dart" | "Diff" | "Docker" | "Elixir" | "Elm" | "Erlang" | "Flow" | "Fortran" | "F#" | "Gherkin" | "GLSL" | "Go" | "GraphQL" | "Groovy" | "Haskell" | "HTML" | "Java" | "JavaScript" | "JSON" | "Kotlin" | "LaTeX" | "Less" | "Lisp" | "LiveScript" | "Lua" | "Makefile" | "Markdown" | "Markup" | "MATLAB" | "Nix" | "Objective-C" | "OCaml" | "Pascal" | "Perl" | "PHP" | "Plain Text" | "PowerShell" | "Prolog" | "Python" | "R" | "Reason" | "Ruby" | "Rust" | "Sass" | "Scala" | "Scheme" | "Scss" | "Shell" | "SQL" | "Swift" | "TypeScript" | "VB.Net" | "Verilog" | "VHDL" | "Visual Basic" | "WebAssembly" | "XML" | "YAML";
export type TDataType = keyof RecordMap;
export type TCreditType = "web_login" | "desktop_login" | "mobile_login";
export type TPlanType = "personal";
export type TCollectionViewBlock = "collection_view" | "collection_view_page";
export type TSortValue = "ascending" | "descending";
export interface GoogleDriveFileUser {
    displayName: string,
    emailAddress: string,
    kind: "drive#user",
    me: boolean,
    permissionId: string,
    photoLink: string
}

export interface GoogleDriveFile {
    iconLink: string,
    id: string,
    lastModifyingUser: GoogleDriveFileUser,
    mimeType: string,
    modifiedTime: string,
    name: string,
    thumbnailVersion: "0",
    trashed: boolean,
    webViewLink: string
}

export interface Token {
    id: string,
    accessToken: string
}

export interface Account {
    accountId: string,
    accountName: string,
    token: Token
}

export interface ValueArg {
    id: string,
    value: string,
    color: string
};

export interface Request {
    requestId: string,
    transactions: Transaction[]
};

export interface Transaction {
    id: string,
    shardId: number,
    spaceId: string,
    operations: IOperation[]
};

export interface IOperation {
    table: TOperationTable,
    id: string,
    command: TOperationCommand,
    path: string[],
    args: Args
};

export interface Node {
    alive: boolean,
    version: number,
    id: string,
}

export interface ParentProps {
    parent_id: string,
    parent_table: 'block' | 'space' | 'user_root',
}

export interface CreateProps {
    created_by_id: string,
    created_by_table: 'notion_user',
    created_time: number,
}

export interface LastEditedProps {
    last_edited_by_id: string,
    last_edited_by_table: 'notion_user',
    last_edited_time: number,
}

export interface IBlock extends Node, ParentProps, CreateProps, LastEditedProps {
    shard_id: number,
    space_id: string,
    collection_id?: string,
    view_ids?: string[],
}

export interface Cursor {
    stack: Stack[][]
}

export interface Stack {
    id: string,
    index: number,
    table: 'block'
}

/* Api endpoint result */

/* Nishan Specific */

export type TData = TBlock | ICollection | TView | ISpace | INotionUser | ISpaceView | IUserRoot | IUserSettings
export interface ICache {
    block: Map<string, TBlock>,
    collection: Map<string, ICollection>,
    collection_view: Map<string, TView>,
    space: Map<string, ISpace>,
    notion_user: Map<string, INotionUser>,
    space_view: Map<string, ISpaceView>,
    user_root: Map<string, IUserRoot>,
    user_settings: Map<string, IUserSettings>,
}

export type Logger = false | ((method: "CREATE" | "READ" | "UPDATE" | "DELETE", subject: "NotionUser" | "View" | "Block" | "Space" | "UserSettings" | "UserRoot" | "SchemaUnit" | "Page" | "CollectionView" | "CollectionViewPage" | "Collection" | "SpaceView", id: string) => void)
export interface NishanArg {
    token: string,
    interval: number,
    user_id: string,
    shard_id: number,
    space_id: string,
    cache: ICache,
    id: string,
    logger: Logger
}

// file: types/filter.ts

/**
 * Filters.filter.operator 
 */
export type EmptyViewFiltersOperator = "is_empty" | "is_not_empty";

export type TextViewFiltersOperator = "string_is" | "string_is_not" | "string_contains" | "string_does_not_contain" | "string_starts_with" | "string_ends_with" | EmptyViewFiltersOperator;
export type TitleViewFiltersOperator = TextViewFiltersOperator;
export type NumericViewFiltersOperator = "number_equals" | "number_does_not_equal" | "number_greater_than" | "number_less_than" | "number_greater_than_or_equal_to" | "number_less_than_or_equal_to" | EmptyViewFiltersOperator;
export type EnumViewFiltersOperator = "enum_is" | "enum_is_not" | EmptyViewFiltersOperator;
export type EnumsViewFiltersOperator = "enum_contains" | "enum_does_not_contain" | EmptyViewFiltersOperator;
export type DateViewFiltersOperator = "date_is" | "date_is_before" | "date_is_after" | "date_is_on_or_before" | "date_is_on_or_after" | "date_is_within" | EmptyViewFiltersOperator;
export type PersonViewFiltersOperator = "person_contains" | "person_does_not_contain" | EmptyViewFiltersOperator;
export type FileViewFiltersOperator = EmptyViewFiltersOperator;
export type CheckboxViewFiltersOperator = "checkbox_is" | "checkbox_is_not";
export type UrlViewFiltersOperator = TextViewFiltersOperator;
export type EmailViewFiltersOperator = TextViewFiltersOperator;
export type PhoneViewFiltersOperator = TextViewFiltersOperator;

export type FormulaViewFiltersOperator = TextViewFiltersOperator;
export type RelationViewFiltersOperator = "relation_contains" | "relation_does_not_contain" | EmptyViewFiltersOperator;
export type RollupViewFiltersOperator = undefined;
export type CreatedTimeViewFiltersOperator = DateViewFiltersOperator;
export type CreatedByViewFiltersOperator = PersonViewFiltersOperator;
export type LastEditedTimeViewFiltersOperator = DateViewFiltersOperator;
export type LastEditedByViewFiltersOperator = PersonViewFiltersOperator;

export type TBasicViewFiltersOperator =
    TextViewFiltersOperator |
    TitleViewFiltersOperator |
    NumericViewFiltersOperator |
    EnumViewFiltersOperator |
    EnumsViewFiltersOperator |
    DateViewFiltersOperator |
    PersonViewFiltersOperator |
    FileViewFiltersOperator |
    CheckboxViewFiltersOperator |
    UrlViewFiltersOperator |
    EmailViewFiltersOperator |
    PhoneViewFiltersOperator;

export type TAdvancedViewFiltersOperator =
    FormulaViewFiltersOperator |
    RelationViewFiltersOperator |
    RollupViewFiltersOperator |
    CreatedTimeViewFiltersOperator |
    CreatedByViewFiltersOperator |
    LastEditedTimeViewFiltersOperator |
    LastEditedByViewFiltersOperator;

export type TViewFiltersOperator = TBasicViewFiltersOperator | TAdvancedViewFiltersOperator;

/**
 * Filters.filter.value.type 
 */
export type TitleViewFiltersType = "exact";
export type TextViewFiltersType = "exact";
export type NumericViewFiltersType = "exact";
export type EnumViewFiltersType = "exact";
export type EnumsViewFiltersType = "exact";
export type DateViewFiltersType = "relative" | "exact";
export type PersonViewFiltersType = "exact";
export type FileViewFiltersType = "exact";
export type CheckboxViewFiltersType = "exact";
export type UrlViewFiltersType = "exact";
export type EmailViewFiltersType = "exact";
export type PhoneViewFiltersType = "exact";

export type TBasicViewFiltersType =
    TitleViewFiltersType |
    TextViewFiltersType |
    NumericViewFiltersType |
    EnumViewFiltersType |
    EnumsViewFiltersType |
    DateViewFiltersType |
    PersonViewFiltersType |
    FileViewFiltersType |
    CheckboxViewFiltersType |
    UrlViewFiltersType |
    EmailViewFiltersType |
    PhoneViewFiltersType;

export type FormulaViewFiltersType = "exact";
export type RelationViewFiltersType = "exact";
export type RollupViewFiltersType = undefined;
export type CreatedTimeViewFiltersType = "exact" | "relative";
export type CreatedByViewFiltersType = "exact";
export type LastEditedTimeViewFiltersType = "exact" | "relative";
export type LastEditedByViewFiltersType = "exact";

export type TAdvancedViewFiltersType =
    FormulaViewFiltersType |
    RelationViewFiltersType |
    RollupViewFiltersType |
    CreatedTimeViewFiltersType |
    CreatedByViewFiltersType |
    LastEditedTimeViewFiltersType |
    LastEditedByViewFiltersType;

export type TViewFiltersType =
    TBasicViewFiltersType | TAdvancedViewFiltersType;

/**
 * Filters.filter.value.value 
 */
export type TitleViewFiltersValue = string;
export type TextViewFiltersValue = string;
export type NumericViewFiltersValue = number;
export type EnumViewFiltersValue = string
export type EnumsViewFiltersValue = string
export type DateViewFiltersValue = "today" | "tomorrow" | "yesterday" | "one_week_ago" | "one_week_from_now" | "one_month_ago" | "one_month_from_now" | {
    start_date: string,
    type: "date"
};
export interface PersonViewFiltersValue {
    id: string,
    table: "notion_user"
}
export interface FileViewFiltersValue { };
export type CheckboxViewFiltersValue = boolean;
export type UrlViewFiltersValue = string;
export type EmailViewFiltersValue = string;
export type PhoneViewFiltersValue = string;

export type FormulaViewFiltersValue = string;
export type RelationViewFiltersValue = string;
export type RollupViewFiltersValue = undefined;
export type CreatedTimeViewFiltersValue = DateViewFiltersValue;
export type CreatedByViewFiltersValue = PersonViewFiltersValue;
export type LastEditedTimeViewFiltersValue = DateViewFiltersValue;
export type LastEditedByViewFiltersValue = PersonViewFiltersValue;

export type TBasicViewFiltersValue =
    TitleViewFiltersValue |
    TextViewFiltersValue |
    NumericViewFiltersValue |
    EnumViewFiltersValue |
    EnumsViewFiltersValue |
    DateViewFiltersValue |
    PersonViewFiltersValue |
    FileViewFiltersValue |
    CheckboxViewFiltersValue |
    UrlViewFiltersValue |
    EmailViewFiltersValue |
    PhoneViewFiltersValue;

export type TAdvancedViewFiltersValue =
    FormulaViewFiltersValue |
    RelationViewFiltersValue |
    RollupViewFiltersValue |
    CreatedTimeViewFiltersValue |
    CreatedByViewFiltersValue |
    LastEditedTimeViewFiltersValue |
    LastEditedByViewFiltersValue;

export type TViewFiltersValue = TBasicViewFiltersValue | TAdvancedViewFiltersValue;

export interface IViewFilter {
    filters: (IViewFilters | IViewFilter)[],
    operator: "and" | "or"
}

export interface IViewFilters<O extends TViewFiltersOperator = Exclude<TViewFiltersOperator, "is_empty" | "is_not_empty">, V extends TViewFiltersValue = TViewFiltersValue, T extends TViewFiltersType = "exact"> {
    property: string,
    filter: { operator: EmptyViewFiltersOperator } | {
        operator: O,
        value: {
            type: T,
            value: V
        }
    }
}

export interface TextViewFilters extends IViewFilters<TextViewFiltersOperator, TextViewFiltersValue> { };
export interface NumericViewFilters extends IViewFilters<NumericViewFiltersOperator, NumericViewFiltersValue> { };
export interface EnumViewFilters extends IViewFilters<EnumViewFiltersOperator, EnumViewFiltersValue> { };
export interface EnumsViewFilters extends IViewFilters<EnumsViewFiltersOperator, EnumsViewFiltersValue> { };
export interface DateViewFilters {
    property: string,
    filter: { operator: EmptyViewFiltersOperator } | {
        operator: "relative",
        value: DateViewFiltersValue
    } | {
        operator: "exact",
        value: {
            start_date: string,
            type: "date"
        }
    }
};

export interface PersonViewFilters extends IViewFilters<PersonViewFiltersOperator, PersonViewFiltersValue> { };
export interface FileViewFilters extends IViewFilters<FileViewFiltersOperator, FileViewFiltersValue> { };
export interface FileViewFilters extends IViewFilters<FileViewFiltersOperator, FileViewFiltersValue> { };
export interface CheckboxViewFilters extends IViewFilters<CheckboxViewFiltersOperator, CheckboxViewFiltersValue> { };
export interface UrlViewFilters extends IViewFilters<UrlViewFiltersOperator, UrlViewFiltersValue> { };
export interface EmailViewFilters extends IViewFilters<EmailViewFiltersOperator, EmailViewFiltersValue> { };
export interface PhoneViewFilters extends IViewFilters<PhoneViewFiltersOperator, PhoneViewFiltersValue> { };

export interface CreatedTimeViewFilters extends DateViewFilters { };
export interface CreatedByViewFilters extends IViewFilters<PersonViewFiltersOperator, PersonViewFiltersValue> { };
export interface LastEditedTimeViewFilters extends DateViewFilters { }
export interface EditedByViewFilters extends IViewFilters<PersonViewFiltersOperator, PersonViewFiltersValue> { };

export type TBasicViewFilters =
    TextViewFilters |
    NumericViewFilters |
    EnumViewFilters |
    EnumsViewFilters |
    DateViewFilters |
    PersonViewFilters |
    FileViewFilters |
    CheckboxViewFilters |
    UrlViewFilters |
    EmailViewFilters |
    PhoneViewFilters;

export type TAdvancedViewFilters =
    FormulaViewFiltersValue |
    RelationViewFiltersValue |
    RollupViewFiltersValue |
    CreatedTimeViewFiltersValue |
    CreatedByViewFiltersValue |
    LastEditedTimeViewFiltersValue |
    LastEditedByViewFiltersValue;

export type TViewFilters = TBasicViewFilters | TAdvancedViewFilters;

// file: types/function.ts


export type UserViewFilterParams = [TViewFiltersOperator, TViewFiltersType, TViewFiltersValue] | [TViewFiltersOperator, TViewFiltersType, TViewFiltersValue, number]

// ? TD:1:M All the schema type rather than Record Any

export interface CreateBlockArg {
    parent_table?: "block" | "collection" | "space", $block_id: string, type: TBlockType, properties?: any, format?: any, parent_id?: string
}

export type InlineDateArg = IDate | IDateTime | IDateTimeRange | IDateRange

export type RepositionParams = {
    id: string,
    position: "before" | "after"
} | number | undefined;

export type UpdatableSpaceKeys = "name" | "icon" |
    "disable_public_access" |
    "disable_guests" |
    "disable_move_to_space" |
    "disable_export" |
    "domain" |
    "invite_link_enabled" |
    "beta_enabled";

export type UpdatableSpaceParams = Partial<Pick<ISpace, UpdatableSpaceKeys>>;

export type UpdatableCollectionKeys = "name" | "icon" | "description";
export type UpdatableCollectionUpdateParam = Partial<Pick<ICollection, UpdatableCollectionKeys>>;

export type UpdatableNotionUserKeys = 'family_name' | 'given_name' | 'profile_photo';
export type UpdatableNotionUserParam = Partial<Pick<INotionUser, UpdatableNotionUserKeys>>;

export type UpdatableSpaceViewKeys = 'notify_desktop' | 'notify_email' | 'notify_mobile';
export type UpdatableSpaceViewParam = Partial<Pick<ISpaceView, UpdatableSpaceViewKeys>>;

export type UpdatableUserSettingsKeys = 'start_day_of_week' | 'time_zone' | 'locale' | 'preferred_locale' | 'preferred_locale_origin';
export type UpdatableUserSettingsParam = Partial<Pick<IUserSettingsSettings, UpdatableUserSettingsKeys>>;

export type UpdateCacheManuallyParam = (string | [string, TDataType])[]

export type PageCreateContentParam = TBlockInput & {
    position?: RepositionParams
}

export type Predicate<T> = (T: T, index: number) => Promise<boolean> | boolean | void;
export type FilterTypes<T> = undefined | string[] | Predicate<T>
export type FilterType<T> = undefined | string | Predicate<T>

export interface SearchManipViewParam {
    type: TViewType,
    name: string,
    view: [ViewUpdateParam, ...ViewUpdateParam[]],
    position?: RepositionParams,
    filter_operator?: "or" | "and"
}

export interface TableSearchManipViewParam extends SearchManipViewParam, Partial<Omit<ITableViewFormat, "table_properties">> {
    type: "table",
}

export interface ListSearchManipViewParam extends SearchManipViewParam {
    type: "list"
}

export interface BoardSearchManipViewParam extends SearchManipViewParam, Partial<Omit<IBoardViewFormat, "board_properties">> {
    type: "board",
    group_by: string
}

export interface GallerySearchManipViewParam extends SearchManipViewParam, Partial<Omit<IGalleryViewFormat, "gallery_properties">> {
    type: "gallery",
}

export interface CalendarSearchManipViewParam extends SearchManipViewParam {
    type: "calendar",
    calendar_by: string
}

export interface TimelineSearchManipViewParam extends SearchManipViewParam, Partial<Omit<ITimelineViewFormat, "timeline_properties" | "timeline_table_properties">> {
    type: "timeline",
    timeline_by: TTimelineViewTimelineby
}

export type TSearchManipViewParam = TableSearchManipViewParam | ListSearchManipViewParam | BoardSearchManipViewParam | GallerySearchManipViewParam | CalendarSearchManipViewParam | TimelineSearchManipViewParam

// ? TD:1:H Add generic type for filter as well
interface ViewUpdateGenericParam<T extends TSchemaUnitType, FO extends TViewFiltersOperator, FT extends TViewFiltersType, FV extends TViewFiltersValue, A extends TViewAggregationsAggregators> {
    name: string,
    type: T,
    sort?: TSortValue | [TSortValue, number],
    format?: boolean | number | [boolean, number],
    filter?: ([FO, FT, FV] | [FO, FT, FV, number])[],
    aggregation?: A
}

export interface ITPage {
    collection_view_page: CollectionViewPage[],
    page: Page[]
}

export interface ITSchemaUnit {
    text: SchemaUnit<TextSchemaUnit>[],
    number: SchemaUnit<NumberSchemaUnit>[],
    select: SchemaUnit<SelectSchemaUnit>[],
    multi_select: SchemaUnit<MultiSelectSchemaUnit>[],
    title: SchemaUnit<TitleSchemaUnit>[],
    date: SchemaUnit<DateSchemaUnit>[],
    person: SchemaUnit<PersonSchemaUnit>[],
    file: SchemaUnit<FileSchemaUnit>[],
    checkbox: SchemaUnit<CheckboxSchemaUnit>[],
    url: SchemaUnit<UrlSchemaUnit>[],
    email: SchemaUnit<EmailSchemaUnit>[],
    phone_number: SchemaUnit<PhoneNumberSchemaUnit>[],
    formula: SchemaUnit<FormulaSchemaUnit>[],
    relation: SchemaUnit<RelationSchemaUnit>[],
    rollup: SchemaUnit<RollupSchemaUnit>[],
    created_time: SchemaUnit<CreatedTimeSchemaUnit>[],
    created_by: SchemaUnit<CreatedBySchemaUnit>[],
    last_edited_time: SchemaUnit<LastEditedTimeSchemaUnit>[],
    last_edited_by: SchemaUnit<LastEditedBySchemaUnit>[],
}

export interface ITView {
    table: TableView[],
    gallery: GalleryView[],
    list: ListView[],
    board: BoardView[],
    timeline: TimelineView[],
    calendar: CalendarView[],
}

// ? TD:1:M Add link_to_page block tds
export interface ITBlock {
    link_to_page: Block<any, any>[],
    embed: Block<IEmbed, IEmbedInput>[],
    video: Block<IVideo, IVideoInput>[];
    audio: Block<IAudio, IAudioInput>[];
    image: Block<IImage, IImageInput>[];
    bookmark: Block<IWebBookmark, IWebBookmarkInput>[];
    code: Block<ICode, ICodeInput>[];
    file: Block<IFile, IFileInput>[];
    tweet: Block<ITweet, ITweetInput>[];
    gist: Block<IGist, IGistInput>[];
    codepen: Block<ICodepen, ICodepenInput>[];
    maps: Block<IMaps, IMapsInput>[];
    figma: Block<IFigma, IFigmaInput>[];
    drive: Block<IDrive, IDriveInput>[];
    text: Block<IText, ITextInput>[];
    table_of_contents: Block<ITOC, ITOCInput>[];
    equation: Block<IEquation, IEquationInput>[];
    breadcrumb: Block<IBreadcrumb, IBreadcrumbInput>[];
    factory: {
        block: Block<IFactory, IFactoryInput>,
        contents: ITBlock
    }[];
    page: Page[];
    to_do: Block<ITodo, ITodoInput>[];
    header: Block<IHeader, IHeaderInput>[];
    sub_header: Block<ISubHeader, ISubHeaderInput>[];
    sub_sub_header: Block<ISubHeader, ISubHeaderInput>[];
    bulleted_list: Block<IBulletedList, IBulletedListInput>[];
    numbered_list: Block<INumberedList, INumberedListInput>[];
    toggle: Block<IToggle, IToggleInput>[];
    quote: Block<IQuote, IQuoteInput>[];
    divider: Block<IDivider, IDividerInput>[];
    callout: Block<ICallout, ICalloutInput>[];
    collection_view: ITCollectionBlock[],
    collection_view_page: ITCollectionBlock[],
    linked_db: ITCollectionBlock[],
}

export type ITCollectionBlock = {
    block: CollectionBlock,
    collection: Collection,
    views: ITView
}

export type ViewUpdateParam =
    ViewUpdateGenericParam<"text", TextViewFiltersOperator, TextViewFiltersType, TextViewFiltersValue, TextViewAggregationsAggregator> |
    ViewUpdateGenericParam<"title", TitleViewFiltersOperator, TitleViewFiltersType, TitleViewFiltersValue, TitleViewAggregationsAggregator> |
    ViewUpdateGenericParam<"number", NumericViewFiltersOperator, NumericViewFiltersType, NumericViewFiltersValue, NumericViewAggregationsAggregator> |
    ViewUpdateGenericParam<"select", EnumViewFiltersOperator, EnumViewFiltersType, EnumViewFiltersValue, EnumViewAggregationsAggregator> |
    ViewUpdateGenericParam<"multi_select", EnumsViewFiltersOperator, EnumsViewFiltersType, EnumsViewFiltersValue, EnumsViewAggregationsAggregator> |
    ViewUpdateGenericParam<"date", DateViewFiltersOperator, DateViewFiltersType, DateViewFiltersValue, DateViewAggregationsAggregator> |
    ViewUpdateGenericParam<"person", PersonViewFiltersOperator, PersonViewFiltersType, PersonViewFiltersValue, PersonViewAggregationsAggregator> |
    ViewUpdateGenericParam<"file", FileViewFiltersOperator, FileViewFiltersType, FileViewFiltersValue, FileViewAggregationsAggregator> |
    ViewUpdateGenericParam<"checkbox", CheckboxViewFiltersOperator, CheckboxViewFiltersType, CheckboxViewFiltersValue, CheckboxViewAggregationsAggregator> |
    ViewUpdateGenericParam<"url", UrlViewFiltersOperator, UrlViewFiltersType, UrlViewFiltersValue, UrlViewAggregationsAggregator> |
    ViewUpdateGenericParam<"email", EmailViewFiltersOperator, EmailViewFiltersType, EmailViewFiltersValue, EmailViewAggregationsAggregator> |
    ViewUpdateGenericParam<"phone_number", PhoneViewFiltersOperator, PhoneViewFiltersType, PhoneViewFiltersValue, PhoneViewAggregationsAggregator> |
    ViewUpdateGenericParam<"formula", FormulaViewFiltersOperator, FormulaViewFiltersType, FormulaViewFiltersValue, FormulaViewAggregationsAggregator> |
    ViewUpdateGenericParam<"relation", RelationViewFiltersOperator, RelationViewFiltersType, RelationViewFiltersValue, RelationViewAggregationsAggregator> |
    ViewUpdateGenericParam<"rollup", RollupViewFiltersOperator, RollupViewFiltersType, RollupViewFiltersValue, RollupViewAggregationsAggregator> |
    ViewUpdateGenericParam<"created_time", CreatedTimeViewFiltersOperator, CreatedTimeViewFiltersType, CreatedTimeViewFiltersValue, CreatedTimeViewAggregationsAggregator> |
    ViewUpdateGenericParam<"created_by", CreatedByViewFiltersOperator, CreatedByViewFiltersType, CreatedByViewFiltersValue, CreatedByViewAggregationsAggregator> |
    ViewUpdateGenericParam<"last_edited_time", LastEditedTimeViewFiltersOperator, LastEditedTimeViewFiltersType, LastEditedTimeViewFiltersValue, LastEditedTimeViewAggregationsAggregator> |
    ViewUpdateGenericParam<"last_edited_by", LastEditedByViewFiltersOperator, LastEditedByViewFiltersType, LastEditedByViewFiltersValue, LastEditedByViewAggregationsAggregator>;

// file: types/schema.ts

export type TBasicSchemaUnitType = 'text' | 'number' | 'select' | 'multi_select' | 'title' | 'date' | 'person' | 'file' | 'checkbox' | 'url' | 'email' | 'phone_number';
export type TAdvancedSchemaUnitType = 'formula' | 'relation' | 'rollup' | 'created_time' | 'created_by' | 'last_edited_time' | 'last_edited_by';
export type TSchemaUnitType = TBasicSchemaUnitType | TAdvancedSchemaUnitType;

// ? TD:1:H Multiple ISchemaUnit interfaces for all types of schemaunit
export interface ISchemaUnit {
    name: string,
    type: TSchemaUnitType,
}

export interface SelectOption {
    id: string,
    value: string,
    color: TTextColor
}

/* Basic Schema Units */

export interface TextSchemaUnit extends ISchemaUnit {
    type: "text",
}

export interface NumberSchemaUnit extends ISchemaUnit {
    type: "number"
}

export interface SelectSchemaUnit extends ISchemaUnit {
    type: "select",
    options: SelectOption[]
}

export interface MultiSelectSchemaUnit extends ISchemaUnit {
    type: "multi_select",
    options: SelectOption[]
}

export interface TitleSchemaUnit extends ISchemaUnit {
    type: "title"
}

export interface DateSchemaUnit extends ISchemaUnit {
    type: "date"
}

export interface PersonSchemaUnit extends ISchemaUnit {
    type: "person"
}

export interface FileSchemaUnit extends ISchemaUnit {
    type: "file"
}

export interface CheckboxSchemaUnit extends ISchemaUnit {
    type: "checkbox"
}

export interface UrlSchemaUnit extends ISchemaUnit {
    type: "url"
}

export interface EmailSchemaUnit extends ISchemaUnit {
    type: "email"
}

export interface PhoneNumberSchemaUnit extends ISchemaUnit {
    type: "phone_number"
}

export interface FormulaSchemaUnit extends ISchemaUnit {
    type: "formula"
}
export interface RelationSchemaUnit extends ISchemaUnit {
    type: "relation",
    collection_id: string,
    property: string,
}

export interface RollupSchemaUnit extends ISchemaUnit {
    type: "rollup",
    collection_id: string,
    property: string,
    relation_property: string,
    target_property: string,
    target_property_type: TSchemaUnitType,
}

export interface CreatedTimeSchemaUnit extends ISchemaUnit {
    type: "created_time"
}
export interface CreatedBySchemaUnit extends ISchemaUnit {
    type: "created_by"
}
export interface LastEditedTimeSchemaUnit extends ISchemaUnit {
    type: "last_edited_time"
}

export interface LastEditedBySchemaUnit extends ISchemaUnit {
    type: "last_edited_by"
}

export type TBasicSchemaUnit = TextSchemaUnit | NumberSchemaUnit | SelectSchemaUnit | MultiSelectSchemaUnit | TitleSchemaUnit | DateSchemaUnit | PersonSchemaUnit | FileSchemaUnit | CheckboxSchemaUnit | UrlSchemaUnit | EmailSchemaUnit | PhoneNumberSchemaUnit;

export type TAdvancedSchemaUnit = FormulaSchemaUnit | RelationSchemaUnit | RollupSchemaUnit | CreatedTimeSchemaUnit | CreatedBySchemaUnit | LastEditedTimeSchemaUnit | LastEditedBySchemaUnit;

export type TSchemaUnit = TBasicSchemaUnit | TAdvancedSchemaUnit;

export type MSchemaUnit = {
    text: TextSchemaUnit,
    number: NumberSchemaUnit,
    select: SelectSchemaUnit,
    multi_select: MultiSelectSchemaUnit,
    title: TitleSchemaUnit,
    date: DateSchemaUnit,
    person: PersonSchemaUnit,
    file: FileSchemaUnit,
    checkbox: CheckboxSchemaUnit,
    url: UrlSchemaUnit,
    email: EmailSchemaUnit,
    phone_number: PhoneNumberSchemaUnit,
    formula: FormulaSchemaUnit,
    relation: RelationSchemaUnit,
    rollup: RollupSchemaUnit,
    created_time: CreatedTimeSchemaUnit,
    created_by: CreatedBySchemaUnit,
    last_edited_time: LastEditedTimeSchemaUnit,
    last_edited_by: LastEditedBySchemaUnit,
}

export interface Schema {
    [key: string]: TSchemaUnit
};

// file: types/view.ts

export type TView = ITableView | IListView | IBoardView | IGalleryView | ICalendarView | ITimelineView;

export interface IViewQuery2 {
    aggregations: ViewAggregations[],
    sort: ViewSorts[],
    filter: {
        operator: "and",
        filters: TViewFilters[]
    }
}

export interface ITableViewFormat {
    table_wrap: boolean,
    table_properties: ViewFormatProperties[]
}

export type ITableViewQuery2 = IViewQuery2
export interface ITableView extends Node, ParentProps {
    name: string,
    type: 'table',
    page_sort: string[],
    format: ITableViewFormat,
    query2?: ITableViewQuery2,
}

export interface IListViewFormat {
    list_properties: ViewFormatProperties[]
}

export type IListViewQuery2 = Omit<IViewQuery2, "aggregations">
export interface IListView extends Node, ParentProps {
    name: string,
    type: 'list',
    format: IListViewFormat,
    query2?: IListViewQuery2
}

export interface IBoardViewFormat {
    board_cover: TViewFormatCover,
    board_cover_aspect?: 'contain' | 'cover',
    board_cover_size?: 'small' | 'medium' | 'large',
    board_groups2: { hidden: boolean, property: string, value: { type: "select" | "multi_select", value: string } }[]
    board_properties: ViewFormatProperties[],
}

export type IBoardViewQuery2 = IViewQuery2 & {
    group_by: string
}

export interface IBoardView extends Node, ParentProps {
    type: 'board',
    name: string,
    format: IBoardViewFormat,
    query2?: IBoardViewQuery2,
}

export interface IGalleryViewFormat {
    gallery_cover?: TViewFormatCover,
    gallery_cover_aspect?: 'contain' | 'cover',
    gallery_cover_size?: 'small' | 'medium' | 'large',
    gallery_properties: ViewFormatProperties[]
}

export type IGalleryViewQuery2 = Omit<IViewQuery2, "aggregations">

export interface IGalleryView extends Node, ParentProps {
    type: 'gallery',
    name: string,
    format: IGalleryViewFormat,
    query2?: IGalleryViewQuery2,
}

export interface ICalendarViewFormat {
    calendar_properties: ViewFormatProperties[]
}

export type ICalendarViewQuery2 = Omit<IViewQuery2, "aggregations"> & {
    calendar_by: string
}

export interface ICalendarView extends Node, ParentProps {
    type: 'calendar',
    name: string,
    format: ICalendarViewFormat,
    query2?: ICalendarViewQuery2,
}

export interface ITimelineViewFormatPreference {
    centerTimestamp: number,
    zoomLevel: "month"
}

export interface ITimelineViewFormat {
    timeline_preference: ITimelineViewFormatPreference,
    timeline_properties: ViewFormatProperties[],
    timeline_show_table: boolean,
    timeline_table_properties: ViewFormatProperties[]
}

export type ITimelineViewQuery2 = IViewQuery2 & {
    timeline_by: TTimelineViewTimelineby,
}
export interface ITimelineView extends Node, ParentProps {
    type: 'timeline',
    name: string,
    format: ITimelineViewFormat,
    query2: ITimelineViewQuery2
}

export type TTimelineViewTimelineby = "hours" | "day" | "week" | "bi_week" | "month" | "quarter" | "year";

export interface ViewFormatProperties {
    width?: number,
    visible: boolean,
    property: string
}

export interface ViewSorts {
    property: string,
    direction: "ascending" | "descending"

}

// file: api/Cache.ts

export class Cache {
    cache: ICache;

    constructor(cache?: ICache) {
        this.cache = cache || {
            block: new Map(),
            collection: new Map(),
            space: new Map(),
            collection_view: new Map(),
            notion_user: new Map(),
            space_view: new Map(),
            user_root: new Map(),
            user_settings: new Map(),
        }
    }

    /**
     * Save the passed recordMap to cache
     * @param recordMap RecordMap map to save to cache
     */
    protected saveToCache(recordMap: Partial<RecordMap>) {
        type keys = keyof ICache;
        (Object.keys(this.cache) as keys[]).forEach((key) => {
            if (recordMap[key])
                Object.entries(recordMap[key] || {}).forEach(([record_id, record_value]) => {
                    this.cache[key].set(record_id, record_value.value);
                });
        });
    }
}


// file: api/Queries.ts

/**
 * A class containing all the api endpoints of Notion
 * @noInheritDoc
 */
export class Queries extends Cache {
    protected token: string;
    protected interval: number;
    protected headers: {
        headers: {
            cookie: string,
            ["x-notion-active-user-header"]: string
        }
    };
    protected BASE_NOTION_URL = "https://www.notion.so/api/v3";
    protected logger: Logger;
    protected user_id: string;

    constructor({ logger, token, interval, user_id, cache }: Omit<NishanArg, "shard_id" | "space_id" | "id">) {
        super(cache);
        this.token = token;
        this.interval = interval || 1000;
        this.headers = {
            headers: {
                cookie: `token_v2=${token}`,
                ["x-notion-active-user-header"]: user_id
            } as any
        };
        this.user_id = user_id;
        this.logger = function (method, subject, id) {
            console.log(`${method} ${subject}:${id}`);
        } || logger;
    }

    protected async getPageVisits(arg: GetPageVisitsParams): Promise<GetPageVisitsResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        `${this.BASE_NOTION_URL}/getPageVisits`,
                        arg,
                        this.headers
                    ) as { data: GetPageVisitsResult };
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        });
    }

    protected async getUserSharedPages(arg: GetUserSharedPagesParams): Promise<GetUserSharedPagesResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        `${this.BASE_NOTION_URL}/getUserSharedPages`,
                        arg,
                        this.headers
                    ) as { data: GetUserSharedPagesResult };
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        });
    }

    protected async getUserTasks(): Promise<GetUserTasksResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        `${this.BASE_NOTION_URL}/getUserTasks`,
                        {},
                        this.headers
                    ) as { data: GetUserTasksResult };
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        });
    }

    protected async getPublicPageData(arg: GetPublicPageDataParams): Promise<GetPublicPageDataResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        `${this.BASE_NOTION_URL}/getPublicPageData`,
                        arg,
                        this.headers
                    ) as { data: GetPublicPageDataResult };
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        });
    }

    protected async getPublicSpaceData(arg: GetPublicSpaceDataParams): Promise<GetPublicSpaceDataResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        `${this.BASE_NOTION_URL}/getPublicSpaceData`,
                        arg,
                        this.headers
                    ) as { data: GetPublicSpaceDataResult };
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        });
    }

    protected async getSubscriptionData(arg: GetSubscriptionDataParams): Promise<GetSubscriptionDataResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        `${this.BASE_NOTION_URL}/getSubscriptionData`,
                        arg,
                        this.headers
                    ) as { data: GetSubscriptionDataResult };
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        });
    }

    protected async initializePageTemplate(arg: InitializePageTemplateParams): Promise<InitializePageTemplateResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        `${this.BASE_NOTION_URL}/initializePageTemplate`,
                        arg,
                        this.headers
                    ) as { data: InitializePageTemplateResult };
                    this.saveToCache(data.recordMap);
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        })
    }

    protected async loadBlockSubtree(arg: LoadBlockSubtreeParams): Promise<LoadBlockSubtreeResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        `${this.BASE_NOTION_URL}/loadBlockSubtree`,
                        arg,
                        this.headers
                    ) as { data: LoadBlockSubtreeResult };
                    this.saveToCache(data.subtreeRecordMap);
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        })
    }

    protected async getAllSpaces(): Promise<GetSpacesResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        `${this.BASE_NOTION_URL}/getSpaces`,
                        {},
                        this.headers
                    ) as { data: GetSpacesResult };
                    Object.values(data).forEach(data => this.saveToCache(data));
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        })
    }

    protected async getGenericEmbedBlockData(arg: GetGenericEmbedBlockDataParams): Promise<GetGenericEmbedBlockDataResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        `${this.BASE_NOTION_URL}/getGenericEmbedBlockData`,
                        arg,
                        this.headers
                    ) as { data: GetGenericEmbedBlockDataResult };
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        })
    }

    protected async getUploadFileUrl(arg: GetUploadFileUrlParams): Promise<GetUploadFileUrlResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        `${this.BASE_NOTION_URL}/getUploadFileUrl`,
                        arg,
                        this.headers
                    ) as { data: GetUploadFileUrlResult };
                    resolve(data)
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        })
    }

    protected async getGoogleDriveAccounts(): Promise<GetGoogleDriveAccountsResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        `${this.BASE_NOTION_URL}/getGoogleDriveAccounts`,
                        {},
                        this.headers
                    ) as { data: GetGoogleDriveAccountsResult };
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        })
    }

    protected async initializeGoogleDriveBlock(arg: InitializeGoogleDriveBlockParams): Promise<InitializeGoogleDriveBlockResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        `${this.BASE_NOTION_URL}/initializeGoogleDriveBlock`,
                        arg,
                        this.headers
                    ) as { data: InitializeGoogleDriveBlockResult };
                    this.saveToCache(data.recordMap);
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        })
    }

    protected async getBacklinksForBlock(blockId: string): Promise<GetBackLinksForBlockResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data, data: { recordMap } } = await axios.post(
                        `${this.BASE_NOTION_URL}/getBacklinksForBlock`,
                        { blockId },
                        this.headers
                    ) as { data: GetBackLinksForBlockResult };
                    this.saveToCache(recordMap);
                    resolve(data)
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        })
    }

    protected async findUser(email: string): Promise<INotionUser> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data: { value } } = await axios.post(
                        `${this.BASE_NOTION_URL}/findUser`,
                        { email },
                        this.headers
                    ) as { data: FindUserResult };
                    resolve(value.value)
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        })
    }

    protected async syncRecordValues(requests: SyncRecordValuesParams[]): Promise<SyncRecordValuesResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data, data: { recordMap } } = await axios.post(
                        `${this.BASE_NOTION_URL}/syncRecordValues`,
                        {
                            requests
                        },
                        this.headers
                    ) as { data: SyncRecordValuesResult };
                    this.saveToCache(recordMap);
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        })
    }

    protected async queryCollection(arg: QueryCollectionParams): Promise<QueryCollectionResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const { data, data: { recordMap } } = await axios.post(
                        `${this.BASE_NOTION_URL}/queryCollection`,
                        arg,
                        this.headers
                    ) as { data: QueryCollectionResult };
                    this.saveToCache(recordMap);
                    resolve(data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        })
    }

    protected async loadUserContent(): Promise<RecordMap> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const res = await axios.post(
                        `${this.BASE_NOTION_URL}/loadUserContent`, {}, this.headers
                    ) as { data: LoadUserContentResult };
                    this.saveToCache(res.data.recordMap);
                    resolve(res.data.recordMap);
                } catch (err) {
                    reject(error(err.response.data));
                }
            }, this.interval)
        })
    }

    protected async loadPageChunk(arg: LoadPageChunkParams): Promise<RecordMap> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const res = await axios.post(
                        `${this.BASE_NOTION_URL}/loadPageChunk`,
                        arg,
                        this.headers
                    ) as { data: LoadPageChunkResult };
                    this.saveToCache(res.data.recordMap);
                    resolve(res.data.recordMap);
                } catch (err) {
                    reject(error(err.response.data))
                }
            })
        })
    }

    protected async getBackLinksForBlock(blockId: string): Promise<GetBackLinksForBlockResult> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const res = await axios.post(
                        `${this.BASE_NOTION_URL}/getBacklinksForBlock`,
                        {
                            blockId
                        },
                        this.headers
                    ) as { data: GetBackLinksForBlockResult };
                    this.saveToCache(res.data.recordMap);
                    resolve(res.data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        })
    }

    // ? TD:2:H GetTaskResult interface
    protected async getTasks(taskIds: string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const res = await axios.post(
                        `${this.BASE_NOTION_URL}/getTasks`,
                        {
                            taskIds
                        },
                        this.headers
                    ) as { data: GetBackLinksForBlockResult };
                    resolve(res.data);
                } catch (err) {
                    reject(error(err.response.data))
                }
            }, this.interval)
        })
    }

    async updateCacheManually(arg: UpdateCacheManuallyParam) {
        const sync_record_values: SyncRecordValuesParams[] = [];
        arg.forEach((arg: string | [string, TDataType]) => {
            if (Array.isArray(arg)) sync_record_values.push({ id: arg[0], table: arg[1], version: 0 });
            else if (typeof arg === "string") sync_record_values.push({ id: arg, table: "block", version: 0 })
        })
        await this.syncRecordValues(sync_record_values);
    }

    async updateCacheIfNotPresent(arg: UpdateCacheManuallyParam) {
        const sync_record_values: SyncRecordValuesParams[] = [];
        arg.forEach((arg: string | [string, TDataType]) => {
            if (Array.isArray(arg) && !this.cache[arg[1]].get(arg[0])) sync_record_values.push({ id: arg[0], table: arg[1], version: 0 });
            else if (typeof arg === "string" && !this.cache.block.get(arg)) sync_record_values.push({ id: arg, table: "block", version: 0 })
        })
        if (sync_record_values.length)
            await this.syncRecordValues(sync_record_values);
    }
}

// file: api/Mutations.ts

export class Mutations extends Queries {
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

// file: api/Data.ts

/**
 * A class to update and control data specific stuffs
 * @noInheritDoc
 */

export class Data<T extends TData> extends Mutations {
    id: string;
    type: TDataType;
    protected listBeforeOp: (path: string[], args: Args) => IOperation;
    protected listAfterOp: (path: string[], args: Args) => IOperation;
    protected updateOp: (path: string[], args: Args) => IOperation;
    protected setOp: (path: string[], args: Args) => IOperation;
    protected listRemoveOp: (path: string[], args: Args) => IOperation;
    protected child_path: keyof T = "" as any;
    protected child_type: TDataType = "block" as any;
    #init_cache: boolean = false;
    #init_child_data: boolean;

    constructor(arg: NishanArg & { type: TDataType }) {
        super(arg);
        this.type = arg.type;
        this.id = arg.id;
        this.listBeforeOp = Operation[arg.type].listBefore.bind(this, this.id);
        this.listAfterOp = Operation[arg.type].listAfter.bind(this, this.id);
        this.updateOp = Operation[arg.type].update.bind(this, this.id)
        this.setOp = Operation[arg.type].set.bind(this, this.id)
        this.listRemoveOp = Operation[arg.type].listRemove.bind(this, this.id);
        this.#init_cache = false;
        this.#init_child_data = false;
    }

    #detectChildData = (type: TDataType, id: string) => {
        let child_type: TDataType = 'block', child_path: string = '';
        const data = this.cache[type].get(id) as TBlock;
        if (type === "block") {
            if (data.type === "page")
                child_path = "content" as any
            else if (data.type === "collection_view" || data.type === "collection_view_page") {
                child_path = "view_ids" as any
                child_type = "collection_view"
            }
        } else if (type === "space")
            child_path = "pages" as any;
        else if (type === "user_root") {
            child_path = "space_views" as any;
            child_type = "space_view"
        }
        else if (type === "collection")
            child_path = "template_pages" as any;
        else if (type === "space_view")
            child_path = "bookmarked_pages" as any;

        return [child_path, child_type] as [string, TDataType]
    }

    protected initializeChildData() {
        if (!this.#init_child_data) {
            const [child_path, child_type] = this.#detectChildData(this.type, this.id);
            this.child_path = child_path as any;
            this.child_type = child_type as any;
            this.#init_child_data = true;
        }
    }

    /**
     * Get the parent of the current data
     */
    protected getParent() {
        const data = this.getCachedData() as TBlock;
        if (this.type.match(/(space|block|collection)/) && data?.parent_id) {
            const parent = this.cache.block.get(data.parent_id) as TParentType;
            if (!parent) throw new Error(error(`Block with id ${data.id} doesnot have a parent`));
            return parent;
        } else
            throw new Error(error(`Block with id ${data.id} doesnot have a parent`));
    }

    /**
     * Get the cached data using the current data id
     */
    getCachedData<Q extends TData = T>(arg?: string, type?: TDataType) {
        type = type ? type : "block";
        let id = this.id;
        if (typeof arg === "string") id = arg;
        const data = this.cache[arg ? type : this.type].get(id) as Q;
        if (data) return data;
        else if ((data as any).alive === false)
            throw new Error(error("Data has been deleted"));
        else
            throw new Error(error("Data not available in cache"))
    }

    /**
     * Delete the cached data using the id
     */
    protected deleteCachedData() {
        this.cache[this.type].delete(this.id);
    }

    /**
     * Adds the passed block id in the child container array of parent
     * @param $block_id id of the block to add
     * @param arg
     * @returns created Operation and a function to update the cache and the class data
     */
    protected addToChildArray(child_id: string, position: RepositionParams) {
        const data = this.getCachedData();
        this.initializeChildData();

        if (!data[this.child_path]) data[this.child_path] = [] as any;

        const container: string[] = data[this.child_path] as any;

        return this.#addToChildArrayUtil({ child_id, position, container, child_path: this.child_path as string, parent_id: this.id, parent_type: this.type })
    }

    #addToChildArrayUtil = (arg: { child_id: string, position: RepositionParams, container: string[], child_path: string, parent_type: TOperationTable, parent_id: string }) => {
        const { child_id, position, container, child_path, parent_type, parent_id } = arg;
        if (position !== undefined) {
            let where: "before" | "after" = "before", id: string = '';
            if (typeof position === "number") {
                id = container?.[position] ?? '';
                where = container.indexOf(child_id) > position ? "before" : "after";
                container.splice(position, 0, child_id);
            } else {
                where = position.position, id = position.id;
                container.splice(container.indexOf(position.id) + (position.position === "before" ? -1 : 1), 0, child_id);
            }

            return (Operation[parent_type] as any)[`list${where.charAt(0).toUpperCase() + where.substr(1)}`](parent_id, [child_path], {
                [where]: id,
                id: child_id
            }) as IOperation
        } else {
            container.push(child_id);
            return Operation[parent_type].listAfter(parent_id, [child_path], {
                after: '',
                id: child_id
            }) as IOperation;
        }
    }

    protected addToParentChildArray(child_id: string, position: RepositionParams) {
        const data = this.getCachedData() as any, parent = (this.cache as any)[data.parent_table].get(data.parent_id),
            child_path = this.#detectChildData(data.parent_table, parent.id)[0], container: string[] = parent[child_path] as any;

        return this.#addToChildArrayUtil({ child_id, position, container, child_path, parent_id: data.parent_id, parent_type: data.parent_table })
    }

    /**
     * Update the cache of the data using only the passed keys
     * @param arg
     * @param keys
     */
    protected updateCacheLocally(arg: Partial<T>, keys: (keyof T)[]) {
        const _this = this;
        const parent_data = this.getCachedData();
        const data = arg as T;

        keys.forEach(key => {
            data[key] = arg[key] ?? (_this as any).data[key]
        });

        (data as any).last_edited_time = Date.now();

        return [this.updateOp(this.type === "user_settings" ? ["settings"] : [], data), function () {
            keys.forEach(key => {
                parent_data[key] = data[key];
                (_this as any).data[key] = data[key];
            })
        }] as [IOperation, (() => void)];
    }

    protected async initializeCache() {
        if (!this.#init_cache) {
            let container: UpdateCacheManuallyParam = []
            if (this.type === "block") {
                const data = this.getCachedData() as TBlock;
                if (data.type === "page")
                    container = data.content ?? [];
                if (data.type === "collection_view" || data.type === "collection_view_page") {
                    container = data.view_ids.map((view_id) => [view_id, "collection_view"]) ?? []
                    container.push([data.collection_id, "collection"])
                }
            } else if (this.type === "space") {
                container = (this.getCachedData() as ISpace).pages ?? [];
            } else if (this.type === "user_root")
                container = (this.getCachedData() as IUserRoot).space_views.map((space_view => [space_view, "space_view"])) ?? []
            else if (this.type === "collection") {
                container = (this.getCachedData() as ICollection).template_pages ?? []
                await this.queryCollection({
                    collectionId: this.id,
                    collectionViewId: "",
                    query: {},
                    loader: {
                        type: "table",
                        loadContentCover: true
                    }
                })
            }
            else if (this.type === "space_view")
                container = (this.getCachedData() as ISpaceView).bookmarked_pages ?? []

            const non_cached: UpdateCacheManuallyParam = container.filter(info =>
                !Boolean(Array.isArray(info) ? this.cache[info[1]].get(info[0]) : this.cache.block.get(info))
            );

            if (non_cached.length !== 0)
                await this.updateCacheManually(non_cached);

            this.#init_cache = true;
        }
    }

    protected async traverseChildren<Q extends TData>(arg: FilterTypes<Q>, multiple: boolean = true, cb: (block: Q, should_add: boolean) => Promise<void>, condition?: (Q: Q) => boolean) {
        await this.initializeCache();
        this.initializeChildData();

        const matched: Q[] = [];
        const data = this.getCachedData(), container: string[] = data[this.child_path] as any ?? [];

        if (Array.isArray(arg)) {
            for (let index = 0; index < arg.length; index++) {
                const block_id = arg[index], block = this.cache[this.child_type].get(block_id) as Q;
                const should_add = block && container.includes(block_id);
                if (should_add) {
                    matched.push(block)
                    await cb(block, should_add);
                }
                if (!multiple && matched.length === 1) break;
            }
        } else if (typeof arg === "function" || arg === undefined) {
            for (let index = 0; index < container.length; index++) {
                const block_id = container[index], block = this.cache[this.child_type].get(block_id) as Q;
                const should_add = block && (condition ? condition(block) : true) && (typeof arg === "function" ? await arg(block, index) : true);
                if (should_add) {
                    matched.push(block)
                    await cb(block, should_add);
                }
                if (!multiple && matched.length === 1) break;
            }
        }
        return matched;
    }

    protected async getItems<Q extends TData>(arg: FilterTypes<Q>, multiple: boolean = true, cb: (Q: Q) => Promise<any>, condition?: (Q: Q) => boolean) {
        const blocks: any[] = [];
        await this.traverseChildren<Q>(arg, multiple, async function (block, matched) {
            if (matched) blocks.push(await cb(block))
        }, condition ?? (() => true))
        return blocks;
    }

    protected async deleteItems<Q extends TData>(arg: FilterTypes<Q>, multiple: boolean = true, ) {
        const ops: IOperation[] = [], current_time = Date.now(), _this = this;
        const blocks = await this.traverseChildren(arg, multiple, async function (block, matched) {
            if (matched) {
                ops.push(Operation[_this.child_type as TDataType].update(block.id, [], {
                    alive: false,
                    last_edited_time: current_time
                }),
                    _this.listRemoveOp([_this.child_path as string], { id: block.id })
                )
            }
        })
        if (ops.length !== 0) {
            ops.push(this.setOp(["last_edited_time"], current_time));
            await this.saveTransactions(ops);
            blocks.forEach(blocks => this.cache.block.delete(blocks.id));
        }
    }

    protected createViewsUtils(schema: Schema, views: TSearchManipViewParam[], collection_id: string, parent_id: string) {
        const name_map: Map<string, { key: string } & ISchemaUnit> = new Map(), created_view_ops: IOperation[] = [], view_infos: [string, TViewType][] = [];

        Object.entries(schema).forEach(([key, schema]) => name_map.set(schema.name, { key, ...schema }));

        for (let index = 0; index < views.length; index++) {
            const { name, type, view, filter_operator = "and" } = views[index],
                sorts = [] as ViewSorts[], filters = [] as TViewFilters[], aggregations = [] as ViewAggregations[], properties = [] as ViewFormatProperties[],
                view_id = uuidv4(), included_units: string[] = [], query2 = {
                    sort: sorts,
                    filter: {
                        operator: filter_operator,
                        filters
                    },
                    aggregations
                } as any, format = {
                    [`${type}_properties`]: properties
                } as any;

            view_infos.push([view_id, type]);

            switch (type) {
                case "table":
                    const table_view = views[index] as TableSearchManipViewParam, table_format = format as ITableViewFormat;
                    table_format.table_wrap = table_view.table_wrap ?? true;
                    break;
                case "board":
                    const board_view = views[index] as BoardSearchManipViewParam, board_format = format as IBoardViewFormat;
                    board_format.board_cover = board_view.board_cover ?? { type: "page_cover" };
                    board_format.board_cover_aspect = board_view.board_cover_aspect;
                    board_format.board_cover_size = board_view.board_cover_size;
                    board_format.board_groups2 = board_view.board_groups2 as any;
                    break;
                case "gallery":
                    const gallery_view = views[index] as GallerySearchManipViewParam, gallery_format = format as IGalleryViewFormat;
                    if (gallery_view.gallery_cover?.type === "property") gallery_format.gallery_cover = { ...gallery_view.gallery_cover, property: name_map.get(gallery_view.gallery_cover.property)?.key as string }
                    else gallery_format.gallery_cover = gallery_view.gallery_cover
                    gallery_format.gallery_cover_aspect = gallery_view.gallery_cover_aspect
                    gallery_format.gallery_cover_size = gallery_view.gallery_cover_size
                    break;
                case "calendar":
                    const calender_view = views[index] as CalendarSearchManipViewParam, calendar_query2 = query2 as ICalendarViewQuery2;
                    calendar_query2.calendar_by = calender_view.calendar_by;
                    break;
                case "timeline":
                    const timeline_view = views[index] as TimelineSearchManipViewParam, timeline_format = format as ITimelineViewFormat;
                    timeline_format.timeline_preference = timeline_view.timeline_preference ?? { centerTimestamp: 1, zoomLevel: "month" }
                    timeline_format.timeline_show_table = timeline_view.timeline_show_table ?? true;
                    break;
            }

            view.forEach(info => {
                const { format, sort, aggregation, filter, name } = info, property_info = name_map.get(name);
                if (property_info) {
                    const { key } = property_info,
                        property: ViewFormatProperties = {
                            property: key,
                            visible: true,
                            width: 250
                        };
                    included_units.push(key);
                    if (typeof format === "boolean") property.visible = format;
                    else if (typeof format === "number") property.width = format;
                    else if (Array.isArray(format)) {
                        property.width = format?.[1] ?? 250
                        property.visible = format?.[0] ?? true;
                    }
                    if (sort) {
                        if (Array.isArray(sort))
                            sorts.splice(sort[1], 0, {
                                property: key,
                                direction: sort[0]
                            })
                        else sorts.push({
                            property: key,
                            direction: sort
                        })
                    }

                    if (aggregation) aggregations.push({
                        property: key,
                        aggregator: aggregation
                    })

                    if (filter) {
                        filter.forEach(([operator, type, value, position]: any) => {
                            const filter_value = {
                                property: key,
                                filter: {
                                    operator,
                                    value: {
                                        type,
                                        value
                                    }
                                } as any
                            }
                            if (position) filters.splice(position, 0, filter_value)
                            else filters.push(filter_value)
                        })
                    }
                    properties.push(property)
                } else
                    throw new Error(error(`Collection:${collection_id} does not contain SchemeUnit.name:${name}`))
            })

            const non_included_units = Object.keys(schema).filter(key => !included_units.includes(key));

            non_included_units.forEach(property => {
                properties.push({
                    property,
                    visible: false
                })
            })

            created_view_ops.push(Operation.collection_view.set(view_id, [], {
                id: view_id,
                version: 0,
                type,
                name,
                page_sort: [],
                parent_id,
                parent_table: 'block',
                alive: true,
                format,
                query2,
            }))
        }

        return [created_view_ops, view_infos] as [IOperation[], [string, TViewType][]];
    }

    protected createCollection(param: ICollectionBlockInput, parent_id: string) {
        const schema: Schema = {}, collection_id = uuidv4();

        param.schema.forEach(opt => {
            schema[(opt.name === "title" ? "Title" : opt.name).toLowerCase().replace(/\s/g, '_')] = opt
        });

        const [created_view_ops, view_infos] = this.createViewsUtils(schema, param.views, collection_id, parent_id);
        created_view_ops.unshift(Operation.collection.update(collection_id, [], {
            id: collection_id,
            schema,
            format: {
                collection_page_properties: []
            },
            icon: param?.format?.page_icon ?? "",
            parent_id,
            parent_table: 'block',
            alive: true,
            name: param.properties.title
        }));

        return [collection_id, created_view_ops, view_infos] as [string, IOperation[], [string, TViewType][]]
    }

    protected createBlockMap = () => {
        return {
            linked_db: [],
            collection_view_page: [],
            embed: [],
            video: [],
            audio: [],
            image: [],
            bookmark: [],
            code: [],
            file: [],
            tweet: [],
            gist: [],
            codepen: [],
            maps: [],
            figma: [],
            drive: [],
            text: [],
            table_of_contents: [],
            equation: [],
            breadcrumb: [],
            factory: [],
            page: [],
            to_do: [],
            header: [],
            sub_header: [],
            sub_sub_header: [],
            bulleted_list: [],
            numbered_list: [],
            toggle: [],
            quote: [],
            divider: [],
            callout: [],
            collection_view: [],
            link_to_page: []
        } as ITBlock
    }

    protected createViewMap() {
        return {
            board: [],
            gallery: [],
            list: [],
            timeline: [],
            table: [],
            calendar: [],
        } as ITView;
    }

    protected createSchemaUnitMap() {
        return {
            text: [],
            number: [],
            select: [],
            multi_select: [],
            title: [],
            date: [],
            person: [],
            file: [],
            checkbox: [],
            url: [],
            email: [],
            phone_number: [],
            formula: [],
            relation: [],
            rollup: [],
            created_time: [],
            created_by: [],
            last_edited_time: [],
            last_edited_by: []
        } as ITSchemaUnit
    }

    protected async createClass(type: TBlockType, id: string): Promise<any> {
        const Page = require("./Page").default;
        const Block = require("./Block").default;
        const CollectionView = require("./CollectionView").default;
        const CollectionViewPage = require('./CollectionViewPage').default;
        const Collection = require("./Collection").default;
        const { TableView, ListView, GalleryView, BoardView, CalendarView, TimelineView } = require("./View/index");
        const view_classes = { table: TableView, list: ListView, gallery: GalleryView, board: BoardView, calendar: CalendarView, timeline: TimelineView };

        const obj = {
            id,
            ...this.getProps()
        };

        switch (type) {
            case "video":
            case "audio":
            case "image":
            case "bookmark":
            case "code":
            case "file":
            case "tweet":
            case "gist":
            case "codepen":
            case "maps":
            case "figma":
            case "drive":
            case "text":
            case "table_of_contents":
            case "equation":
            case "breadcrumb":
            case "factory":
            case "to_do":
            case "header":
            case "sub_header":
            case "sub_sub_header":
            case "bulleted_list":
            case "numbered_list":
            case "toggle":
            case "quote":
            case "divider":
            case "callout":
                return new Block(obj);
            case "page":
                return new Page(obj);
            case "collection_view":
            case "collection_view_page":
                const cv = this.cache.block.get(id) as ICollectionView;
                await this.updateCacheIfNotPresent([[cv.collection_id, "collection"], ...cv.view_ids.map(view_id => [view_id, "collection_view"] as [string, keyof RecordMap])])
                const data = {
                    block: type === "collection_view" ? new CollectionView(obj) : new CollectionViewPage(obj),
                    collection: new Collection({ ...obj, id: cv.collection_id }),
                    views: this.createViewMap()
                }
                cv.view_ids.forEach((view_id) => {
                    const view = this.cache.collection_view.get(view_id) as TView;
                    data.views[view.type].push(new view_classes[view.type]({ ...obj, id: view_id }) as any)
                })

                return data;
            default:
                return new Page(obj);
        }
    }

    async nestedContentPopulate(contents: PageCreateContentParam[], parent_id: string, parent_table: TDataType) {
        const ops: IOperation[] = [], bookmarks: SetBookmarkMetadataParams[] = [], sync_records: UpdateCacheManuallyParam = [], block_map = this.createBlockMap();

        const { TableView, ListView, GalleryView, BoardView, CalendarView, TimelineView } = require("./View/index");
        const CollectionView = require("./CollectionView").default;
        const CollectionViewPage = require('./CollectionViewPage').default;
        const Collection = require('./Collection').default;
        const Block = require('./Block').default;

        const view_classes = { table: TableView, list: ListView, gallery: GalleryView, board: BoardView, calendar: CalendarView, timeline: TimelineView };

        const traverse = async (contents: PageCreateContentParam[], parent_id: string, parent_table: TDataType) => {
            for (let index = 0; index < contents.length; index++) {
                const content = contents[index], $block_id = uuidv4();
                sync_records.push($block_id);
                content.type = content.type ?? 'page';

                if (content.type.match(/gist|codepen|tweet|maps|figma/)) {
                    content.format = (await this.getGenericEmbedBlockData({
                        pageWidth: 500,
                        source: (content.properties as any).source[0][0] as string,
                        type: content.type as TGenericEmbedBlockType
                    })).format;
                };

                const {
                    format,
                    properties,
                    type,
                } = content;

                if (type === "bookmark") {
                    bookmarks.push({
                        blockId: $block_id,
                        url: (properties as WebBookmarkProps).link[0][0]
                    })
                    await this.setBookmarkMetadata({
                        blockId: $block_id,
                        url: (properties as WebBookmarkProps).link[0][0]
                    });
                }

                else if (type === "drive") {
                    const {
                        accounts
                    } = await this.getGoogleDriveAccounts();
                    await this.initializeGoogleDriveBlock({
                        blockId: $block_id,
                        fileId: (content as IDriveInput).file_id as string,
                        token: accounts[0].token
                    });
                }

                if (content.type === "collection_view_page" || content.type === "collection_view") {
                    const [collection_id, create_view_ops, view_infos] = this.createCollection(content as ICollectionBlockInput, $block_id);
                    const args: any = {
                        id: $block_id,
                        type,
                        collection_id,
                        view_ids: view_infos.map(view_info => view_info[0]),
                        properties,
                        format,
                        parent_id,
                        parent_table,
                        alive: true,
                    };

                    if (content.type === "collection_view_page") args.permissions = [{ type: content.isPrivate ? 'user_permission' : 'space_permission', role: 'editor', user_id: this.user_id }],
                        ops.push(Operation.block.update($block_id, [], args),
                            ...create_view_ops,
                        )

                    const collectionblock_map: ITCollectionBlock = {
                        block: type === "collection_view" ? new CollectionView({
                            ...this.getProps(),
                            id: $block_id
                        }) : new CollectionViewPage({
                            ...this.getProps(),
                            id: $block_id
                        }),
                        collection: new Collection({
                            id: collection_id,
                            ...this.getProps()
                        }),
                        views: this.createViewMap()
                    }

                    view_infos.map(([view_id, view_type]) => collectionblock_map.views[view_type].push(new view_classes[view_type]({
                        ...this.getProps(),
                        id: view_id
                    }) as any))

                    sync_records.push([collection_id, "collection"], ...view_infos.map(view_info => [view_info[0], "collection_view"] as [string, TDataType]))
                    block_map[type].push(collectionblock_map as any);
                    if (content.rows)
                        await traverse(content.rows as any, collection_id, "collection")
                } else if (content.type === "factory") {
                    const factory_contents_map = this.createBlockMap(), content_ids: string[] = [], content_blocks_ops = (content.contents.map(content => ({
                        ...content,
                        $block_id: uuidv4()
                    })) as CreateBlockArg[]).map(content => {
                        factory_contents_map[content.type].push(this.createClass(content.type, content.$block_id) as any)
                        sync_records.push(content.$block_id)
                        content_ids.push(content.$block_id);
                        return Operation.block.update(content.$block_id, [], { ...content, parent_id: $block_id, alive: true, parent_table: "block" })
                    });
                    ops.push(
                        Operation.block.update($block_id, [], {
                            id: $block_id,
                            properties,
                            format,
                            type,
                            parent_id,
                            parent_table,
                            alive: true,
                            content: content_ids
                        }),
                        ...content_blocks_ops
                    );
                    block_map.factory.push({
                        block: new Block({
                            id: $block_id,
                            ...this.getProps()
                        }), contents: factory_contents_map
                    })
                }
                else if (content.type === "linked_db") {
                    const { collection_id, views } = content,
                        collection = this.cache.collection.get(collection_id) as ICollection,
                        [created_view_ops, view_infos] = this.createViewsUtils(collection.schema, views, collection.id, $block_id);

                    ops.push(Operation.block.set($block_id, [], {
                        id: $block_id,
                        version: 1,
                        type: 'collection_view',
                        collection_id,
                        view_ids: view_infos.map(view_info => view_info[0]),
                        parent_id,
                        parent_table,
                        alive: true,
                    }),
                        ...created_view_ops);
                    sync_records.push([collection_id, "collection"], ...view_infos.map(view_info => [view_info[0], "collection_view"] as [string, keyof RecordMap]));
                    const collectionblock_map: ITCollectionBlock = {
                        block: new CollectionView({
                            ...this.getProps(),
                            id: $block_id
                        }),
                        collection: new Collection({
                            id: collection_id,
                            ...this.getProps()
                        }),
                        views: this.createViewMap()
                    }

                    view_infos.map(([view_id, view_type]) => collectionblock_map.views[view_type].push(new view_classes[view_type]({
                        ...this.getProps(),
                        id: view_id
                    }) as any))

                    block_map[content.type].push(collectionblock_map)
                }
                else if (content.type === "page") {
                    if (content.contents)
                        await traverse(content.contents, $block_id, "block");
                    ops.push(Operation.block.update($block_id, [], {
                        id: $block_id,
                        properties,
                        format,
                        type,
                        parent_id,
                        parent_table,
                        alive: true,
                        permissions: [{ type: content.isPrivate ? 'user_permission' : 'space_permission', role: 'editor', user_id: this.user_id }],
                    }))
                    block_map[type].push(await this.createClass(content.type, $block_id));
                }

                else if (content.type !== "link_to_page") {
                    ops.push(Operation.block.update($block_id, [], {
                        id: $block_id,
                        properties,
                        format,
                        type,
                        parent_id,
                        parent_table,
                        alive: true,
                    }));
                    block_map[type].push(await this.createClass(content.type, $block_id));
                }

                const content_id = content.type === "link_to_page" ? content.page_id : $block_id;

                if (parent_table === "block")
                    ops.push(Operation.block.listAfter(parent_id, ['content'], { after: '', id: content_id }))
                else if (parent_table === "space")
                    ops.push(Operation.space.listAfter(parent_id, ['pages'], { after: '', id: content_id }))
            }
        }

        await traverse(contents, parent_id, parent_table);
        return [ops, sync_records, block_map, { bookmarks }] as [IOperation[], UpdateCacheManuallyParam, ITBlock, { bookmarks: SetBookmarkMetadataParams[] }]
    }
}

// file: api/Block.ts

/**
 * A class to represent block of Notion
 * @noInheritDoc
 */
class Block<T extends TBlock, A extends TBlockInput> extends Data<T> {
    constructor(arg: NishanArg) {
        super({ ...arg, type: "block" });
    }

    async reposition(arg: RepositionParams) {
        await this.saveTransactions([this.addToChildArray(this.id, arg) as any]);
    }

    // ? FEAT:1:M Take a position arg
    /**
     * Duplicate the current block
     * @returns The duplicated block object
     */

    async duplicate(times?: number, positions?: RepositionParams[]) {
        times = times ?? 1;
        const block_map = this.createBlockMap(), data = this.getCachedData(), ops: IOperation[] = [], sync_records: UpdateCacheManuallyParam = [];
        for (let index = 0; index < times; index++) {
            const $gen_block_id = uuidv4();
            sync_records.push($gen_block_id);
            if (data.type === "collection_view" || data.type === "collection_view_page") {
                ops.push(
                    Operation.block.update($gen_block_id, [], {
                        id: $gen_block_id,
                        type: "copy_indicator",
                        parent_id: data.parent_id,
                        parent_table: "block",
                        alive: true,
                    })
                )
                await this.enqueueTask({
                    eventName: 'duplicateBlock',
                    request: {
                        sourceBlockId: data.id,
                        targetBlockId: $gen_block_id,
                        addCopyName: true
                    }
                });
            } else {
                ops.push(
                    Operation.block.update($gen_block_id, [], {
                        ...data,
                        id: $gen_block_id,
                        copied_from: data.id,
                    }),
                    this.addToParentChildArray($gen_block_id, positions ? positions[index] : undefined)
                )
            }

            block_map[data.type].push(await this.createClass(data.type, $gen_block_id));
        }

        await this.saveTransactions(ops);
        await this.updateCacheManually([...sync_records, data.parent_id])
        return block_map;
    }

    /**
     * Update a block's properties and format
     * @param args Block update format and properties options
     */
    async update(args: Partial<A>) {
        const data = this.getCachedData();

        const { format = data.format, properties = data.properties } = args;
        await this.saveTransactions(
            [
                this.updateOp([], {
                    properties,
                    format,
                    last_edited_time: Date.now()
                }),
            ]
        )
        await this.updateCacheManually([data.id]);
    }

    /**
     * Convert the current block to a different basic block
     * @param type `TBasicBlockType` basic block types
     */
    async convertTo(type: TBasicBlockType) {
        const data = this.getCachedData();
        await this.saveTransactions([
            this.updateOp([], { type })
        ]);

        const cached_value = this.cache.block.get(data.id);
        if (cached_value) {
            data.type = type;
            cached_value.type = type;
            this.cache.block.set(data.id, cached_value);
        }
        await this.updateCacheManually([data.id]);
    }

    /**
     * Delete the current block
     */
    async delete() {
        const data = this.getCachedData();
        const current_time = Date.now();
        const is_root_page = data.parent_table === "space" && data.type === "page";
        await this.saveTransactions(
            [
                this.updateOp([], {
                    alive: false,
                    last_edited_time: current_time
                }),
                is_root_page ? Operation.space.listRemove(data.space_id, ['pages'], { id: data.id }) : Operation.block.listRemove(data.parent_id, ['content'], { id: data.id }),
                is_root_page ? Operation.space.set(data.space_id, ['last_edited_time'], current_time) : Operation.block.set(data.parent_id, ['last_edited_time'], current_time)
            ]
        );
        this.cache.block.delete(this.id);
    }

    /**
     * Transfer a block from one parent page to another page
     * @param new_parent_id Id of the new parent page
     */
    async transfer(new_parent_id: string) {
        const data = this.getCachedData();
        const current_time = Date.now();
        await this.saveTransactions(
            [
                this.updateOp([], { last_edited_time: current_time, permissions: null, parent_id: new_parent_id, parent_table: 'block', alive: true }),
                Operation.block.listRemove(data.parent_id, ['content'], { id: data.id }),
                Operation.block.listAfter(new_parent_id, ['content'], { after: '', id: data.id }),
                Operation.block.set(data.parent_id, ['last_edited_time'], current_time),
                Operation.block.set(new_parent_id, ['last_edited_time'], current_time)
            ]
        )
        await this.updateCacheManually([this.id, data.parent_id, new_parent_id]);
    }

    // ? TD:1:H Add type definition propertoes and format for specific block types
    protected createBlock({ $block_id, type, properties = {}, format = {}, parent_id, parent_table = 'block' }: CreateBlockArg) {
        const data = this.getCachedData();
        const current_time = Date.now();
        const arg: any = {
            id: $block_id,
            properties,
            format,
            type,
            parent_id: parent_id ?? data.id,
            parent_table,
            alive: true,
            created_time: current_time,
            created_by_id: this.user_id,
            created_by_table: 'notion_user',
            last_edited_time: current_time,
            last_edited_by_id: this.user_id,
            last_edited_by_table: 'notion_user',
        };
        return Operation.block.update($block_id, [], arg);
    }
}

// file: api/Collection.ts

/**
 * A class to represent collection of Notion
 * @noInheritDoc
 */
class Collection extends Data<ICollection> {
    constructor(args: NishanArg) {
        super({ ...args, type: "collection" });
    }

    #createClass = (type: TSchemaUnitType, schema_id: string) => {
        const args = ({ ...this.getProps(), id: this.id, schema_id })
        return new SchemaUnit<MSchemaUnit[typeof type]>(args)
    }

    /**
     * Update the collection
     * @param opt `CollectionUpdateParam`
     */
    async update(opt: UpdatableCollectionUpdateParam) {
        const [op, update] = this.updateCacheLocally(opt, ["description", "name", "icon"])
        await this.saveTransactions([
            op
        ]);
        update();
    }

    /**
     * Create a template for the collection
     * @param opts Object for configuring template options
     */
    async createTemplate(opt: Omit<Partial<IPageInput>, "type">) {
        return (await this.createTemplates([opt]))[0]
    }

    /**
     * Create multiple templates for the collection
     * @param opts Array of Objects for configuring template options
     */
    async createTemplates(opts: (Omit<Partial<IPageInput>, "type"> & { position?: RepositionParams })[]) {
        const ops: IOperation[] = [], template_ids: string[] = [];

        for (let index = 0; index < opts.length; index++) {
            const opt = opts[index],
                { properties = {}, format = {} } = opt,
                $template_id = uuidv4();
            const block_list_op = this.addToChildArray($template_id, opt.position);
            template_ids.push($template_id);
            ops.push(Operation.block.set($template_id, [], {
                type: 'page',
                id: $template_id,
                version: 1,
                is_template: true,
                parent_id: this.id,
                parent_table: 'collection',
                alive: true,
                properties,
                format
            }), block_list_op);
        }

        await this.saveTransactions(ops);
        await this.updateCacheManually(template_ids);
        return template_ids.map(template_id => new Page({
            ...this.getProps(),
            id: template_id,
        }))
    }

    /**
     * Get a single template page of the collection
     * @param args string id or a predicate function
     * @returns Template page object
     */
    async getTemplate(args?: FilterType<IPage>) {
        return (await this.getTemplates(typeof args === "string" ? [args] : args, false))[0]
    }

    /**
     * Get multiple template pages of the collection
     * @param args string of ids or a predicate function
     * @param multiple whether multiple or single item is targeted
     * @returns An array of template pages object
     */
    async getTemplates(args?: FilterTypes<IPage>, multiple?: boolean): Promise<Page[]> {
        multiple = multiple ?? true;
        const _this = this;
        return this.getItems<IPage>(args as any, multiple, async function (page) {
            return new Page({
                ..._this.getProps(),
                id: page.id
            }) as any
        })
    }

    async updateTemplate(id: string, opt: Omit<IPageInput, "type">) {
        await this.updateTemplates([[id, opt]]);
    }

    async updateTemplates(args: [string, Omit<IPageInput, "type">][]) {
        const data = this.getCachedData(), ops: IOperation[] = [], current_time = Date.now(), block_ids: string[] = [];
        for (let index = 0; index < args.length; index++) {
            const [id, opts] = args[index];
            block_ids.push(id);
            if (data.template_pages && data.template_pages.includes(id))
                ops.push(Operation.block.update(id, [], { ...opts, last_edited_time: current_time }))
            else
                throw new Error(error(`Collection:${data.id} is not the parent of Template Page:${id}`));
        }
        await this.saveTransactions(ops);
        await this.updateCacheManually(block_ids);
        return block_ids.map(block_id => new Page({ ...this.getProps(), id: block_id }));
    }

    /**
     * Delete a single template page from the collection
     * @param args string id or a predicate function
     */
    async deleteTemplate(args?: FilterType<IPage>) {
        return await this.deleteTemplates(typeof args === "string" ? [args] : args, false);
    }

    /**
     * Delete multiple template pages from the collection
     * @param args string of ids or a predicate function
     * @param multiple whether multiple or single item is targeted
     */
    async deleteTemplates(args?: FilterTypes<IPage>, multiple?: boolean) {
        multiple = multiple ?? true;
        await this.deleteItems<IPage>(args, multiple)
    }

    /**
     * Add rows of data to the collection block
     * @param rows
     * @returns An array of newly created page objects
     */
    async createPages(rows: Omit<IPageInput, "type">[]) {
        const [ops, sync_records, block_map] = await this.nestedContentPopulate(rows as any, this.id, "collection")

        await this.saveTransactions(ops)
        await this.updateCacheManually(sync_records)
        return block_map
    }

    async getPage(arg?: FilterType<IPage>) {
        return (await this.getPages(typeof arg === "string" ? [arg] : arg, true))[0]
    }

    async getPages(args?: FilterTypes<IPage>, multiple?: boolean) {
        multiple = multiple ?? true;
        const matched: Page[] = [], page_ids: string[] = [];
        await this.initializeCache();
        for (let [_, page] of this.cache.block)
            if (page?.type === "page" && page.parent_id === this.id) page_ids.push(page.id)

        if (Array.isArray(args)) {
            for (let index = 0; index < args.length; index++) {
                const id = args[index];
                const should_add = page_ids.includes(id);
                if (should_add)
                    matched.push(new Page({ ...this.getProps(), id }))
                if (!multiple && matched.length === 1) break;
            }
        } else if (typeof args === "function" || args === undefined) {
            for (let index = 0; index < page_ids.length; index++) {
                const page_id = page_ids[index],
                    page = this.cache.block.get(page_id) as IPage;
                const should_add = typeof args === "function" ? await args(page, index) : true;
                if (should_add)
                    matched.push(new Page({ ...this.getProps(), id: page_id, }))
                if (!multiple && matched.length === 1) break;
            }
        }
        return matched;
    }

    /**
     * Create a new column in the collection schema
     * @param args Schema creation properties
     * @returns A SchemaUnit object representing the column
     */
    async createSchemaUnit(args: TSchemaUnit) {
        return (await this.createSchemaUnits([args]))[0]
    }

    /**
     * Create multiple new columns in the collection schema
     * @param args array of Schema creation properties
     * @returns An array of SchemaUnit objects representing the columns
     */
    async createSchemaUnits(args: TSchemaUnit[]) {
        const results: SchemaUnit<TSchemaUnit>[] = [], data = this.getCachedData();
        for (let index = 0; index < args.length; index++) {
            const arg = args[index];
            const schema_id = arg.name.toLowerCase().replace(/\s/g, '_');
            data.schema[schema_id] = arg;
            results.push(new SchemaUnit({ schema_id, ...this.getProps(), id: this.id }))
        }
        this.saveTransactions([this.updateOp([], { schema: data.schema })])
        this.updateCacheManually([this.id]);
        return results;
    }

    /**
     * Return multiple columns from the collection schema
     * @param args schema_id string array or predicate function
     * @returns An array of SchemaUnit objects representing the columns
     */
    async getSchemaUnits(args?: FilterTypes<(TSchemaUnit & { key: string })>, multiple?: boolean) {
        multiple = multiple ?? true;
        const schema_unit_map = this.createSchemaUnitMap(), data = this.getCachedData(), container: string[] = Object.keys(data.schema) as any ?? [];

        if (Array.isArray(args)) {
            for (let index = 0; index < args.length; index++) {
                const schema_id = args[index], schema = data.schema[schema_id],
                    should_add = container.includes(schema_id);
                if (should_add) {
                    schema_unit_map[schema.type].push(this.#createClass(schema.type, schema_id))
                    this.logger && this.logger("READ", "SchemaUnit", schema_id)
                }
            }
        } else if (typeof args === "function" || args === undefined) {
            for (let index = 0; index < container.length; index++) {
                const schema_id = container[index], schema = data.schema[container[index]], should_add = (typeof args === "function" ? await args({ ...schema, key: container[index] }, index) : true);
                if (should_add) {
                    schema_unit_map[schema.type].push(this.#createClass(schema.type, schema_id))
                    this.logger && this.logger("READ", "SchemaUnit", schema_id)
                }
            }
        }
        return schema_unit_map;
    }

    /**
     * Update and return a single column from the collection schema
     * @param args schema_id string and schema properties tuple
     * @returns A SchemaUnit object representing the column
     */
    async updateSchemaUnit(args: [string, TSchemaUnit]) {
        return (await this.updateSchemaUnits([args]))[0]
    }

    /**
     * Update and return multiple columns from the collection schema
     * @param args schema_id string and schema properties array of tuples
     * @returns An array of SchemaUnit objects representing the columns
     */
    async updateSchemaUnits(args: [string, TSchemaUnit][]) {
        const results: SchemaUnit<TSchemaUnit>[] = [], data = this.getCachedData();
        for (let index = 0; index < args.length; index++) {
            const [schema_id, schema_data] = args[index];
            if (!data.schema[schema_id]) error(`Collection:${this.id} does not contain SchemaUnit:${schema_id}`)
            data.schema[schema_id] = { ...data.schema[schema_id], ...schema_data };
            results.push(new SchemaUnit({ schema_id, ...this.getProps(), id: this.id }))
        }
        this.saveTransactions([this.updateOp([], { schema: data.schema })])
        this.updateCacheManually([this.id]);
        return results;
    }

    /**
     * Delete a single column from the collection schema
     * @param args schema_id string or predicate function
     * @returns A SchemaUnit object representing the column
     */
    async deleteSchemaUnit(args?: FilterType<TSchemaUnit & { key: string }>) {
        return (await this.deleteSchemaUnits(typeof args === "string" ? [args] : args, false));
    }

    /**
     * Delete multiple columns from the collection schema
     * @param args schema_id string array or predicate function
     * @returns An array of SchemaUnit objects representing the columns
     */
    async deleteSchemaUnits(args?: FilterTypes<TSchemaUnit & { key: string }>, multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), container: string[] = Object.keys(data.schema) as any ?? [];
        const matched: string[] = []
        if (Array.isArray(args)) {
            for (let index = 0; index < args.length; index++) {
                const schema_id = args[index];
                const should_add = container.includes(schema_id);
                if (should_add) matched.push(schema_id)
                if (!multiple && matched.length === 1) break;
            }
        } else if (typeof args === "function" || args === undefined) {
            for (let index = 0; index < container.length; index++) {
                const should_add = typeof args === "function" ? await args({ ...data.schema[container[index]], key: container[index] }, index) : true;
                if (should_add)
                    matched.push(container[index])
                if (!multiple && matched.length === 1) break;
            }
        }

        matched.forEach(id => delete data.schema[id]);
        this.saveTransactions([this.updateOp([], { schema: data.schema })]);
        this.updateCacheManually([this.id]);
    }
}

// file: api/Permissions.ts

export class Permissions<T extends (ICollectionViewPage | IPage)> extends Block<T, any>{
    constructor(arg: NishanArg) {
        super(arg);
    }

    /**
     * Share page to users with specific permissions
     * @param args array of userid and role of user to share pages to
     */
    async addSharedUsers(args: [string, TPermissionRole][]) {
        const data = this.getCachedData(), notion_users: INotionUser[] = [];
        const permissionItems: IPermission[] = [];
        for (let i = 0; i < args.length; i++) {
            const [email, permission] = args[i];
            const notion_user = await this.findUser(email);
            if (!notion_user) error(`User does not have a notion account`);
            else
                permissionItems.push({
                    role: permission,
                    type: "user_permission",
                    user_id: notion_user.id
                });
            notion_users.push(notion_user)
        }
        await this.inviteGuestsToSpace({
            blockId: data.id,
            permissionItems,
            spaceId: data.space_id
        });
        await this.updateCacheManually([this.id, [data.space_id, "space"]]);
        return notion_users;
    }

    /**
     * Share the current page with the user
     * @param email email of the user to add
     * @param role Role of the added user
     */
    async addSharedUser(email: string, role: TPermissionRole) {
        return (await this.addSharedUsers([[email, role]]))?.[0]
    }

    /**
     * Update the role of the current user based on their id
     * @param id Id of the user to update
     * @param role new Role of the user to update
     */
    async updateSharedUser(id: string, role: TPermissionRole) {
        return await this.updateSharedUsers([[id, role]]);
    }

    /**
     * Update the role of the current users based on their id
     * @param args array of array [id of the user, role type for the user]
     */
    async updateSharedUsers(args: [string, TPermissionRole][]) {
        const data = this.getCachedData(), ops: IOperation[] = [];
        for (let index = 0; index < args.length; index++) {
            const arg = args[index];
            ops.push({
                args: { role: arg[1], type: "user_permission", user_id: arg[0] },
                command: "setPermissionItem",
                id: this.id,
                path: ["permissions"],
                table: "block"
            })
        }
        ops.push(this.updateOp(["last_edited_time"], Date.now()));
        await this.saveTransactions(ops);
        await this.updateCacheManually([data.id, [data.space_id, "space"]]);
    }

    /**
     * Remove a single user from the pages permission option
     * @param id Id of the user to remove from permission
     */
    async removeSharedUser(id: string) {
        return await this.removeSharedUsers([id]);
    }

    /**
     * Remove multiple users from the pages permission option
     * @param id array of the users id to remove from permission
     */
    async removeSharedUsers(ids: string[]) {
        return await this.updateSharedUsers(ids.map(id => [id, "none"]));
    }

    async addPublicPermission(role: TPublicPermissionRole, options?: Partial<IPublicPermissionOptions>) {
        await this.saveTransactions([Operation.block.setPermissionItem(this.id, ["permissions"], {
            type: "public_permission",
            role,
            ...(options ?? {})
        })])
        await this.updateCacheManually([this.id])
    }

    async updatePublicPermission(role: TPublicPermissionRole, options?: Partial<IPublicPermissionOptions>) {
        const data = this.getCachedData(), permission = data.permissions.find((permission) => permission.type === "public_permission") as IPublicPermission;
        await this.saveTransactions([Operation.block.setPermissionItem(this.id, ["permissions"], {
            ...(permission ?? {}),
            type: "public_permission",
            role,
            ...(options ?? {})
        })])
        await this.updateCacheManually([this.id])
    }

    async removePublicPermission() {
        await this.saveTransactions([Operation.block.setPermissionItem(this.id, ["permissions"], {
            type: "public_permission",
            role: "none"
        })])
        await this.updateCacheManually([this.id])
    }

    async updateSpacePermission(role: TSpacePermissionRole) {
        await this.saveTransactions([Operation.block.setPermissionItem(this.id, ["permissions"], {
            type: "space_permission",
            role,
        })]);
        await this.updateCacheManually([this.id])
    }

    async removeSpacePermission() {
        await this.saveTransactions([Operation.block.setPermissionItem(this.id, ["permissions"], {
            type: "space_permission",
            role: "none",
        })]);
        await this.updateCacheManually([this.id])
    }
}


// file: api/CollectionBlock.ts

/**
 * A class to represent collectionblock type in Notion
 * @noInheritDoc
 */
class CollectionBlock extends Permissions<ICollectionViewPage> {
    constructor(arg: NishanArg & { type: "block" }) {
        super({ ...arg });
    }

    /**
     * Fetch the corresponding collection of the collection block using the collection_id
     * @returns The corresponding collection object
     */
    async getCollection() {
        await this.initializeCache();
        const data = this.getCachedData();
        return new Collection({
            ...this.getProps(),
            id: data.collection_id,
        });
    }

    async createViews(params: [TSearchManipViewParam, ...TSearchManipViewParam[]]) {
        const ops: IOperation[] = [], data = this.getCachedData(), collection = this.cache.collection.get(data.collection_id) as ICollection, [created_view_ops, view_infos] = this.createViewsUtils(collection.schema, params, collection.id, this.id), view_map = this.createViewMap();
        ops.push(...created_view_ops, Operation.block.update(data.id, [], { view_ids: [...data.view_ids, ...view_infos.map(view_info => view_info[0])] }));
        await this.saveTransactions(ops);
        await this.updateCacheManually(view_infos.map(view_info => [view_info[0], "collection_view"]));
        view_infos.map(view_info => view_map[view_info[1]].push(new view_class[view_info[1]]({ id: view_info[0], ...this.getProps() }) as any));
        return view_map;
    }

    /**
     * Get all the views associated with the collection block
     * @returns An array of view objects of the collectionblock
     */
    async getViews(args?: FilterTypes<TView>, multiple?: boolean) {
        multiple = multiple ?? true;
        const props = this.getProps(), view_map = this.createViewMap(), logger = this.logger;

        await this.getItems<TView>(args, multiple, async function (view) {
            logger && logger("READ", "View", view.id);
            view_map[view.type].push(new view_class[view.type]({
                id: view.id,
                ...props
            }) as any)
        })
        return view_map;
    }

    /**
     * Delete multiple root_pages or root_collection_view_pages
     * @param arg Criteria to filter the pages to be deleted
     * @param multiple whether or not multiple root pages should be deleted
     */
    async deleteViews(args?: FilterTypes<TView>, multiple?: boolean) {
        multiple = multiple ?? true;
        await this.deleteItems<TView>(args, multiple)
    }

    /**
     * Delete a single root page from the space
     * @param arg Criteria to filter the page to be deleted
     */
    async deleteView(arg?: FilterType<TView>) {
        return await this.deleteViews(typeof arg === "string" ? [arg] : arg, false);
    }

    // ? FEAT:1:H Create updateView(s) methods, take help from view.updateView method
}

// file: api/CollectionView.ts


/**
 * A class to represent collectionview of Notion
 * @noInheritDoc
 */
export class CollectionView extends CollectionBlock {
    constructor(arg: NishanArg) {
        super({ ...arg, type: "block" });
    }
}

// file: api/CollectionViewPage.ts

/**
 * A class to represent collectionviewpage of Notion
 * @noInheritDoc
 */
class CollectionViewPage extends CollectionBlock {
    constructor(arg: NishanArg) {
        super({ ...arg, type: "block" });
    }
}



// file: api/NotionUser.ts

/**
 * A class to represent NotionUser of Notion
 * @noInheritDoc
 */
class NotionUser extends Data<INotionUser> {
    constructor(arg: NishanArg) {
        super({ ...arg, type: "notion_user" });
    }

    /**
     * Get the current logged in user settings
     * @returns Returns the logged in UserSettings object
     */
    getUserSettings() {
        const user_settings = this.cache.user_settings.get(this.user_id);
        if (user_settings) {
            this.logger && this.logger('READ', 'UserSettings', user_settings.id)
            return new UserSettings({
                ...this.getProps(),
                id: user_settings.id,
            });
        }
    }

    getUserRoot() {
        const notion_user = this.cache.user_root.get(this.id);
        if (notion_user) {
            this.logger && this.logger('READ', 'UserRoot', notion_user.id)
            return new UserRoot({
                ...this.getProps(),
                id: this.id
            })
        }

    }

    /**
     * Update the notion user
     * @param opt `UpdatableNotionUserParam`
     */

    async update(opt: UpdatableNotionUserParam) {
        const [op, update] = this.updateCacheLocally(opt, ['family_name',
            'given_name',
            'profile_photo']);

        await this.saveTransactions([
            op
        ]);
        this.logger && this.logger(`UPDATE`, 'NotionUser', this.id);
        update();
    }

    /**
     * Get a space that is available on the user's account
     * @param arg A predicate filter function or a string
     * @returns The obtained Space object
     */
    async getSpace(arg?: FilterType<ISpace>) {
        return (await this.getSpaces(typeof arg === "string" ? [arg] : arg, false))[0]
    }

    // ? FIX:1:E Fix getSpaces to use [Data].traverseChildren method
    /**
     * Get multiple space objects on the user's account as an array
     * @param arg empty or A predicate function or a string array of ids
     * @returns An array of space objects
     */
    async getSpaces(args?: FilterTypes<ISpace>, multiple?: boolean) {
        multiple = multiple ?? true;
        const spaces: Space[] = [];
        let i = 0;

        for (const [, space] of this.cache.space) {
            let should_add = false;
            if (args === undefined)
                should_add = true;
            else if (Array.isArray(args) && args.includes(space.id))
                should_add = true;
            else if (typeof args === "function")
                should_add = await args(space, i) as boolean;

            if (should_add) {
                spaces.push(new Space({
                    id: space.id,
                    interval: this.interval,
                    token: this.token,
                    cache: this.cache,
                    user_id: this.user_id,
                    shard_id: space.shard_id,
                    space_id: space.id,
                    logger: this.logger
                }))
                this.logger && this.logger(`READ`, 'Space', space.id);
            }

            if (!multiple && spaces.length === 1) break;
            i++;
        }
        return spaces;
    }

    /**
    * Create and return a new Space
    * @param opt Object for configuring the Space options
    * @returns Newly created Space object
    */
    async createWorkSpace(opt: UpdatableSpaceParams) {
        return await this.createWorkSpaces([opt]);
    };

    async createWorkSpaces(opts: UpdatableSpaceParams[]) {
        const ops: IOperation[] = [], sync_records: UpdateCacheManuallyParam = [], space_ids: string[] = [];
        for (let index = 0; index < opts.length; index++) {
            const opt = opts[index], { name = "Workspace", icon = "", disable_public_access = false, disable_export = false, disable_move_to_space = false, disable_guests = false, beta_enabled = true, domain = "", invite_link_enabled = true } = opt, page_id = uuidv4(), $space_view_id = uuidv4(), { spaceId: space_id } = await this.createSpace({ name, icon });
            space_ids.push(space_id);
            ops.push(
                Operation.space.update(space_id, [], {
                    disable_public_access,
                    disable_export,
                    disable_guests,
                    disable_move_to_space,
                    beta_enabled,
                    invite_link_enabled,
                    domain
                }),
                Operation.user_settings.update(this.user_id, ['settings'], {
                    persona: 'personal', type: 'personal'
                }),
                Operation.space_view.set($space_view_id, [], {
                    created_getting_started: false,
                    created_onboarding_templates: false,
                    space_id,
                    notify_mobile: true,
                    notify_desktop: true,
                    notify_email: true,
                    parent_id: this.user_id,
                    parent_table: 'user_root',
                    alive: true,
                    joined: true,
                    id: $space_view_id,
                    version: 1,
                    visited_templates: [],
                    sidebar_hidden_templates: [],
                }),
                Operation.block.update(page_id, [], {
                    type: 'page',
                    id: page_id,
                    version: 1,
                    parent_id: space_id,
                    parent_table: 'space',
                    alive: true,
                    permissions: [{ type: 'user_permission', role: 'editor', user_id: this.user_id }],
                    properties: {
                        title: [[name]]
                    }
                }),
                Operation.user_root.listAfter(this.user_id, ['space_views'], { id: $space_view_id }),
                Operation.space.listAfter(space_id, ['pages'], { id: page_id }));
            sync_records.push([space_id, "space"], [$space_view_id, "space_view"], [this.user_id, "user_root"], page_id)
            this.logger && this.logger(`CREATE`, 'Space', space_id);
        }
        await this.saveTransactions(ops);
        await this.updateCacheManually(sync_records);
        return space_ids.map(space_id => new Space({
            id: space_id,
            ...this.getProps()
        }))
    }

    // ? FEAT:1:M Add deleteSpaces methods

    async getTPagesById(ids: string[]) {
        const tpage_map: ITPage = { page: [], collection_view_page: [] }, tpage_content_ids: string[] = [];

        await this.updateCacheManually(ids);

        for (let index = 0; index < ids.length; index++) {
            const id = ids[index];
            const page = this.cache.block.get(id) as TPage;
            if (page.type === "page") {
                tpage_map.page.push(new Page({ ...this.getProps(), id: page.id }))
                tpage_content_ids.push(...page.content);
            } else
                tpage_map.collection_view_page.push(new CollectionViewPage({ ...this.getProps(), id: page.id }));
        }

        if (tpage_content_ids.length)
            await this.updateCacheManually(tpage_content_ids);
        return tpage_map;
    }
}

// file: api/Page.ts

/**
 * A class to represent Page type block of Notion
 * @noInheritDoc
 */

export class Page extends Permissions<IPage> {
    constructor(arg: NishanArg) {
        super(arg);
    }

    /* async upload() {
      const res = await this.getUploadFileUrl({
        bucket: "secure",
        contentType: "image/jpeg",
        name: "68sfghkgmvd51.jpg"
      });
  
      const file_url_chunks = res.url.split("/");
      const file_id = file_url_chunks[file_url_chunks.length - 2];
  
      await axios.put(res.signedPutUrl);
      await this.createContent({
        type: "image",
        properties: {
          source: [[res.url]]
        },
        format: {
          display_source: res.url
        },
        file_ids: file_id
      } as IImageInput & { file_ids: string });
    } */

    /**
     * Add/remove this page from the favourite list
     */
    async toggleFavourite() {
        const data = this.getCachedData();
        let target_space_view: ISpaceView | null = null;
        for (let [, space_view] of this.cache.space_view) {
            if (space_view.space_id === data.space_id) {
                target_space_view = space_view;
                break;
            }
        };
        if (target_space_view) {
            const is_bookmarked = target_space_view?.bookmarked_pages?.includes(data.id);
            await this.saveTransactions([
                (is_bookmarked ? Operation.space_view.listRemove : Operation.space_view.listBefore)(target_space_view.id, ["bookmarked_pages"], {
                    id: data.id
                })
            ])
            await this.updateCacheManually([[target_space_view.id, "space_view"]]);
        }
    }

    /**
     * Export the page and its content as a zip
     * @param arg Options used for setting up export
     */
    // ? FEAT:2:M Add export block method (maybe create a separate class for it as CollectionBlock will also support it)
    async export(arg: {
        timeZone: string,
        recursive: boolean,
        exportType: TExportType
    }) {
        const data = this.getCachedData();
        const {
            timeZone, recursive = true, exportType = "markdown"
        } = arg || {};
        const {
            taskId
        } = await this.enqueueTask({
            eventName: 'exportBlock',
            request: {
                blockId: data.id,
                exportOptions: {
                    exportType,
                    locale: "en",
                    timeZone
                },
                recursive
            }
        });

        const {
            results
        } = await this.getTasks([taskId]);

        const response = await axios.get(results[0].status.exportURL, {
            responseType: 'arraybuffer'
        });

        return response.data;
    }

    /**
     * Batch add multiple block as contents
     * @param contents array of options for configuring each content
     * @returns Array of newly created block content objects
     */
    async createBlocks(contents: PageCreateContentParam[]) {
        const [ops, sync_records, block_map, { bookmarks }] = await this.nestedContentPopulate(contents, this.id, "block");

        for (let bookmark of bookmarks)
            await this.setBookmarkMetadata(bookmark)
        await this.saveTransactions(ops);
        await this.updateCacheManually(sync_records);
        return block_map;
    }

    async getBlock(arg?: FilterType<TBlock>) {
        return await this.getBlocks(typeof arg === "string" ? [arg] : arg, false);
    }

    /**
     * Get all the blocks of the page as an object
     * @returns An array of block object
     */
    async getBlocks(args?: FilterTypes<TBlock>, multiple?: boolean) {
        multiple = multiple ?? true;
        const _this = this, block_map = this.createBlockMap();
        await this.getItems<TBlock>(args, multiple, async function (block) {
            block_map[block.type].push(await _this.createClass(block.type, block.id))
        })
        return block_map;
    }

    /**
     * Delete a single block from a page
     * @param arg id string or a predicate acting as a filter
     */
    async deleteBlock(arg?: FilterType<TBlock>) {
        return await this.deleteBlocks(typeof arg === "string" ? [arg] : arg, false);
    }

    /**
     * Delete multiple blocks from a page
     * @param arg array of ids or a predicate acting as a filter
     */
    async deleteBlocks(args?: FilterTypes<TBlock>, multiple?: boolean) {
        multiple = multiple ?? true;
        await this.deleteItems<TBlock>(args, multiple)
    }
}


// file: api/SchemaUnit.ts

/**
 * A class to represent a column schema of a collection
 * @noInheritDoc
 */

export class SchemaUnit<T extends TSchemaUnit> extends Data<ICollection> {
    schema_id: string;

    constructor(arg: NishanArg & { schema_id: string }) {
        super({ ...arg, type: "collection" });
        this.schema_id = arg.schema_id
    }

    // ? FEAT:1:M Change schema_id method
    // ? FEAT:1:H Change column datatype

    async update(arg: T) {
        const data = super.getCachedData();
        data.schema[this.schema_id] = { ...data.schema[this.schema_id], ...arg }
        this.saveTransactions([this.updateOp([], { schema: data.schema })])
        this.updateCacheManually([this.id]);
        this.logger && this.logger("UPDATE", "SchemaUnit", this.id);
    }

    async delete() {
        const data = super.getCachedData();
        delete data.schema[this.schema_id];
        this.saveTransactions([this.updateOp([], { schema: data.schema })])
        this.updateCacheManually([this.id]);
        this.logger && this.logger("DELETE", "SchemaUnit", this.id);
    }

    async duplicate() {
        const data = super.getCachedData(),
            id = shortid();
        data.schema[id] = data.schema[this.schema_id];
        this.saveTransactions([this.updateOp([], { schema: data.schema })])
        this.updateCacheManually([this.id]);
        this.logger && this.logger("CREATE", "SchemaUnit", id);
    }

    getCachedChildData() {
        const data = super.getCachedData();
        return data.schema[this.schema_id];
    }
}

// file: api/Space.ts

/**
 * A class to represent space of Notion
 * @noInheritDoc
 */
export class Space extends Data<ISpace> {
    space_view?: ISpaceView;

    constructor(arg: NishanArg) {
        super({ ...arg, type: "space" });
    }

    get spaceView() {
        let target_space_view: ISpaceView | null = null;
        for (let [, space_view] of this.cache.space_view) {
            if (space_view.space_id === this.id) {
                target_space_view = space_view;
                break;
            }
        }
        return target_space_view;
    }

    /**
     * Get the space view associated with the space
     * @returns The associated space view object
     */
    getSpaceView() {
        const target_space_view = this.spaceView;
        if (target_space_view) {
            this.logger && this.logger("READ", "SpaceView", target_space_view.id)
            return new SpaceView({
                id: target_space_view.id,
                ...this.getProps()
            });
        }
    }

    // ? FEAT:1:M Update space permissions
    /**
     * Update the space settings
     * @param opt Properties of the space to update
     */
    async update(opt: UpdatableSpaceParams) {
        const [op, update] = this.updateCacheLocally(opt, ['icon', "disable_move_to_space", "disable_export", "disable_guests", "disable_public_access", "domain", "invite_link_enabled",
            'beta_enabled',
            'last_edited_time',
            'name']);

        await this.saveTransactions([
            op
        ]);
        this.logger && this.logger("UPDATE", "Space", this.id);
        update();
    }

    /**
     * Delete the current workspace
     */
    async delete() {
        await this.enqueueTask({
            eventName: 'deleteSpace',
            request:
            {
                spaceId: this.id
            }
        });
        this.logger && this.logger("DELETE", "Space", this.id);
        this.cache.space.delete(this.id);
    }

    async createTRootPages(options: ((ICollectionViewPageInput | IPageInput) & { position?: RepositionParams })[]) {
        const [ops, sync_records, block_map] = await this.nestedContentPopulate(options, this.id, "space")
        await this.saveTransactions(ops);
        await this.updateCacheManually(sync_records);
        return block_map;
    }

    async getTRootPage(args?: FilterTypes<IPage | ICollectionViewPage>) {
        const troot_page = await this.getTRootPages(args, false);
        return {
            page: troot_page.page[0],
            collection_view_page: troot_page.collection_view_page[0]
        }
    }

    async getTRootPages(args?: FilterTypes<IPage | ICollectionViewPage>, multiple?: boolean) {
        multiple = multiple ?? true;
        const props = this.getProps(), trootpage_map: ITPage = { collection_view_page: [], page: [] }, logger = this.logger;
        await this.getItems<IPage | ICollectionViewPage>(args, multiple, async function (page) {
            if (page.type === "page") {
                logger && logger("READ", "Page", page.id);
                trootpage_map.page.push(new Page({
                    id: page.id,
                    ...props
                }))
            }
            else if (page.type === "collection_view_page") {
                logger && logger("READ", "CollectionViewPage", page.id);
                trootpage_map.collection_view_page.push(new CollectionViewPage({
                    id: page.id,
                    ...props
                }))
            }
        });
        return trootpage_map;
    }

    async getRootCollection(arg?: FilterType<ICollection>) {
        return (await this.getRootCollections(typeof arg === "string" ? [arg] : arg, true))[0]
    }

    async getRootCollections(args?: FilterTypes<ICollection>, multiple?: boolean) {
        multiple = multiple ?? true;
        await this.initializeCache();
        this.initializeChildData();
        const data = this.getCachedData(), collections: Collection[] = [], collection_ids = (((data[this.child_path] as string[]).map((id) => this.cache.block.get(id) as TPage)).filter((cvp) => cvp?.type === "collection_view_page") as ICollectionViewPage[]).map(cvp => cvp.collection_id);

        if (Array.isArray(args)) {
            for (let index = 0; index < args.length; index++) {
                const collection_id = args[index];
                const should_add = collection_ids.includes(collection_id);
                if (should_add)
                    collections.push(new Collection({ ...this.getProps(), id: collection_id }))
                if (!multiple && collections.length === 1) break;
            }
        } else if (typeof args === "function" || args === undefined) {
            for (let index = 0; index < collection_ids.length; index++) {
                const collection_id = collection_ids[index], collection = this.cache.collection.get(collection_id) as ICollection;
                const should_add = (typeof args === "function" ? await args(collection, index) : true);
                if (should_add)
                    collections.push(new Collection({ ...this.getProps(), id: collection_id }))
                if (!multiple && collections.length === 1) break;
            }
        }
        return collections;
    }

    /**
     * Update a singular root page in the space
     * @param id id of the root page to update
     * @param opt object to configure root page
     */
    async updateRootPage(id: string, opt: Omit<IPageInput, "type">) {
        await this.updateRootPages([[id, opt]]);
    }

    /**
     * Update multiple root pages located in the space
     * @param arg Array of tuple, id and object to configure each root page
     * @param multiple whether multiple rootpages should be deleted
     */
    async updateRootPages(arg: [string, Omit<IPageInput, "type">][]) {
        const data = this.getCachedData(), ops: IOperation[] = [], current_time = Date.now(), block_ids: string[] = [];
        for (let index = 0; index < arg.length; index++) {
            const [id, opts] = arg[index];
            block_ids.push(id);
            if (data.pages.includes(id))
                ops.push(Operation.block.update(id, [], { ...opts, last_edited_time: current_time }))
            else
                throw new Error(error(`Space:${data.id} is not the parent of RootPage:${id}`));
        }
        await this.saveTransactions(ops);
        await this.updateCacheManually(block_ids);
    }

    /**
     * Delete a single root page from the space
     * @param arg Criteria to filter the page to be deleted
     */
    async deleteTRootPage(arg?: FilterType<TPage>) {
        return await this.deleteTRootPages(typeof arg === "string" ? [arg] : arg, false);
    }

    /**
     * Delete multiple root_pages or root_collection_view_pages from the space
     * @param arg Criteria to filter the pages to be deleted
     * @param multiple whether or not multiple root pages should be deleted
     */
    async deleteTRootPages(args?: FilterTypes<TPage>, multiple?: boolean) {
        multiple = multiple ?? true;
        await this.deleteItems<TPage>(args, multiple)
    }

    // ? FEAT:1:M Empty userids for all user, a predicate

    /**
     * Remove multiple users from the current space
     * @param userIds ids of the user to remove from the workspace
     */
    async removeUsers(userIds: string[]) {
        const data = this.getCachedData();
        await this.removeUsersFromSpace({
            removePagePermissions: true,
            revokeUserTokens: false,
            spaceId: data?.id,
            userIds
        });
        this.updateCacheLocally({
            permissions: data.permissions.filter(permission => !userIds.includes(permission.user_id))
        }, ["permissions"]);
    }
}

// file: api/SpaceView.ts

/**
 * A class to represent spaceview of Notion
 * @noInheritDoc
 */
class SpaceView extends Data<ISpaceView> {
    constructor(arg: NishanArg) {
        super({ ...arg, type: "space_view" });
    }

    async reposition(arg: RepositionParams) {
        const op = this.addToChildArray(this.id, arg);
        await this.saveTransactions([op]);
        this.logger && this.logger("UPDATE", "SpaceView", this.id);
    }

    /**
     * Update the current space view
     * @param arg Options to update the spaceView
     */
    async update(arg: UpdatableSpaceViewParam) {
        const [op, update] = this.updateCacheLocally(arg, ['notify_email',
            'notify_desktop',
            'notify_mobile'])
        await this.saveTransactions([
            op
        ]);
        this.logger && this.logger("UPDATE", "SpaceView", this.id);
        update();
    }

    /**
     * Get the corresponding space associated with this space view
     * @returns The corresponding space object
     */
    async getSpace(return_object: boolean = true) {
        const data = this.getCachedData();
        let target_space: ISpace = null as any;
        for (let [, space] of this.cache.space) {
            if (data && space.id === data.space_id) {
                target_space = space;
                break;
            }
        }
        if (return_object) {
            this.logger && this.logger("READ", "Space", target_space.id);
            return new Space({
                id: (target_space as any).id,
                ...this.getProps()
            });
        }
        else return target_space
    }

    /**
    * Toggle a single page from the bookmark list
    * @param arg id string or a predicate filter function
    */
    async toggleFavourite(arg?: FilterType<TPage>) {
        await this.toggleFavourites(typeof arg === "string" ? [arg] : arg, false);
    }

    /**
     * Toggle multiple pages from the bookmark list
     * @param arg string of ids or a predicate function
     * @param multiple whether multiple or single item is targeted
     */
    async toggleFavourites(args?: FilterTypes<TPage>, multiple?: boolean) {
        multiple = multiple ?? true;
        const target_space_view = this.getCachedData(), target_space = await this.getSpace(false) as ISpace, ops: IOperation[] = [];
        if (Array.isArray(args)) {
            for (let index = 0; index < args.length; index++) {
                const page_id = args[index];
                if (target_space.pages.includes(page_id)) {
                    const is_bookmarked = target_space_view?.bookmarked_pages?.includes(page_id);
                    ops.push((is_bookmarked ? Operation.space_view.listRemove : Operation.space_view.listBefore)(target_space_view.id, ["bookmarked_pages"], {
                        id: page_id
                    }))
                    this.logger && this.logger("UPDATE", "Page", page_id);
                }
                if (!multiple && ops.length === 1) break;
            }
        } else if (typeof args === "function") {
            for (let index = 0; index < target_space.pages.length; index++) {
                const page_id = target_space.pages[index];
                const page = this.getCachedData<IPage>(page_id);
                if (page.parent_id === target_space.id && await args(page, index)) {
                    const is_bookmarked = target_space_view?.bookmarked_pages?.includes(page_id);
                    ops.push((is_bookmarked ? this.listRemoveOp : this.listBeforeOp)(["bookmarked_pages"], {
                        id: page_id
                    }));
                    this.logger && this.logger("UPDATE", "Page", page_id);
                }
                if (!multiple && ops.length === 1) break;
            }
        }

        if (ops.length !== 0) {
            await this.saveTransactions(ops);
            await this.updateCacheManually([[target_space_view.id, "space_view"]]);
        }
    }
}

// file: api/UserRoot.ts

class UserRoot extends Data<IUserRoot> {
    constructor(arg: NishanArg) {
        super({ ...arg, type: "user_root" });
    }

    /**
     * Get a single space view from the user root
     * @param arg criteria to filter pages by
     * @returns A page object matching the passed criteria
     */
    async getSpaceView(arg?: FilterType<ISpaceView>) {
        return (await this.getSpaceViews(typeof arg === "string" ? [arg] : arg, false))[0]
    }

    /**
     * Get multiple Space views from the user root
     * @param arg criteria to filter pages by
     * @returns An array of pages object matching the passed criteria
     */
    async getSpaceViews(args?: FilterTypes<ISpaceView>, multiple?: boolean): Promise<SpaceView[]> {
        multiple = multiple ?? true;
        const props = this.getProps(), logger = this.logger;
        return this.getItems<ISpaceView>(args, multiple, async function (space_view) {
            logger && logger("READ", "SpaceView", space_view.id)
            return new SpaceView({
                id: space_view.id,
                ...props
            })
        });
    }
}

// file: api/UserSettings.ts

/**
 * A class to represent user settings of Notion
 * @noInheritDoc
 */
class UserSettings extends Data<IUserSettings> {
    constructor(arg: NishanArg) {
        super({ ...arg, type: "user_settings" });
    }

    /**
     * Update the current user settings
     * @param opt Options to update the User settings
     */
    async update(
        opt: UpdatableUserSettingsParam
    ) {
        const [op, update] = this.updateCacheLocally(opt, ['start_day_of_week',
            'time_zone',
            'locale',
            'preferred_locale',
            'preferred_locale_origin']);

        await this.saveTransactions([
            op
        ]);

        this.logger && this.logger("UPDATE", "UserSettings", this.id)

        update();
    }
}

// file: api/ViewSchemeUnit.ts

/**
 * A class to represent a column schema of a collection and a view
 * @noInheritDoc
 */
export class ViewSchemaUnit extends Data<TView> {
    schema_id: string;

    constructor(arg: NishanArg & { schema_id: string }) {
        super({ ...arg, type: "collection_view" });
        this.schema_id = arg.schema_id
    }

    async update(arg: Partial<Omit<ViewFormatProperties, "property">>) {
        const data = this.getCachedData(), container = data.format[`${data.type}_properties` as never] as ViewFormatProperties[];
        this.saveTransactions([this.updateOp([], {
            format: {
                ...data.format,
                [`${data.type}_properties`]: container.map(properties => properties.property === this.schema_id ? { ...properties, ...arg } : properties)
            }
        })])
        this.updateCacheManually([this.id]);
    }

    async toggleHide(should_hide?: boolean) {
        const data = this.getCachedData(), container = data.format[`${data.type}_properties` as never] as ViewFormatProperties[];
        this.saveTransactions([this.updateOp([], {
            format: {
                ...data.format,
                [`${data.type}_properties`]: container.map(properties => properties.property === this.schema_id ? { ...properties, visible: should_hide ?? (!properties.visible) } : properties)
            }
        })])
        this.updateCacheManually([this.id]);
    }

    async createSort(direction: "ascending" | "descending" = "ascending") {
        await this.createSorts([direction]);
    }

    async createSorts(directions: ("ascending" | "descending")[]) {
        const data = this.getCachedData(), container = data?.query2?.sort ?? [];
        directions.forEach(direction => container.push({ property: this.schema_id, direction }));
        this.saveTransactions([this.updateOp([], {
            query2: {
                ...data.query2,
                sort: container
            }
        })])
        this.updateCacheManually([this.id]);
    }

    async updateSort(arg: ((T: ViewSorts) => Promise<ViewSorts>)) {
        await this.updateSorts(arg, false);
    }

    async updateSorts(args: ((T: ViewSorts) => Promise<ViewSorts>), multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), container = data?.query2?.sort ?? [];
        let matched = 0;
        for (let index = 0; index < container.length; index++) {
            const sort = container[index];
            if (sort.property === this.schema_id) {
                const res = await args(sort);
                if (res) {
                    container[index] = res;
                    matched++;
                }
            }
            if (!multiple && matched !== 0) break;
        }

        this.saveTransactions([this.updateOp([], {
            query2: {
                ...data.query2,
                sort: container
            }
        })])
        this.updateCacheManually([this.id]);
    }

    async deleteSort(arg: Predicate<ViewSorts>) {
        await this.deleteSorts(arg, false);
    }

    async deleteSorts(args: undefined | Predicate<ViewSorts>, multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), container: ViewSorts[] = data.query2?.sort as any ?? [];
        let total_deleted = 0;
        if (typeof args === "function" || args === undefined) {
            for (let index = 0; index < container.length; index++) {
                const should_remove = container[index].property === this.schema_id && typeof args === "function" ? await args(container[index], index) : true;
                if (should_remove) {
                    delete container[index];
                    total_deleted++;
                }
                if (!multiple && total_deleted === 1) break;
            }
        }

        this.saveTransactions([this.updateOp([], {
            query2: {
                ...data.query2,
                sort: container.filter(sort => sort)
            }
        })])
        this.updateCacheManually([this.id]);
    }

    async createFilter(filter: [TViewFiltersOperator, TViewFiltersType, string]) {
        await this.createFilters([filter])
    }

    async createFilters(filters: [TViewFiltersOperator, TViewFiltersType, string][]) {
        const data = this.getCachedData(), container = data?.query2?.filter ?? { operator: "and", filters: [] as IViewFilters[] } as IViewFilter;
        if (!container.filters) container.filters = [] as IViewFilters[]

        filters.forEach(filter => {
            if (filter[0] == "is_empty" || filter[0] == "is_not_empty")
                container.filters.push({
                    property: this.schema_id,
                    filter: {
                        operator: filter[0],
                    }
                })
            else
                container.filters.push({
                    property: this.schema_id,
                    filter: {
                        operator: filter[0] as any,
                        value: {
                            type: filter[1] as any,
                            value: filter[2]
                        }
                    }
                })
        });
        this.saveTransactions([this.updateOp([], {
            query2: {
                ...data.query2,
                filter: container
            }
        })])
        this.updateCacheManually([this.id]);
    }

    async updateFilter(arg: ((T: IViewFilters) => Promise<IViewFilters>)) {
        await this.updateFilters(arg, false);
    }

    async updateFilters(args: ((T: IViewFilters) => Promise<IViewFilters>), multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), container = data?.query2?.filter ?? { operator: "and", filters: [] as IViewFilters[] };
        let matched = 0;
        for (let index = 0; index < container.filters.length; index++) {
            const filter = container.filters[index] as any;
            if (filter.property === this.schema_id) {
                const res = await args(filter);
                if (res) {
                    container.filters[index] = res;
                    matched++;
                }
            }
            if (!multiple && matched !== 0) break;
        }

        this.saveTransactions([this.updateOp([], {
            query2: {
                ...data.query2,
                filter: container
            }
        })])
        this.updateCacheManually([this.id]);
    }

    async deleteFilter(arg: Predicate<IViewFilters>) {
        await this.deleteFilters(arg, false)
    }

    async deleteFilters(args: undefined | Predicate<IViewFilters>, multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), container = data.query2?.filter ?? { operator: "and", filters: [] as IViewFilters[] } as any;
        let total_deleted = 0;
        if (typeof args === "function" || args === undefined) {
            for (let index = 0; index < container.filters.length; index++) {
                const should_remove = container.filters[index].property === this.schema_id && (typeof args === "function" ? await args(container.filters[index], index) : true);
                if (should_remove) {
                    delete container.filters[index];
                    total_deleted++;
                }
                if (!multiple && total_deleted === 1) break;
            }
        }

        this.saveTransactions([this.updateOp([], {
            query2: {
                ...data.query2,
                filter: {
                    operator: "and",
                    filters: container.filters.filter((filter: any) => filter)
                }
            }
        })])
        this.updateCacheManually([this.id]);
    }

    async createAggregator(aggregator: TViewAggregationsAggregators) {
        const data = this.getCachedData();
        if (data.type === "table" || data.type === "board" || data.type === "timeline") {
            const container = data?.query2?.aggregations ?? [],
                does_already_contain = container.find(aggregator => aggregator.property === this.schema_id);
            if (!does_already_contain) {
                container.push({ property: this.schema_id, aggregator })
                this.saveTransactions([this.updateOp([], {
                    query2: {
                        ...data.query2,
                        aggregations: container
                    }
                })])
                this.updateCacheManually([this.id]);
            } else
                warn(`ViewSchemaUnit:${this.schema_id} already contains an aggregrator`)
        }
    }

    async updateAggregrator(aggregator: TViewAggregationsAggregators) {
        const data = this.getCachedData();
        if (data.type === "table" || data.type === "board" || data.type === "timeline") {
            const container = data?.query2?.aggregations ?? [],
                target_aggregrator = container.find(aggregator => aggregator.property === this.schema_id) ?? { property: this.schema_id, aggregator: "count" };
            if (!target_aggregrator)
                container.push({ property: this.schema_id, aggregator })
            else
                target_aggregrator.aggregator = aggregator;

            this.saveTransactions([this.updateOp([], {
                query2: {
                    ...data.query2,
                    aggregations: container
                }
            })])
            this.updateCacheManually([this.id]);
        }
    }

    async deleteAggregrator() {
        const data = this.getCachedData();
        if (data.type === "table" || data.type === "board" || data.type === "timeline") {
            const container = data?.query2?.aggregations ?? [];
            this.saveTransactions([this.updateOp([], {
                query2: {
                    ...data.query2,
                    aggregations: container.filter(aggregrator => aggregrator.property !== this.schema_id)
                }
            })])
            this.updateCacheManually([this.id]);
        }
    }
}

// file: api/View/Aggregator.ts

/**
 * A class to represent view of Notion
 * @noInheritDoc
 */
class View<T extends TView> extends Data<T> {
    constructor(arg: NishanArg) {
        super({ ...arg, type: "collection_view" });
    }

    async reposition(arg: RepositionParams) {
        await this.saveTransactions([this.addToChildArray(this.id, arg) as any]);
    }

    /**
 * Update the current view
 * @param options Options to update the view
 */
    // ? TD:1:M Use the Data.createViews method
    async update(options: ViewUpdateParam[]) {
        const data = this.getCachedData(), collection = this.cache.collection.get((this.getParent() as TCollectionBlock).collection_id) as ICollection;
        const name_map: Record<string, { key: string } & ISchemaUnit> = {};
        Object.entries(collection.schema).forEach(([key, schema]) => name_map[schema.name] = { key, ...schema })

        const sorts = [] as ViewSorts[], filters = [] as TViewFilters[], aggregations = [] as ViewAggregations[], properties = [] as ViewFormatProperties[];

        for (let index = 0; index < options.length; index++) {
            const { name, format, sort, aggregation, filter } = options[index];
            const { key } = name_map[name];

            if (name) {
                const property: ViewFormatProperties = {
                    property: key,
                } as any;
                if (typeof format === "boolean") property.visible = format;
                else if (typeof format === "number") property.width = format;
                else if (Array.isArray(format)) {
                    property.width = format?.[1] ?? 250
                    property.visible = format?.[0] ?? true;
                }
                if (sort) (sorts as any).push({
                    property: key,
                    direction: sort
                })

                if (aggregation) aggregations.push({
                    property: key,
                    aggregator: aggregation
                })

                if (filter) {
                    filter.forEach((filter: any) => {
                        const [operator, type, value] = filter;
                        filters.push({
                            property: key,
                            filter: {
                                operator,
                                value: {
                                    type,
                                    value
                                }
                            } as any
                        })
                    })
                }
                properties.push(property)
            }
        }

        await this.saveTransactions([this.updateOp([], {
            query2: {
                sort: sorts,
                filter: {
                    operator: "and",
                    filters
                },
                aggregations
            },
            format: {
                [`${data.type}_properties`]: properties
            }
        })]);
        await this.updateCacheManually([this.id]);
    }

    async getViewSchemaUnit(arg?: FilterType<ViewFormatProperties>) {
        return (await this.getViewSchemaUnits(typeof arg === "string" ? [arg] : arg, false))[0]
    }
    // ? TD:1:M Use custom schemaunit interface to pass to SchemaUnit class
    async getViewSchemaUnits(args?: FilterTypes<ViewFormatProperties & ISchemaUnit>, multiple?: boolean) {
        multiple = multiple ?? true;
        const matched: ViewSchemaUnit[] = [];
        const collection = this.cache.collection.get((this.getParent() as TCollectionBlock).collection_id) as ICollection;
        const data = this.getCachedData(), container: ViewFormatProperties[] = data.format[`${data.type}_properties` as never] ?? [];
        const schema_ids = container.map(data => data.property);

        if (Array.isArray(args)) {
            for (let index = 0; index < args.length; index++) {
                const schema_id = args[index];
                const should_add = schema_ids.includes(schema_id);
                if (should_add)
                    matched.push(new ViewSchemaUnit({ ...this.getProps(), id: this.id, schema_id }))
                if (!multiple && matched.length === 1) break;
            }
        } else if (typeof args === "function" || args === undefined) {
            for (let index = 0; index < container.length; index++) {
                const schema_unit = collection.schema[container[index].property] as ISchemaUnit;
                const should_add = typeof args === "function" ? await args({ ...container[index], ...schema_unit }, index) : true;
                if (should_add)
                    matched.push(new ViewSchemaUnit({ ...this.getProps(), id: this.id, schema_id: container[index].property, }))
                if (!multiple && matched.length === 1) break;
            }
        }
        return matched;
    }

    async createSort(cb: (T: TSchemaUnit & { key: string }) => [TSortValue, number] | undefined) {
        await this.createSorts(cb, false)
    }

    async createSorts(cb: (T: TSchemaUnit & { key: string }) => TSortValue | [TSortValue, number] | undefined, multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), collection = this.cache.collection.get((this.cache.block.get(data.parent_id) as TCollectionBlock).collection_id) as ICollection;
        if (!data.query2) data.query2 = { sort: [] as ViewSorts[] } as any;
        if (!data.query2?.sort) (data.query2 as any).sort = [] as ViewSorts[];
        let total_created = 0;
        const sorts = data.query2?.sort as ViewSorts[];
        const schema_entries = Object.entries(collection.schema);
        for (let index = 0; index < schema_entries.length; index++) {
            const [key, schema] = schema_entries[index];
            const res = cb({ ...schema, key }) ?? undefined;
            if (res) {
                total_created++;
                if (Array.isArray(res)) {
                    const [direction, position] = res;
                    sorts.splice(position ?? sorts.length, 0, {
                        property: key,
                        direction
                    })
                } else sorts.splice(sorts.length, 0, {
                    property: key,
                    direction: res
                })
            }
            if (!multiple && total_created === 1) break;
        }

        if (total_created) {
            await this.saveTransactions([this.updateOp([], {
                query2: {
                    ...data.query2
                }
            })]);
            await this.updateCacheManually([this.id]);
        }
    }

    async updateSort(cb: (T: TSchemaUnit & ViewSorts) => [TSortValue, number] | undefined) {
        await this.updateSorts(cb, false);
    }

    async updateSorts(cb: (T: TSchemaUnit & ViewSorts) => [TSortValue, number] | undefined, multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), collection = this.cache.collection.get((this.cache.block.get(data.parent_id) as TCollectionBlock).collection_id) as ICollection;
        if (!data.query2) data.query2 = { sort: [] as ViewSorts[] } as any;
        if (!data.query2?.sort) (data.query2 as any).sort = [] as ViewSorts[];
        let total_updated = 0;
        const sorts = data.query2?.sort as ViewSorts[];
        const schema_entries = new Map(Object.entries(collection.schema));
        for (let index = 0; index < sorts.length; index++) {
            const sort = sorts[index], schema = schema_entries.get(sort.property);
            const res = cb({ ...schema, ...sort } as any) ?? undefined;
            if (res) {
                total_updated++;
                const [direction, position] = res;
                if (position) {
                    sorts.splice(index, 1)
                    sorts.splice(position, 0, {
                        property: sort.property,
                        direction
                    })
                }
                else sorts[index] = {
                    property: sort.property,
                    direction
                }
            }
            if (!multiple && total_updated === 1) break;
        }

        if (total_updated) {
            await this.saveTransactions([this.updateOp([], {
                query2: {
                    ...data.query2
                }
            })]);
            await this.updateCacheManually([this.id]);
        }
    }

    async deleteSort(cb: (T: TSchemaUnit & ViewSorts) => boolean | undefined) {
        await this.deleteSorts(cb, false);
    }

    async deleteSorts(cb: (T: TSchemaUnit & ViewSorts) => boolean | undefined, multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), collection = this.cache.collection.get((this.cache.block.get(data.parent_id) as TCollectionBlock).collection_id) as ICollection;
        let total_deleted = 0;
        const sorts = data.query2?.sort as ViewSorts[];
        const schema_entries = new Map(Object.entries(collection.schema));

        for (let index = 0; index < sorts.length; index++) {
            const sort = sorts[index] as ViewSorts;
            const schema = schema_entries.get(sort.property)
            const should_delete = cb({ ...sort, ...schema } as any) ?? undefined;
            if (should_delete) {
                total_deleted++;
                sorts.splice(index, 1)
            }
            if (!multiple && total_deleted === 1) break;
        }

        if (total_deleted) {
            await this.saveTransactions([this.updateOp([], {
                query2: {
                    ...data.query2
                }
            })]);
            await this.updateCacheManually([this.id]);
        }
    }

    #populateFilters = (data: any) => {
        if (!data.query2) data.query2 = { filter: { operator: "and", filters: [] } };
        if (!data.query2?.filter) data.query2.filter = { operator: "and", filters: [] };
        if (!data.query2?.filter.filters) data.query2.filter.filters = [];
    }

    async createFilter(cb: (T: TSchemaUnit & { key: string }) => UserViewFilterParams | undefined) {
        await this.createFilters(cb, false)
    }

    async createFilters(cb: (T: TSchemaUnit & { key: string }) => UserViewFilterParams | undefined, multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), parent = this.cache.block.get(data.parent_id) as TCollectionBlock, collection = this.cache.collection.get(parent.collection_id) as ICollection;
        this.#populateFilters(data);
        let total_created = 0;

        const filters = data.query2?.filter.filters as IViewFilters[];
        const schema_entries = Object.entries(collection.schema);
        for (let index = 0; index < schema_entries.length; index++) {
            const [key, schema] = schema_entries[index];
            const res = cb({ ...schema, key }) ?? undefined;
            if (res) {
                total_created++;
                const [operator, type, value, position] = res;
                filters.splice(position ?? filters.length, 0, {
                    property: key,
                    filter: {
                        operator,
                        value: {
                            type,
                            value
                        }
                    } as any
                })
            }
            if (!multiple && total_created === 1) break;
        }

        if (total_created) {
            await this.saveTransactions([this.updateOp([], {
                query2: {
                    ...data.query2
                }
            })]);
            await this.updateCacheManually([this.id]);
        }
    }

    async updateFilter(cb: (T: TSchemaUnit & IViewFilters) => UserViewFilterParams | undefined) {
        await this.updateFilters(cb, false);
    }

    async updateFilters(cb: (T: TSchemaUnit & IViewFilters) => UserViewFilterParams | undefined, multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), collection = this.cache.collection.get((this.cache.block.get(data.parent_id) as TCollectionBlock).collection_id) as ICollection;
        this.#populateFilters(data);
        let total_updated = 0;
        const filters = data.query2?.filter.filters as IViewFilters[];
        const schema_entries = new Map(Object.entries(collection.schema));
        for (let index = 0; index < filters.length; index++) {
            const filter = filters[index], schema = schema_entries.get(filter.property), res = cb({ ...schema, ...filter } as any) ?? undefined;
            if (res) {
                total_updated++;
                const [operator, type, value, position] = res;
                const update_filter = {
                    property: filter.property,
                    filter: {
                        operator,
                        value: {
                            type,
                            value
                        }
                    } as any
                };
                if (position) {
                    filters.splice(index, 1)
                    filters.splice(position, 0, update_filter)
                }
                else filters[index] = update_filter;
            }
            if (!multiple && total_updated === 1) break;
        }

        if (total_updated) {
            await this.saveTransactions([this.updateOp([], {
                query2: {
                    ...data.query2
                }
            })]);
            await this.updateCacheManually([this.id]);
        }
    }

    async deleteFilter(cb: (T: TSchemaUnit & IViewFilters) => boolean | undefined) {
        await this.deleteFilters(cb, false);
    }

    async deleteFilters(cb: (T: TSchemaUnit & IViewFilters) => boolean | undefined, multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), collection = this.cache.collection.get((this.cache.block.get(data.parent_id) as TCollectionBlock).collection_id) as ICollection;
        this.#populateFilters(data);
        let total_deleted = 0;
        const filters = data.query2?.filter.filters as IViewFilters[],
            schema_entries = new Map(Object.entries(collection.schema));

        for (let index = 0; index < filters.length; index++) {
            const filter = filters[index] as IViewFilters,
                schema = schema_entries.get(filter.property),
                should_delete = cb({ ...filter, ...schema } as any) ?? undefined;
            if (should_delete) {
                total_deleted++;
                filters.splice(index, 1)
            }
            if (!multiple && total_deleted === 1) break;
        }

        if (total_deleted) {
            await this.saveTransactions([this.updateOp([], {
                query2: {
                    ...data.query2
                }
            })]);
            await this.updateCacheManually([this.id]);
        }
    }

    async updateFormatProperty(cb: (T: TSchemaUnit & ViewFormatProperties) => Partial<[number, boolean, number]> | undefined) {
        await this.updateFormatProperties(cb, false);
    }

    async updateFormatProperties(cb: (T: TSchemaUnit & ViewFormatProperties) => Partial<[number, boolean, number]> | undefined, multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), collection = this.cache.collection.get((this.cache.block.get(data.parent_id) as TCollectionBlock).collection_id) as ICollection;
        let total_effected = 0;
        const properties = (data.format as any)[`${data.type}_properties`] as ViewFormatProperties[], updated_properties = [] as ViewFormatProperties[];
        for (let index = 0; index < properties.length; index++) {
            const property = properties[index], collection_property = collection.schema[property.property];
            const updated_property = cb({ ...property, ...collection_property }),
                position = updated_property?.[2]
            const new_property = {
                width: updated_property?.[0] ?? property.width,
                property: property.property,
                visible: updated_property?.[1] ?? property.visible
            }
            const _index = position ?? index;
            updated_properties[_index] = new_property
            total_effected++;
            if (!multiple && total_effected === 1) break;
        }
        if (total_effected) {
            await this.saveTransactions([this.updateOp([], {
                format: {
                    ...data.format,
                    [`${data.type}_properties`]: updated_properties
                }
            })]);
            await this.updateCacheManually([this.id]);
        }
    }
}

/**
 * A class to represent the aggregrator methods for views that supports it
 * @noInheritDoc
 */
class Aggregator<T extends ITableView | IBoardView | ITimelineView> extends View<T> {
    constructor(arg: NishanArg) {
        super({ ...arg });
    }

    async createAggregation(cb: (T: TSchemaUnit & { key: string }) => TViewAggregationsAggregators | undefined) {
        await this.createAggregations(cb, false)
    }

    async createAggregations(cb: (T: TSchemaUnit & { key: string }) => TViewAggregationsAggregators | undefined, multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), collection = this.cache.collection.get((this.cache.block.get(data.parent_id) as TCollectionBlock).collection_id) as ICollection;
        if (!data.query2) data.query2 = { aggregations: [] as ViewAggregations[] } as any;
        if (!data.query2?.aggregations) (data.query2 as any).aggregations = [] as ViewAggregations[];
        let total_created = 0;
        const aggregations = data.query2?.aggregations as ViewAggregations[];
        const schema_entries = Object.entries(collection.schema);
        for (let index = 0; index < schema_entries.length; index++) {
            const [key, schema] = schema_entries[index];
            const aggregator = cb({ ...schema, key }) ?? undefined;
            if (aggregator) {
                total_created++;
                aggregations.push({
                    property: key,
                    aggregator
                })
            }
            if (!multiple && total_created === 1) break;
        }

        if (total_created) {
            await this.saveTransactions([this.updateOp([], {
                query2: {
                    ...data.query2
                }
            })]);
            await this.updateCacheManually([this.id]);
        }
    }

    async updateAggregation(cb: (T: TSchemaUnit & ViewAggregations) => TViewAggregationsAggregators | undefined) {
        await this.updateAggregations(cb, false);
    }

    async updateAggregations(cb: (T: TSchemaUnit & ViewAggregations) => TViewAggregationsAggregators | undefined, multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), collection = this.cache.collection.get((this.cache.block.get(data.parent_id) as TCollectionBlock).collection_id) as ICollection;
        if (!data.query2) data.query2 = { aggregations: [] as ViewAggregations[] } as any;
        if (!data.query2?.aggregations) (data.query2 as any).aggregations = [] as ViewAggregations[];
        let total_updated = 0;
        const aggregations = data.query2?.aggregations as ViewAggregations[];
        const schema_entries = new Map(Object.entries(collection.schema));
        for (let index = 0; index < aggregations.length; index++) {
            const aggregation = aggregations[index], schema = schema_entries.get(aggregation.property);
            const res = cb({ ...schema, ...aggregation } as any) ?? undefined;
            if (res) {
                total_updated++;
                const aggregator = res;
                aggregations[index] = {
                    property: aggregation.property,
                    aggregator
                }
            }
            if (!multiple && total_updated === 1) break;
        }

        if (total_updated) {
            await this.saveTransactions([this.updateOp([], {
                query2: {
                    ...data.query2
                }
            })]);
            await this.updateCacheManually([this.id]);
        }
    }

    async deleteAggregation(cb: (T: TSchemaUnit & ViewAggregations) => boolean | undefined) {
        await this.deleteAggregations(cb, false);
    }

    async deleteAggregations(cb: (T: TSchemaUnit & ViewAggregations) => boolean | undefined, multiple?: boolean) {
        multiple = multiple ?? true;
        const data = this.getCachedData(), collection = this.cache.collection.get((this.cache.block.get(data.parent_id) as TCollectionBlock).collection_id) as ICollection;
        let total_deleted = 0;
        const aggregations = data.query2?.aggregations as ViewAggregations[];
        const schema_entries = new Map(Object.entries(collection.schema));

        for (let index = 0; index < aggregations.length; index++) {
            const aggregation = aggregations[index] as ViewAggregations;
            const schema = schema_entries.get(aggregation.property)
            const should_delete = cb({ ...aggregation, ...schema } as any) ?? undefined;
            if (should_delete) {
                total_deleted++;
                aggregations.splice(index, 1)
            }
            if (!multiple && total_deleted === 1) break;
        }

        if (total_deleted) {
            await this.saveTransactions([this.updateOp([], {
                query2: {
                    ...data.query2
                }
            })]);
            await this.updateCacheManually([this.id]);
        }
    }
}

// file: api/View/BoardView.ts


/**
 * A class to represent board view of Notion
 * @noInheritDoc
 */
class BoardView extends Aggregator<IBoardView> {
    constructor(arg: NishanArg) {
        super({ ...arg });
    }
}

// file: api/View/CalendarView.ts

/**
 * A class to represent calendar view of Notion
 * @noInheritDoc
 */

class CalendarView extends View<ICalendarView> {
    constructor(arg: NishanArg) {
        super({ ...arg });
    }
}

// file: api/View/GalleryView.ts

/**
 * A class to represent gallery view of Notion
 * @noInheritDoc
 */
class GalleryView extends View<IGalleryView> {
    constructor(arg: NishanArg) {
        super({ ...arg });
    }
}

// file: api/View/ListView.ts


/**
 * A class to represent list view of Notion
 * @noInheritDoc
 */
class ListView extends View<IListView> {
    constructor(arg: NishanArg) {
        super({ ...arg });
    }
}

// file: api/View/TableView.ts

/**
 * A class to represent table view of Notion
 * @noInheritDoc
 */
class TableView extends Aggregator<ITableView> {
    constructor(arg: NishanArg) {
        super({ ...arg });
    }
}

// file: api/View/TimelineView.ts


/**
 * A class to represent timeline view of Notion
 * @noInheritDoc
 */
class TimelineView extends Aggregator<ITimelineView> {
    constructor(arg: NishanArg) {
        super({ ...arg });
    }
}

const view_class = {
    board: BoardView,
    gallery: GalleryView,
    list: ListView,
    timeline: TimelineView,
    table: TableView,
    calendar: CalendarView,
}

// file: Nishan.ts

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
            console.log(`${method} ${subject}:${id}`);
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
