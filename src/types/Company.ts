export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  coordinates: {
    x: number;
    z: number;
  };
}

export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  foundedYear: number;
  employees: number;
  address: Address;
  logoColor: string;
  buildingHeight: number;
  buildingWidth: number;
  buildingDepth: number;
}
