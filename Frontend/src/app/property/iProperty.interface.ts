export interface iProperty{
  Id: number | null;
  Name: string | null;
  Price: number | null;
  SellRent: number | null;
  FType: number | null;
  PType: number | null;
  Type: string | null;
  BHK: number | null;
  BuildArea: number | null;
  RTM: boolean | null;
  City: string;
  Image?: string;
  propertyTypeId:null,
  furnishingTypeId:null,
  carpetArea:null,
  address: null,
  address2:null,
  CityId: null,
  floorNo: null,
  totalFloors: null,
  age: null,
  mainEntrance: null,
  security: null,
  gated: null,
  maintenance: null,
  PossessionOn: null,
  photo: null,
  description: null,
}
