export interface iPropertyBase{
  id: number | null;
  name: string | null;
  price: number | null;
  sellRent: number | null;
  furnishingType: number | null;

  propertyType: number | null;
  type: string | null;
  bhk: number | null;
  builtArea: number | null;
  city: string;
  image?: string;
estPossessionOn?: string | null;
  propertyTypeId: number|null;
  furnishingTypeId: number|null;
  carpetArea?: number|null;
  address: string|null;
  address2?: string|null;
  CityId: number|null;
  floorNo?: string|null;
 AOP?:string;
  totalFloors?: string|null;
  readyToMove: boolean|null;
  age?: string|null;
  mainEntrance?: string|null;
  security?: number|null;
  gated?: boolean|null;
  maintenance?: number|null;
  PossessionOn?: string|null;
  photo?: string|null;
  EstPossessionOn?:Date;
  description?: string|null;

}
