/**
 * Generic Editor Types
 *
 * Framework-agnostic types for building a reusable
 * block-based editor application.
 *
 * Can be used for:
 * - Blog editors
 * - Documentation editors
 * - CMS
 * - Newsletters
 * - Knowledge bases
 * - Landing pages
 * - Articles
 * - Notes
 * - Content management systems
 */

/* =========================================================
 * IDENTIFIERS
 * ========================================================= */

export type EditorId = string;

/* =========================================================
 * EDITOR MODE
 * ========================================================= */

export type EditorMode = "edit" | "preview";

/* =========================================================
 * DOCUMENT STATUS
 * ========================================================= */

export type EditorDocumentStatus = "draft" | "published" | "archived";

export type EditorVisibility = "public" | "private";

/* =========================================================
 * SAVE STATUS
 * ========================================================= */

export type EditorSaveStatus = "idle" | "saving" | "saved" | "error";

/* =========================================================
 * PUBLISH STATUS
 * ========================================================= */

export type EditorPublishStatus = "idle" | "publishing" | "published" | "error";

/* =========================================================
 * BLOCK ALIGNMENT
 * ========================================================= */

export type EditorAlignment = "left" | "center" | "right";

/* =========================================================
 * BLOCK WIDTH
 * ========================================================= */

export type EditorBlockWidth = "small" | "medium" | "large" | "full";

/* =========================================================
 * BASE BLOCK
 * ========================================================= */

/**
 * Every block inside the editor must have:
 *
 * - unique ID
 * - block type
 *
 * The `type` property is the discriminator used by
 * TypeScript to determine the block structure.
 */
export interface EditorBlockBase {
  id: EditorId;

  type: string;
}

/* =========================================================
 * TEXT BLOCK
 * ========================================================= */

export interface EditorTextBlock extends EditorBlockBase {
  type: "text";

  text: string;
}

/* =========================================================
 * HEADING BLOCK
 * ========================================================= */

export interface EditorHeadingBlock extends EditorBlockBase {
  type: "heading";

  text: string;

  level: 1 | 2 | 3 | 4 | 5 | 6;
}

/* =========================================================
 * LIST BLOCK
 * ========================================================= */

export type EditorListType = "ordered" | "unordered";

export interface EditorListBlock extends EditorBlockBase {
  type: "list";

  listType: EditorListType;

  items: string[];
}

/* =========================================================
 * QUOTE BLOCK
 * ========================================================= */

export interface EditorQuoteBlock extends EditorBlockBase {
  type: "quote";

  text: string;

  author?: string;
}

/* =========================================================
 * CODE BLOCK
 * ========================================================= */

export interface EditorCodeBlock extends EditorBlockBase {
  type: "code";

  code: string;

  language?: string;

  filename?: string;
}

/* =========================================================
 * IMAGE BLOCK
 * ========================================================= */

export interface EditorImage {
  id?: EditorId;

  src: string;

  alt?: string;

  caption?: string;

  width?: number;

  height?: number;
}

export interface EditorImageBlock extends EditorBlockBase {
  type: "image";

  image: EditorImage;

  alignment?: EditorAlignment;

  width?: EditorBlockWidth;
}

/* =========================================================
 * VIDEO BLOCK
 * ========================================================= */

export interface EditorVideo {
  src: string;

  poster?: string;

  title?: string;

  width?: number;

  height?: number;
}

export interface EditorVideoBlock extends EditorBlockBase {
  type: "video";

  video: EditorVideo;

  alignment?: EditorAlignment;

  width?: EditorBlockWidth;
}

/* =========================================================
 * AUDIO BLOCK
 * ========================================================= */

export interface EditorAudioBlock extends EditorBlockBase {
  type: "audio";

  src: string;

  title?: string;

  caption?: string;
}

/* =========================================================
 * LINK BLOCK
 * ========================================================= */

export interface EditorLinkBlock extends EditorBlockBase {
  type: "link";

  text: string;

  href: string;

  external?: boolean;

  newTab?: boolean;
}

/* =========================================================
 * BUTTON BLOCK
 * ========================================================= */

export type EditorButtonVariant = "primary" | "secondary" | "outline" | "ghost";

export interface EditorButtonBlock extends EditorBlockBase {
  type: "button";

  text: string;

  href: string;

  variant: EditorButtonVariant;

  newTab?: boolean;
}

/* =========================================================
 * CALLOUT BLOCK
 * ========================================================= */

export type EditorCalloutVariant =
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "note";

export interface EditorCalloutBlock extends EditorBlockBase {
  type: "callout";

