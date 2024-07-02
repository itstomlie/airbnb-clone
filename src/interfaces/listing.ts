export interface IListing {
  id: string;
  name?: string | null;
  description?: string | null;
  category?: string | null;
  hostId?: string | null;
  price?: number | null;
  guests?: number | null;
  bedrooms?: number | null;
  beds?: number | null;
  bathrooms?: number | null;
  coordinates?: string[] | null;
  country?: string | null;
  images?: string[] | null;
  hasCategory: boolean;
  hasDescription: boolean;
  hasCoordinates: boolean;
  createdAt: Date;
  updatedAt: Date;
}
