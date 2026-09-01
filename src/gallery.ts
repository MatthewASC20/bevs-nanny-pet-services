/** The one open gallery — page-level state feeding the single Lightbox. */
export interface GalleryState {
  name: string;
  alt?: string;
  photos: string[];
}