  variant: EditorCalloutVariant;

  title?: string;

  text: string;
}

/* =========================================================
 * DIVIDER BLOCK
 * ========================================================= */

export interface EditorDividerBlock extends EditorBlockBase {
  type: "divider";
}

/* =========================================================
 * TABLE BLOCK
 * ========================================================= */

export interface EditorTableBlock extends EditorBlockBase {
  type: "table";

  headers: string[];

  rows: string[][];
}

/* =========================================================
 * GALLERY BLOCK
 * ========================================================= */

export interface EditorGalleryBlock extends EditorBlockBase {
  type: "gallery";

  images: EditorImage[];

  columns?: 2 | 3 | 4;
}

/* =========================================================
 * EMBED BLOCK
 * ========================================================= */

export type EditorEmbedProvider =
  | "iframe"
  | "youtube"
  | "vimeo"
  | "codepen"
  | "codesandbox"
  | "stackblitz"
  | "figma"
  | "custom";

export interface EditorEmbedBlock extends EditorBlockBase {
  type: "embed";

  url: string;

  provider: EditorEmbedProvider;

  title?: string;

  height?: number;
}

/* =========================================================
 * FILE BLOCK
 * ========================================================= */

export interface EditorFileBlock extends EditorBlockBase {
  type: "file";

  src: string;

  name: string;

  description?: string;

  mimeType?: string;

  size?: number;
}

/* =========================================================
 * ACCORDION BLOCK
 * ========================================================= */

export interface EditorAccordionBlock extends EditorBlockBase {
  type: "accordion";

  title: string;

  content: EditorBlock[];

  defaultOpen?: boolean;
}

/* =========================================================
 * COLUMNS BLOCK
 * ========================================================= */

export interface EditorColumnsBlock extends EditorBlockBase {
  type: "columns";

  columns: EditorBlock[][];
}

/* =========================================================
 * VIDEO EMBED
 * ========================================================= */

export interface EditorYoutubeBlock extends EditorBlockBase {
  type: "youtube";

  videoId: string;

  title?: string;

  startTime?: number;
}

/* =========================================================
 * SOCIAL EMBED
 * ========================================================= */

export interface EditorSocialEmbedBlock extends EditorBlockBase {
  type: "social";

  platform: "twitter" | "instagram" | "facebook" | "linkedin";

  url: string;
}

/* =========================================================
 * MAP BLOCK
 * ========================================================= */

export interface EditorMapBlock extends EditorBlockBase {
  type: "map";

  latitude: number;

  longitude: number;

  zoom?: number;

  title?: string;
}

/* =========================================================
 * HTML BLOCK
 * ========================================================= */

export interface EditorHtmlBlock extends EditorBlockBase {
  type: "html";

  html: string;
}

/* =========================================================
 * BLOCK UNION
 * ========================================================= */

/**
 * Built-in blocks supported by the generic editor.
 *
 * Applications can extend this union with their
 * own custom blocks.
 */
export type EditorBlock =
  | EditorTextBlock
  | EditorHeadingBlock
  | EditorListBlock
  | EditorQuoteBlock
  | EditorCodeBlock
  | EditorImageBlock
  | EditorVideoBlock
  | EditorAudioBlock
  | EditorLinkBlock
  | EditorButtonBlock
  | EditorCalloutBlock
  | EditorDividerBlock
  | EditorTableBlock
  | EditorGalleryBlock
  | EditorEmbedBlock
  | EditorFileBlock
  | EditorAccordionBlock
  | EditorColumnsBlock
  | EditorYoutubeBlock
  | EditorSocialEmbedBlock
  | EditorMapBlock
  | EditorHtmlBlock;

/* =========================================================
 * MEDIA
 * ========================================================= */

export type EditorMediaType = "image" | "video" | "audio" | "file";

export interface EditorMedia {
  id: EditorId;

  type: EditorMediaType;

  src: string;

  name?: string;

  mimeType?: string;

  size?: number;

  width?: number;

  height?: number;

  duration?: number;

  createdAt: string;
}

/* =========================================================
 * DOCUMENT METADATA
 * ========================================================= */

export interface EditorDocumentMetadata {
  title?: string;

  description?: string;

  keywords?: string[];

  language?: string;

  canonicalUrl?: string;
}

/* =========================================================
 * DOCUMENT
 * ========================================================= */

/**
 * Main document representation.
 */
export interface EditorDocument {
  id: EditorId;

  title: string;

  blocks: EditorBlock[];

  metadata?: EditorDocumentMetadata;

  status: EditorDocumentStatus;

  visibility: EditorVisibility;

  createdAt: string;

  updatedAt: string;

  publishedAt?: string;
}

/* =========================================================
 * EDITOR STATE
 * ========================================================= */

export interface EditorState {
  document: EditorDocument;

  mode: EditorMode;

  selectedBlockId: EditorId | null;

  saveStatus: EditorSaveStatus;

  publishStatus: EditorPublishStatus;

  isDirty: boolean;

  error: string | null;
}

/* =========================================================
 * SELECTION
 * ========================================================= */

export interface EditorSelection {
  blockId: EditorId;

  start?: number;

  end?: number;
}

/* =========================================================
 * HISTORY
 * ========================================================= */

export interface EditorHistoryEntry {
  id: EditorId;

  timestamp: string;

  blocks: EditorBlock[];
}

/* =========================================================
 * BLOCK ACTIONS
 * ========================================================= */

export type EditorBlockAction =
  | {
      type: "add";

      block: EditorBlock;

      index?: number;
    }
  | {
      type: "update";

      blockId: EditorId;

      block: EditorBlock;
    }
  | {
      type: "delete";

      blockId: EditorId;
    }
  | {
      type: "duplicate";

      blockId: EditorId;
    }
  | {
      type: "move";

      blockId: EditorId;

      toIndex: number;
    };

/* =========================================================
 * DOCUMENT ACTIONS
 * ========================================================= */

export type EditorDocumentAction =
  | {
      type: "set-title";

      title: string;
    }
  | {
      type: "set-metadata";

      metadata: EditorDocumentMetadata;
    }
  | {
      type: "set-status";

      status: EditorDocumentStatus;
    }
  | {
      type: "set-visibility";

      visibility: EditorVisibility;
    };

/* =========================================================
 * EDITOR ACTIONS
 * ========================================================= */

export type EditorAction =
  | EditorBlockAction
  | EditorDocumentAction
  | {
      type: "select-block";

      blockId: EditorId | null;
    }
  | {
      type: "set-mode";

      mode: EditorMode;
    }
  | {
      type: "undo";
    }
  | {
      type: "redo";
    }
  | {
      type: "reset";

      document: EditorDocument;
    };

/* =========================================================
 * VALIDATION
 * ========================================================= */

export type EditorValidationSeverity = "error" | "warning" | "info";

export interface EditorValidationIssue {
  severity: EditorValidationSeverity;

  message: string;

  field?: string;

  blockId?: EditorId;
}

export interface EditorValidationResult {
  valid: boolean;

  issues: EditorValidationIssue[];
}

/* =========================================================
 * EDITOR CONFIGURATION
 * ========================================================= */

export interface EditorBlockDefinition {
  type: EditorBlock["type"];

  label: string;

  description?: string;

  icon?: string;

  category?: string;

  create: () => EditorBlock;
}

export interface EditorConfig {
  blocks: EditorBlockDefinition[];

  autosave?: boolean;

  autosaveInterval?: number;

  enableHistory?: boolean;

  enablePreview?: boolean;

  enableMedia?: boolean;

  maxBlocks?: number;
}

/* =========================================================
 * SAVE API
 * ========================================================= */

export interface SaveDocumentInput {
  document: EditorDocument;
}

export interface SaveDocumentResult {
  success: boolean;

  document?: EditorDocument;

  error?: string;
}

/* =========================================================
 * PUBLISH API
 * ========================================================= */

export interface PublishDocumentInput {
  documentId: EditorId;
}

export interface PublishDocumentResult {
  success: boolean;

  document?: EditorDocument;

  error?: string;
}

/* =========================================================
 * EDITOR COMMANDS
 * ========================================================= */

export interface EditorCommands {
  addBlock(block: EditorBlock, index?: number): void;

  updateBlock(blockId: EditorId, block: EditorBlock): void;

  deleteBlock(blockId: EditorId): void;

  duplicateBlock(blockId: EditorId): void;

  moveBlock(blockId: EditorId, toIndex: number): void;

  selectBlock(blockId: EditorId | null): void;

  undo(): void;

  redo(): void;

  save(): Promise<SaveDocumentResult>;

  publish(): Promise<PublishDocumentResult>;
}

/* =========================================================
 * EDITOR PLUGIN
 * ========================================================= */

/**
 * Plugins allow applications to add custom block types
 * without modifying the core editor.
 */
export interface EditorPlugin {
  name: string;

  version?: string;

  blocks?: EditorBlockDefinition[];

  initialize?: (editor: EditorCommands) => void;

  destroy?: () => void;
}
